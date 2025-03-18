import { useQuery } from "react-query";
import axios from "axios";
import { Subscriptionplan } from "@/app/types/Restypes";

export const useServicePlane = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery<Subscriptionplan>(
    ["subscription-plan"],
    async () => {
      const response = await axios.post<Subscriptionplan>(
        `${baseURL}/subscription-plan`
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
