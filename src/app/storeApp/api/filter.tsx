// Redux API (filter.ts)
import { FilterRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const filter = createApi({
  reducerPath: "filter",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    filter: builder.mutation<FilterRes, FilterRes>({
      query: (filter) => ({
        url: "filter",
        method: "POST",
        body: filter,
      }),
    }),
  }),
});

export const { useFilterMutation } = filter;
