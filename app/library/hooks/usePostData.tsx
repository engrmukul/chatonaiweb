import { useMutation, UseMutationResult } from "@tanstack/react-query";
import axios from "../axios/axios";

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
  return useMutation<Data, Error, PostConfig>({
    mutationFn: (config: PostConfig) => postData(url, config),
  });
};

export default usePostData;
