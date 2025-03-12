import { useQuery } from "react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { ServiceDetailScreenRes } from "../../../types/Restypes";

export const useServiceDetailApi = (service_id: string) => {
  const baseURL = "http://192.168.0.69:8001/api";
  const user_id = Cookies.get("user_id");

  return useQuery<ServiceDetailScreenRes>(
    ["service-detail", service_id, user_id], // Include user_id in query key for uniqueness
    async () => {
      const requestBody = user_id ? { service_id, user_id } : { service_id }; // Conditionally include user_id

      const response = await axios.post<ServiceDetailScreenRes>(
        `${baseURL}/get-servicedetail`,
        requestBody
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
