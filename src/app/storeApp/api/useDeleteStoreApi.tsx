import { useMutation } from "react-query";
import axios from "axios";

export const useDeleteStoreApi = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useMutation(
    async (store_id: string) => {
      const response = await axios.post(
        `${baseURL}/delete-store`,
        { store_id } // Send the store_id in the request body
      );
      return response.data;
    },
    {
      onSuccess: () => {
        // Optional: Handle success logic like showing a success message, etc.
        // For example, closing the modal:
        console.log("Store deleted successfully");
      },
      onError: (error) => {
        // Optional: Handle error logic
        console.error("Error deleting store:", error);
      },
    }
  );
};
