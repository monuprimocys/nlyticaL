import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetlikedservicesRes } from "@/app/types/Restypes";

const baseURL = "http://192.168.0.69:8001/api";

export const ServiceLikedList = createApi({
  reducerPath: "ServiceLikedList",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    // Update the query to send FormData
    serviceLikedList: builder.query<GetlikedservicesRes, { user_id: string }>({
      query: ({ user_id }) => ({
        url: "get-likedservices",
        method: "POST",
        body: new URLSearchParams({ user_id }),
      }),
    }),
  }),
});

export const { useServiceLikedListQuery } = ServiceLikedList;
