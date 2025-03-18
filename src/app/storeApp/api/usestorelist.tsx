import { useQuery } from "react-query";
import axios from "axios";
import { StorelistRes } from "@/app/types/Restypes";

export const useStoreListApi = (service_id: string) => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery<StorelistRes>(
    ["store-list", service_id], // Use the service_id in the query key for uniqueness
    async () => {
      const response = await axios.post<StorelistRes>(
        `${baseURL}/store-list`,
        { service_id } // Pass the service_id in the request body
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
