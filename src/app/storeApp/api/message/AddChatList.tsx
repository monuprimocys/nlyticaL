import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const AddChatList = createApi({
  reducerPath: "AddChatList",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    AddChatList: builder.mutation({
      query: (AddChatList) => ({
        url: "add-chat",
        method: "POST",
        body: AddChatList,
      }),
    }),
  }),
});

export const { useAddChatListMutation } = AddChatList;
