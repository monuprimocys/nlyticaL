// Redux API (updateService.ts)
import { ServiceUpdateRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const updateService = createApi({
  reducerPath: "updateService",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    updateService: builder.mutation<ServiceUpdateRes, ServiceUpdateRes>({
      query: (updateService) => ({
        url: "update-service",
        method: "POST",
        body: updateService,
      }),
    }),
  }),
});

export const { useUpdateServiceMutation } = updateService;
