import { ResetPasswordRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "http://192.168.0.69:8001/api";

export const Resetpassword = createApi({
  reducerPath: "Resetpassword",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    Resetpassword: builder.mutation<ResetPasswordRes, ResetPasswordRes>({
      query: (Resetpassword) => ({
        url: "reset-password",
        method: "POST",
        body: Resetpassword,
      }),
    }),
  }),
});

export const { useResetpasswordMutation } = Resetpassword;
