import { ResendotpandForgetpwdRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const ResendotpandForgetpwd = createApi({
  reducerPath: "ResendotpandForgetpwd",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    ResendotpandForgetpwd: builder.mutation<
      ResendotpandForgetpwdRes,
      ResendotpandForgetpwdRes
    >({
      query: (ResendotpandForgetpwd) => ({
        url: "forgot-password",
        method: "POST",
        body: ResendotpandForgetpwd,
      }),
    }),
  }),
});

export const { useResendotpandForgetpwdMutation } = ResendotpandForgetpwd;
