import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MyReviewList } from "@/app/types/Restypes";

const baseURL = "http://192.168.0.69:8001/api";

export const userReviewlist = createApi({
  reducerPath: "userReviewlist",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    // Update the query to send FormData
    getAllReview: builder.query<MyReviewList, { user_id: string ,page_no:string }>({
      query: ({ user_id ,page_no }) => ({
        url: "user-reviewlist",
        method: "POST",
        body: new URLSearchParams({ user_id ,page_no}),
      }),
    }),
  }),
});

export const { useGetAllReviewQuery } = userReviewlist;
