import { useQuery } from "react-query";
import axios from "axios";
import { MessageListRes } from "@/app/types/Restypes";
import Cookies from "js-cookie";

export const useUserChatList = (searchQuery) => {
  const baseURL = "https://nlytical.theprimocys.com/api";
  const cookieUserId = Cookies.get("user_id");

  return useQuery<MessageListRes>(
    ["chat-list", cookieUserId, searchQuery], // Add searchQuery to the query key
    async () => {
      const response = await axios.post<MessageListRes>(
        `${baseURL}/chat-list`,
        {
          user_id: cookieUserId,
          first_name: searchQuery // Include search query in request body
        }
      );

      return response.data;
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );
};

