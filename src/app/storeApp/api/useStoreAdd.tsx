import { useMutation } from "react-query";
import axios from "axios";

// Define the types for the API response and input
interface AddReviewInput {
  service_id: string;
  vendor_id: string;
  store_name: string;
  store_description: string;
  price: string;
  subcategory_id: string;
  store_images: File[]; // Change this to File[] since you're sending files
  store_attachments: File[]; // Change this to File[] since you're sending files
}

export const useAddStoreApi = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useMutation<any, Error, AddReviewInput>(
    async ({
      service_id,
      vendor_id,
      store_name,
      store_description,
      subcategory_id,
      price,
      store_images,
      store_attachments,
    }: AddReviewInput) => {
      const formData = new FormData();

      // Append regular fields to the FormData
      formData.append("service_id", service_id);
      formData.append("vendor_id", vendor_id);
      formData.append("store_name", store_name);
      formData.append("store_description", store_description);
      formData.append("price", price);
      formData.append("subcategory_id", subcategory_id);

      // Append files (store_images and store_attachments) to FormData
      store_images.forEach((file) => {
        formData.append("store_images[]", file); // Note that you use "store_images[]" to handle multiple files
      });

      store_attachments.forEach((file) => {
        formData.append("store_attachments[]", file); // Same for attachments
      });

      // Make the API call with FormData
      const response = await axios.post(`${baseURL}/add-store`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });

      return response.data; // Handle the response
    }
  );
};
