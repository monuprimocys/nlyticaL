"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const StoreProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};

export default StoreProvider;
