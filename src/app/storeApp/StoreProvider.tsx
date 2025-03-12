"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Script from "next/script";

const GOOGLE_MAPS_API_KEY = "AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA"; // Replace with your API key

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <Script
        id="google-maps-script"
        strategy="lazyOnload"
        src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`}
      />
      <GoogleOAuthProvider clientId="1000174940582-4b02g5ujtfh5cf5ojtl1e21vu658988t.apps.googleusercontent.com">
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>{children}</Provider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </>
  );
};

export default StoreProvider;
