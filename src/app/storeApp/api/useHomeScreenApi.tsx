import { useQuery } from "react-query";
import axios from "axios";
import { HomeScreenRes } from "@/app/types/Restypes";
import Cookies from "js-cookie";

export const useHomeScreenApi = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";
  const user_id = Cookies.get("user_id");

  return useQuery<HomeScreenRes>(
    ["web-home"],
    async () => {
      const response = await axios.post<HomeScreenRes>(
        `${baseURL}/web-home`,
        user_id ? { user_id } : {} // Agar user_id hai toh pass karo, nahi toh empty object bhejo
      );
      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
