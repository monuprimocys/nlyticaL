import { RegisterModalVerifyOtpRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const ForgotPasswordVerifyOtp = createApi({
  reducerPath: "ForgotPasswordVerifyOtp",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    ForgotPasswordVerifyOtp: builder.mutation<
      RegisterModalVerifyOtpRes,
      RegisterModalVerifyOtpRes
    >({
      query: (ForgotPasswordVerifyOtp) => ({
        url: "passwordotp-verify",
        method: "POST",
        body: ForgotPasswordVerifyOtp,
      }),
    }),
  }),
});

export const { useForgotPasswordVerifyOtpMutation } = ForgotPasswordVerifyOtp;
