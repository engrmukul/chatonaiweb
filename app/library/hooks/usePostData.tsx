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
  data: PostData;
  headers?: Record<string, string>;
}

const postData = async (
  url: string,
  { data, headers }: PostConfig
): Promise<Data> => {
  const response = await axios.post<Data>(url, data, { headers });
  return response.data;
};

const usePostData = (
  url: string
): UseMutationResult<Data, Error, PostConfig> => {
  const user = getJwtUserInfo();
  const router = useRouter();

  const currentTime = Date.now();
  if (currentTime > user?.exp * 1000) {
    localStorage.removeItem("authToken");
    router.push("/");
  }

  return useMutation<Data, Error, PostConfig>({
    mutationFn: (config: PostConfig) => postData(url, config),
  });
};

export default usePostData;
