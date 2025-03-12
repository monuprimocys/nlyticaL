import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "http://192.168.0.69:8001/api";

export const RegisterModalVerifyOtp = createApi({
  reducerPath: "RegisterModalVerifyOtp",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    RegisterModalVerifyOtp: builder.mutation({
      query: (RegisterModalVerifyOtp) => ({
        url: "verify-user",
        method: "POST",
        body: RegisterModalVerifyOtp,
      }),
    }),
  }),
});

export const { useRegisterModalVerifyOtpMutation } = RegisterModalVerifyOtp;
