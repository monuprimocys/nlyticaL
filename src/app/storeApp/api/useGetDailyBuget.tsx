import { useQuery } from "react-query";
import axios from "axios";
import { GetbudgetcountRes } from "@/app/types/Restypes";

export const useGetDailyBuget = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery<GetbudgetcountRes>(
    ["get-budgetcount"],
    async () => {
      const response = await axios.get<GetbudgetcountRes>(
        `${baseURL}/get-budgetcount`
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
