import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const AddService = createApi({
  reducerPath: "AddService",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    AddService: builder.mutation({
      query: (AddService) => ({
        url: "add-service",
        method: "POST",
        body: AddService,
      }),
    }),
  }),
});

export const { useAddServiceMutation } = AddService;
