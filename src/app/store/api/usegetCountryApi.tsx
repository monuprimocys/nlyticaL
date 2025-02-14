import { useQuery } from "react-query";
import axios from "axios";
import { HomeGetCountrieslistRes } from "@/app/types/Restypes";

export const useGetCountryApi = () => {
  const baseURL = "http://192.168.0.69:8001/api";

  return useQuery<HomeGetCountrieslistRes>(
    ["get-countrieslist"],
    async () => {
      const response = await axios.get<HomeGetCountrieslistRes>(
        `${baseURL}/get-countrieslist`
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
