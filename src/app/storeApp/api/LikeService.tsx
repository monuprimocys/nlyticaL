import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { FavouritePropertiesRes } from "@/app/types/Restypes";

export const useFavouriteProperties = () => {
  // Get user_id from cookies
  const user_id = Cookies.get("user_id");

  if (!user_id) {
    // Handle the case when user_id is not available (optional)
    throw new Error("User ID is required for fetching favourite properties");
  }

  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery<FavouritePropertiesRes, Error>(
    "user_get_like_property",
    async () => {
      const response = await axios.post<FavouritePropertiesRes>(
        `${baseURL}/get-likedservices`, // Ensure the correct endpoint path
        { user_id } // Pass user_id in the request body
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
