import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from "../axios/axios";

interface Data {
    // Define your data structure here
}

const deleteData = async (url: string, headers?: Record<string, string>): Promise<Data> => {
    const response = await axios.delete<Data>(url, { headers });
    return response.data;
};

const useDeleteData = (): UseMutationResult<Data, Error, { url: string; headers?: Record<string, string> }> => {
    return useMutation<Data, Error, { url: string; headers?: Record<string, string> }>({
        mutationFn: ({ url, headers }) => deleteData(url, headers),
    });
};

export default useDeleteData;
