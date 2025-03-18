import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://nlytical.theprimocys.com/api";

export const deleteuseraccount = createApi({
  reducerPath: "deleteuseraccount",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    deleteAccount: builder.mutation<void, { user_id: string }>({
      query: ({ user_id }) => ({
        url: "delete-useraccount",
        method: "POST",
        body: new URLSearchParams({ user_id }), // Send the user_id in the body
      }),
    }),
  }),
});

export const { useDeleteAccountMutation } = deleteuseraccount;
