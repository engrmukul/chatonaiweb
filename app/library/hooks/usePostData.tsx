import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "../axios/axios";
import { getJwtToken, getJwtUserInfo } from "../functions";
import { useRouter } from "next/navigation";

interface Data {
  // Define your data structure here
}

interface PostData {
  // Define the structure of the data to be posted here
}

interface PostConfig {
  id?: string;
  data: PostData;
  headers?: Record<string, string>;
}

// const postData = async (
//   url: string,
//   { data, headers }: PostConfig
// ): Promise<Data> => {
//   const response = await axios.post<Data>(url, data, { headers });
//   return response.data;
// };

// const usePostData = (
//   url: string
// ): UseMutationResult<Data, Error, PostConfig> => {
//   const user = getJwtUserInfo();
//   const router = useRouter();

//   const currentTime = Date.now();
//   if (currentTime > user?.exp * 1000) {
//     localStorage.removeItem("authToken");
//     router.push("/");
//   }

//   return useMutation<Data, Error, PostConfig>({
//     mutationFn: (config: PostConfig) => postData(url, config),
//   });
// };

const postData = async (
  url: string,
  { data, headers, signal }: PostConfig & { signal?: AbortSignal }
): Promise<any> => {
  const response = await axios.post(url, data, { headers, signal });
  return response.data;
};

let controller: AbortController | null;

const usePostData = (
  url: string
): UseMutationResult<Data, Error, PostConfig> => {
  const user = getJwtUserInfo();
  const router = useRouter();

  // Check for token expiration and redirect if necessary
  const currentTime = Date.now();
  if (currentTime > user?.exp * 1000) {
    localStorage.removeItem("authToken");
    router.push("/");
  }

  return useMutation<Data, Error, PostConfig, { id?: string }>({
    mutationFn: (config: PostConfig) => {
      const { id, ...rest } = config;
      controller = new AbortController();
      const customUrl = id ? `${url}/${id}` : url;
      return postData(customUrl, { ...rest, signal: controller.signal });
    },
    onSettled: () => {
      // Cleanup: reset the controller after the mutation finishes
      controller = null;
    },
  });
};

// Optional: Provide a way to cancel the ongoing request
export const cancelPostDataRequest = () => {
  if (controller) {
    controller.abort(); // Abort the current request
    controller = null; // Reset the controller
  } else {
    console.log("No active request to cancel.");
  }
};

export default usePostData;
