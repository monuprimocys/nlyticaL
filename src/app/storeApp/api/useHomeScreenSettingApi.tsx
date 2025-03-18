import { useQuery } from "react-query";
import axios from "axios";
import { HomeScreenSettingRes } from "@/app/types/Restypes";

export const useHomeScreenSettingApi = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery<HomeScreenSettingRes>(
    ["get-homesettings"],
    async () => {
      const response = await axios.get<HomeScreenSettingRes>(
        `${baseURL}/get-homesettings`
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
