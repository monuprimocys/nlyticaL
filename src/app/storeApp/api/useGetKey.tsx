import { useQuery } from "react-query";
import axios from "axios";

export const useGetKey = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery(
    ["get-paymentconfig"], // Use the service_id in the query key for uniqueness
    async () => {
      const response = await axios.get(`${baseURL}/get-paymentconfig`);

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
