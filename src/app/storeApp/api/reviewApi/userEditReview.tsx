import { useQuery, useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://nlytical.theprimocys.com/api";

// Fetch the review data
export const useUserEditReview = () => {
  const user_id = Cookies.get("user_id");
  const review_id = Cookies.get("reviewid");

  if (!user_id || !review_id) {
    throw new Error("User ID and Review ID are required for fetching reviews");
  }

  return useQuery(
    ["edit-userreview", user_id, review_id], // Use unique query keys for better caching
    async () => {
      const response = await axios.post(`${baseURL}/edit-userreview`, {
        user_id,
        id: review_id,
      });
      return response.data;
    },
    {
      staleTime: 1000 * 60 * 5, // Cache is fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Cache is stored for 10 minutes
    }
  );
};

// Update the review
export const useUpdateReview = () => {
  return useMutation(
    async ({ user_id, id, service_id, review_star, review_message }) => {
      const response = await axios.post(`${baseURL}/edit-userreview`, {
        id,
        user_id,
        service_id,
        review_star,
        review_message,
      });
      return response.data;
    }
  );
};
