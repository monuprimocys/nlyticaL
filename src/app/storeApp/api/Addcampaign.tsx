import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "http://192.168.0.69:8001/api";

export const Addcampaign = createApi({
  reducerPath: "Addcampaign",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    Addcampaign: builder.mutation({
      query: (Addcampaign) => ({
        url: "add-campaign",
        method: "POST",
        body: Addcampaign,
      }),
    }),
  }),
});

export const { useAddcampaignMutation } = Addcampaign;
