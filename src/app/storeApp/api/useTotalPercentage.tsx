import { useQuery } from "react-query";
import axios from "axios";

export const useTotalPercentage = (vendor_id: string) => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery(
    ["total-percentage", vendor_id], // Use the vendor_id in the query key for uniqueness
    async () => {
      const response = await axios.post(
        `${baseURL}/total-percentage`,
        { vendor_id } // Pass the vendor_id in the request body
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
