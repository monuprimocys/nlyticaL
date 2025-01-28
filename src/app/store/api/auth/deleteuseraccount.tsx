import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "http://192.168.0.69:8001/api";

export const deleteuseraccount = createApi({
  reducerPath: "deleteuseraccount",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    // Update the query to send FormData
    deleteAccount: builder.query<void, { user_id: string }>({
      query: ({ user_id }) => ({
        url: "delete-useraccount",
        method: "POST",
        body: new URLSearchParams({ user_id }),
      }),
    }),
  }),
});

export const { useDeleteAccountQuery } = deleteuseraccount;
