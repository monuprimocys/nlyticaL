import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const useGetPaymenthistory = () => {
  const vendor_id = Cookies.get("user_id");

  if (!vendor_id) {
    throw new Error("User ID not found in cookie");
  }

  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery(
    ["get-goalspayment", vendor_id], // Query key
    async () => {
      const response = await axios.post(`${baseURL}/get-goalspayment`, {
        vendor_id,
      });
      return response.data;
    },
    {
      enabled: !!vendor_id, // Prevent fetching if user_id is missing
      onSuccess: (data) => {
        console.log("Fetched Reviews:", data);
      },
      onError: (error) => {
        console.error("Error fetching reviews:", error);
      },
    }
  );
};
