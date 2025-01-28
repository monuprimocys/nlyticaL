import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllCategoryRes } from "@/app/types/Restypes"; // Assuming the same type from the original code

// Define the base URL for the API
const baseURL = "http://192.168.0.69:8001/api";

export const GetAllCategory = createApi({
  reducerPath: "GetAllCategory",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getCategories: builder.query<GetAllCategoryRes, void>({
      query: () => "get-category",
    }),
  }),
});

export const { useGetCategoriesQuery } = GetAllCategory;
