import { useQuery } from "react-query";
import axios from "axios";
import { HomeGetCountrieslisCategorytRes } from "@/app/types/Restypes";
export const useGetCountryCategoryApi = (value) => {
  const baseURL = "http://192.168.0.69:8001/api";

  return useQuery<HomeGetCountrieslisCategorytRes>(
    ["get-countriescategories", value],
    async () => {
      const response = await axios.post<HomeGetCountrieslisCategorytRes>(
        `${baseURL}/get-countriescategories`,
        { value } // Send selected country as part of the request body
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
