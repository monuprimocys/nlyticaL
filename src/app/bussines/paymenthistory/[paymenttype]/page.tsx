"use client";

import MybusinessSponsor from "@/app/componets/AllBreadCome/MybusinessSponsor";
import Paymenthistry from "@/app/componets/AllBreadCome/Paymenthistry";
import ListHistory from "@/app/componets/Mybusiness/PaymentHistory/ListHistory";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";
import React, { useEffect } from "react";

function PaymentHistory() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  console.log("My business is:!!!!!!!!!!!!!!!!!!!!!!!!!!!!", isDarkMode);
  return (
    <div
      className={`w-full h-auto flex flex-col gap-6  ${
        isDarkMode ? " bg-[#181818]" : "bg-white "
      }`}
    >
      <Paymenthistry />
      <ListHistory />
    </div>
  );
}

export default PaymentHistory;
