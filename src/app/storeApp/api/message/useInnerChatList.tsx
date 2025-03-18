import { useQuery } from "react-query";
import axios from "axios";
import { InnerChatListRes } from "@/app/types/Restypes";

export const useInnerChatList = (from_user: string, to_user: string) => {
  const baseURL = "https://nlytical.theprimocys.com/api";

  return useQuery<InnerChatListRes>(
    ["inner-chat", from_user, to_user], // Use the service_id in the query key for uniqueness
    async () => {
      const response = await axios.post<InnerChatListRes>(
        `${baseURL}/inner-chat`,
        { from_user, to_user } // Pass the service_id in the request body
      );

      return response.data;
    },
    {
      staleTime: Infinity, // Data will never be considered stale
      cacheTime: Infinity, // Data will never be removed from cache
    }
  );
};
