import { LoginUserRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const LoginUser = createApi({
  reducerPath: "LoginUser",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginUserRes, LoginUserRes>({
      query: (loginUserdata) => ({
        url: "user-login",
        method: "POST",
        body: loginUserdata,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = LoginUser;
