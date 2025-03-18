import React, { createContext, useContext, useEffect } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie

const baseURL = "https://nlytical.theprimocys.com/api";

// Mutation hook to update user status
const useCheckOnlineOffline = () => {
  return useMutation(
    async ({ user_id, status }: { user_id: string; status: string }) => {
      const response = await axios.post(`${baseURL}/user-online`, {
        user_id,
        status,
      });
      return response.data;
    }
  );
};

// Create a Context
const OnlineStatusContext = createContext({});

// Global Provider Component
export const OnlineStatusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mutate, mutateAsync } = useCheckOnlineOffline();

  // Get user_id from cookies
  const userId = Cookies.get("user_id");

  useEffect(() => {
    if (!userId) return; // Prevent API call if user_id is missing

    // Mark user as online when component mounts
    mutate({ user_id: userId, status: "1" });

    return () => {
      // Show an alert when the page unmounts
      alert("You are going offline!");

      // Mark user as offline when component unmounts
      mutateAsync({ user_id: userId, status: "0" }).catch((error) =>
        console.error("Error setting user offline:", error)
      );
    };
  }, [mutate, mutateAsync, userId]);

  return (
    <OnlineStatusContext.Provider value={{}}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

// Hook to use the Context
export const useOnlineStatus = () => {
  return useContext(OnlineStatusContext);
};
