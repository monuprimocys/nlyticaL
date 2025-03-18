import { useQuery } from "react-query";
import axios from "axios";
import { VendorDetailRes } from "@/app/types/Restypes";

export const VendorInfo = (vendor_id) => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery<VendorDetailRes>(
    ["vendor-info", vendor_id], // Add searchQuery to the query key
    async () => {
      const response = await axios.post<VendorDetailRes>(
        `${baseURL}/vendor-info`,
        {
          vendor_id: vendor_id, // Include search query in request body
        }
      );

      return response.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};
