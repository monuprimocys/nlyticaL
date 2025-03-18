import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { GegetcampaignAll } from "@/app/types/Restypes";

export const useGetAllCompain = () => {
  // Get user_id from cookies
  const vendor_id = Cookies.get("user_id");

  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery(
    "get-campaign",
    async () => {
      const response = await axios.post<GegetcampaignAll>(
        `${baseURL}/get-campaign`,
        { vendor_id } // Pass user_id in the request body
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
