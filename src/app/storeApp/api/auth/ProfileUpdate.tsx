import { ProfileUpdate } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const updateuserprofile = createApi({
  reducerPath: "updateuserprofile",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    UpdateProfile: builder.mutation<ProfileUpdate, ProfileUpdate>({
      query: (updateuserprofile) => ({
        url: "update-userprofile",
        method: "POST",
        body: updateuserprofile,
      }),
    }),
  }),
});

export const { useUpdateProfileMutation } = updateuserprofile;
