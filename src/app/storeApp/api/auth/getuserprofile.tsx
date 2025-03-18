import { GetAlluserprofileRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const getuserprofile = createApi({
  reducerPath: "getuserprofile",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    Profile: builder.mutation<GetAlluserprofileRes, GetAlluserprofileRes>({
      query: (getuserprofile) => ({
        url: "get-userprofile",
        method: "POST",
        body: getuserprofile,
      }),
    }),
  }),
});

export const { useProfileMutation } = getuserprofile;
