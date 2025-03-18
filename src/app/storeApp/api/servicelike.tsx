import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API Base URL
const baseURL = "https://nlytical.theprimocys.com/api";

export const servicelike = createApi({
  reducerPath: "servicelike",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    servicelike: builder.mutation<
      void,
      { user_id: string; service_id: string }
    >({
      query: ({ user_id, service_id }) => ({
        url: "service-like",
        method: "POST",
        body: new URLSearchParams({
          user_id,
          service_id,
        }),
      }),
    }),
  }),
});

// Export the hook for mutation
export const { useServicelikeMutation } = servicelike;
