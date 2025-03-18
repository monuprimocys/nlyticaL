import { useMutation } from "react-query";
import axios from "axios";
import { RemoveServiceImagesRes } from "@/app/types/Restypes";

// Handles image removal from the backend
const useRemoveServiceImage = (vendor_id: string, service_id: string) => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useMutation<RemoveServiceImagesRes, Error, string>(
    async (service_image_id: string) => {
      const response = await axios.post<RemoveServiceImagesRes>(
        `${baseURL}/remove-serviceimages`,
        { vendor_id, service_id, service_image_id }
      );
      return response.data;
    }
  );
};

export default useRemoveServiceImage;
