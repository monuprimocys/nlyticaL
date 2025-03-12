import { useMutation } from "react-query";
import axios from "axios";

const baseURL = "http://192.168.0.69:8001/api";

export const useAddNewsemail = () => {
  return useMutation(async (email: string) => {
    const response = await axios.post(`${baseURL}/add-newsemail`, { email });
    return response.data;
  });
};
