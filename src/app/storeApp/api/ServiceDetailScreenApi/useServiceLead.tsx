import { useMutation } from "react-query";
import axios from "axios";

export const useServiceLead = () => {
  const baseURL = "http://192.168.0.69:8001/api";

  return useMutation(async (service_id: string) => {
    const response = await axios.post(`${baseURL}/service-count`, { service_id });
    return response.data;
  });
};
