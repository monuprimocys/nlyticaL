import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const AddSociallogin = createApi({
  reducerPath: "AddSociallogin",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    AddSociallogin: builder.mutation({
      query: (AddSocialloginData) => ({
        url: "social-login",
        method: "POST",
        body: AddSocialloginData,
      }),
    }),
  }),
});

export const { useAddSocialloginMutation } = AddSociallogin;
