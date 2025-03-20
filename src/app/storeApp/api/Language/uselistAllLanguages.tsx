import { useQuery } from "react-query";
import axios from "axios";
import { ListAllLanguages } from "@/app/types/Restypes";



export const useListAllLanguages = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery<ListAllLanguages>(
    ["listAllLanguages"],
    async () => {
      const { data } = await axios.post<ListAllLanguages>(`${baseURL}/listAllLanguages`);
      return data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
