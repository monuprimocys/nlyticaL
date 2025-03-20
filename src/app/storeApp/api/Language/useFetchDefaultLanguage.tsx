import axios from "axios";
import { useMutation } from "react-query";

export const useFetchDefaultLanguage = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useMutation(async (status_id: string) => {
    const response = await axios.post(`${baseURL}/fetchDefaultLanguage`, {
      status_id,
    });
    
    return response.data;
  });
};
