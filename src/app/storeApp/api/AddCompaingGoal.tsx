import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "http://192.168.0.69:8001/api";

export const AddCompaingGoal = createApi({
  reducerPath: "AddCompaingGoal",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    AddCompaingGoal: builder.mutation({
      query: (AddCompaingGoal) => ({
        url: "add-goals",
        method: "POST",
        body: AddCompaingGoal,
      }),
    }),
  }),
});

export const { useAddCompaingGoalMutation } = AddCompaingGoal;
