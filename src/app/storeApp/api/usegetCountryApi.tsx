import { useQuery } from "react-query";
import axios from "axios";
import { HomeGetCountrieslistRes } from "@/app/types/Restypes";

export const useGetCountryApi = (
  data_search: string,
  lat?: string,
  lon?: string
) => {
  const baseURL = "http://192.168.0.69:8001/api";

  return useQuery<HomeGetCountrieslistRes>(
    ["get-countrieslist", data_search, lat, lon], // Include all dependencies in query key
    async () => {
      try {
        const response = await axios.post<HomeGetCountrieslistRes>(
          `${baseURL}/get-countrieslist`,
          {
            data_search,
            lat: lat ?? "", // Ensure lat/lon are not undefined
            lon: lon ?? "",
          }
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching country list:", error);
        throw error;
      }
    },
    {
      staleTime: Infinity, // Cache does not become stale
      cacheTime: Infinity, // Cache persists indefinitely
      enabled: Boolean(data_search && lat && lon), // Ensures the query only runs when all params are valid
    }
  );
};
