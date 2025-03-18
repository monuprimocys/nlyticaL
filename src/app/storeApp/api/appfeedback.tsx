import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API Base URL
const baseURL = "https://nlytical.theprimocys.com/api";

export const appfeedback = createApi({
  reducerPath: "appfeedback",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    // Change query to mutation to post data
    appfeedback: builder.mutation<
      void,
      { user_id: string; feedback_review: string }
    >({
      query: ({ user_id, feedback_review }) => ({
        url: "app-feedback",
        method: "POST",
        body: new URLSearchParams({
          user_id,
          feedback_review,
        }),
      }),
    }),
  }),
});

// Export the hook for mutation
export const { useAppfeedbackMutation } = appfeedback;
