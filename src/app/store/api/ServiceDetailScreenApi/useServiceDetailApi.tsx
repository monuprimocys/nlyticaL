import { useQuery } from "react-query";
import axios from "axios";
import { ServiceDetailScreenRes } from "../../../types/Restypes";

export const useServiceDetailApi = (service_id: string) => {
  const baseURL = "http://192.168.0.69:8001/api";

  return useQuery<ServiceDetailScreenRes>(
    ["service-detail", service_id], // Use the service_id in the query key for uniqueness
    async () => {
      const response = await axios.post<ServiceDetailScreenRes>(
        `${baseURL}/get-servicedetail`,
        { service_id } // Pass the service_id in the request body
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
