import { useQuery } from "react-query";
import axios from "axios";

export const useGetPrice = () => {
  const baseURL = "http://192.168.0.69:8001/api";

  return useQuery(
    ["show-pricerange"], // Use the service_id in the query key for uniqueness
    async () => {
      const response = await axios.get(`${baseURL}/show-pricerange`);

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
