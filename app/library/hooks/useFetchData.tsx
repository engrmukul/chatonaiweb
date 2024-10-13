import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from "../axios/axios";
import { endpoints } from "../share/endpoints";

interface Data {
    // Define your data structure here
}

const fetchData = async (url: string, headers?: Record<string, string>): Promise<Data> => {
    const { data } = await axios.get<Data>(url, { headers });
    return data;
};

const useFetchData = (url: string, headers?: Record<string, string>): UseQueryResult<Data, Error> => {
    return useQuery<Data, Error>({
        queryKey: [url], // Use the URL as the query key to differentiate queries
        queryFn: () => fetchData(url, headers),
    });
};

export default useFetchData;
