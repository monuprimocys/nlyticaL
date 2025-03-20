import axios from "axios";
import { useMutation } from "react-query";

export const useAddLangKey = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useMutation(async (key: string) => {
    const response = await axios.post(`${baseURL}/addKey`, { key });
    return response.data;
  });
};
