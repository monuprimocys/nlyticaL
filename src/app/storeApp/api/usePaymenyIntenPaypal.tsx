"use client";
import { useQuery } from "react-query";
import axios from "axios";

export const usePaymenyIntenPaypal = () => {
  // Get user_id from cookies
  const price = sessionStorage.getItem("planPrice");

  const amount = price ? price.replace(/[^\d.-]/g, "") : "";

  if (!amount) {
    // Handle the case when user_id is not available (optional)
    throw new Error("price is required ");
  }

  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery(
    "paypal-intent",
    async () => {
      const response = await axios.post(
        `${baseURL}/paypal-intent`, // Ensure the correct endpoint path
        { amount } // Pass user_id in the request body
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
