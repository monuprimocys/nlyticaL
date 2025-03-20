import { useMutation } from "react-query";
import axios from "axios";

export const useCheackUserNameExit = () => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useMutation(async (username: string) => {
    const response = await axios.post(`${baseURL}/username-exist`, {
      username,
    });
    return response.data;
  });
};
