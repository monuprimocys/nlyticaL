import { StoreUpdateRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const UpdateStoreApi = createApi({
  reducerPath: "UpdateStoreApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    UpdateStore: builder.mutation<StoreUpdateRes, StoreUpdateRes>({
      query: (updateStoreData) => ({
        url: "update-store",
        method: "POST",
        body: updateStoreData,
      }),
    }),
  }),
});

export const { useUpdateStoreMutation } = UpdateStoreApi;
