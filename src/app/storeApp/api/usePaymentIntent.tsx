"use client";
import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";

export const usePaymentIntent = () => {
  // Get user_id from cookies
  const user_id = Cookies.get("user_id");
  const price = sessionStorage.getItem("planPrice");

  const total = price ? price.replace(/[^\d.-]/g, "") : "";

  if (!user_id || !total) {
    // Handle the case when user_id is not available (optional)
    throw new Error("User ID is required for fetching favourite properties");
  }

  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery(
    "stripe-intent",
    async () => {
      const response = await axios.post(
        `${baseURL}/stripe-intent`, // Ensure the correct endpoint path
        { user_id, total } // Pass user_id in the request body
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
