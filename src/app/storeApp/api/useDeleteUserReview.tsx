import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useGetReview } from "./useGetReview";

export const useDeleteUserReview = () => {
  const user_id = Cookies.get("user_id");
  const { refetch } = useGetReview();

  if (!user_id) {
    throw new Error("User ID is required to delete review");
  }

  const baseURL = "https://nlytical.theprimocys.com/api";

  // Use useMutation for the delete request
  return useMutation(
    async (id) => {
      const response = await axios.post(
        `${baseURL}/delete-userreview`,
        { user_id, id } // Pass user_id and id in the request body
      );

      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("Review deleted successfully", data);
        refetch(); // Refresh the review list after deletion
      },
      onError: (error) => {
        console.error("Error deleting review", error);
      },
    }
  );
};
