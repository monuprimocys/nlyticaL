import { useQuery } from "react-query";
import axios from "axios";
import { HomeScreenRes } from "@/app/types/Restypes";

export const useHomeScreenApi = () => {
  const baseURL = "http://192.168.0.69:8001/api";

  return useQuery<HomeScreenRes>(
    ["web-home"],
    async () => {
      const response = await axios.post<HomeScreenRes>(`${baseURL}/web-home`);

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
