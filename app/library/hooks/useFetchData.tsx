import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "../axios/axios";
import { endpoints } from "../share/endpoints";
import { getJwtToken } from "../functions";

interface Data {
  // Define your data structure here
}

const fetchData = async (
  url: string,
  headers?: Record<string, string>
): Promise<Data> => {
  // const { data } = await axios.get<Data>(url, { headers });
  const token = getJwtToken();

  const { data } = await axios.get<Data>(url, {
    headers: {
      ...headers, // Include any additional headers
      Authorization: `Bearer ${token}`, // Add the Authorization header
    },
  });
  return data;
};

const useFetchData = (
  url: string,
  headers?: Record<string, string>
): UseQueryResult<Data, Error> => {
  return useQuery<Data, Error>({
    queryKey: [url], // Use the URL as the query key to differentiate queries
    queryFn: () => fetchData(url, headers),
  });
};

export default useFetchData;
