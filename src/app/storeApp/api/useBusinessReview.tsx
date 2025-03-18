import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { BusinessReviewRes } from "@/app/types/Restypes";

export const useBusinessReview = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";
  const service_id = Cookies.get("service_id");

  // If service_id doesn't exist, you can either throw an error or fallback
  if (!service_id) {
    throw new Error("Service ID is missing");
  }

  return useQuery<BusinessReviewRes>(
    ["business-review", service_id], // Use the service_id in the query key for uniqueness
    async () => {
      const response = await axios.post<BusinessReviewRes>(
        `${baseURL}/business-review`,
        { service_id }
      );
      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
      refetchOnWindowFocus: false, // Avoid refetching when window is focused
    }
  );
};
