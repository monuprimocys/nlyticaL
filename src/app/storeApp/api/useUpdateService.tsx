import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useUpdateService = () => {
  // Get user_id from cookies
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  if (!vendor_id || !service_id) {
    // Handle the case when user_id is not available (optional)
    throw new Error("User ID is required for fetching favourite properties");
  }

  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery(
    "update-service",
    async () => {
      const response = await axios.post(
        `${baseURL}/update-service`, // Ensure the correct endpoint path
        { vendor_id, service_id } // Pass user_id in the request body
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
