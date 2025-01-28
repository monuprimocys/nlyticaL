import { AddCustomerSupportRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "http://192.168.0.69:8001/api";

export const AddCustomerSupport = createApi({
  reducerPath: "AddCustomerSupport",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    addCustomerSupport: builder.mutation<
      AddCustomerSupportRes,
      AddCustomerSupportRes
    >({
      query: (customerSupportData) => ({
        url: "add-customersupport",
        method: "POST",
        body: customerSupportData,
      }),
    }),
  }),
});

export const { useAddCustomerSupportMutation } = AddCustomerSupport;
