import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const Payment = createApi({
  reducerPath: "Payment",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    Payment: builder.mutation({
      query: (Payment) => ({
        url: "goalpayment-success",
        method: "POST",
        body: Payment,
      }),
    }),
  }),
});

export const { usePaymentMutation } = Payment;
