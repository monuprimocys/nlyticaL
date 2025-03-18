import { AddUserRegistrationRes } from "@/app/types/Restypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the base URL for the API
const baseURL = "https://nlytical.theprimocys.com/api";

export const RegisterWithMobailnumber = createApi({
  reducerPath: "RegisterWithMobailnumber",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    RegisterAccount: builder.mutation<
      AddUserRegistrationRes,
      AddUserRegistrationRes
    >({
      query: (RegisterWithMobailnumber) => ({
        url: "newuser-registeraccount",
        method: "POST",
        body: RegisterWithMobailnumber,
      }),
    }),
  }),
});

export const { useRegisterAccountMutation } = RegisterWithMobailnumber;
