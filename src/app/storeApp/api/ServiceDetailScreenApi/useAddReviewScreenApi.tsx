import { useMutation } from "react-query";
import axios from "axios";
import { AddReviewDetailsRes } from "../../../types/Restypes";

// Update the API hook to use `useMutation`
export const useAddReviewScreenApi = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useMutation<AddReviewDetailsRes, Error, { service_id: string; user_id: string; review_star: string; review_message: string }>(
    async ({ service_id, user_id, review_star, review_message }) => {
      const response = await axios.post<AddReviewDetailsRes>(
        `${baseURL}/add-review`,
        { service_id, user_id, review_star, review_message }
      );
      return response.data;
    }
  );
};
