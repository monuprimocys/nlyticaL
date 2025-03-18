import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllSubCategoryRes } from "@/app/types/Restypes";

const baseURL = "https://nlytical.theprimocys.com/api";

export const GetAllSubCategory = createApi({
  reducerPath: "GetAllSubCategory",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    // Update the query to send FormData
    getSubCategories: builder.query<
      GetAllSubCategoryRes,
      { category_id: string }
    >({
      query: ({ category_id }) => ({
        url: "get-subcategory",
        method: "POST", 
        body: new URLSearchParams({ category_id }),
      }),
    }),
  }),
});

export const { useGetSubCategoriesQuery } = GetAllSubCategory;
