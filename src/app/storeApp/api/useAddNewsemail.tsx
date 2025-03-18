import { useMutation } from "react-query";
import axios from "axios";

const baseURL = "https://nlytical.theprimocys.com/api";

export const useAddNewsemail = () => {
  return useMutation(async (email: string) => {
    const response = await axios.post(`${baseURL}/add-newsemail`, { email });
    return response.data;
  });
};
