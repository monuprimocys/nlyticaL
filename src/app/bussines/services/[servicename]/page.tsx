"use client";

import MybuinessBreadComeService from "@/app/componets/AllBreadCome/MybuinessBreadComeService";
import CardlistService from "@/app/componets/Mybusiness/BusinessService/Service/CardlistService";
import Headingtittle from "@/app/componets/Mybusiness/BusinessService/Service/Headingtittle";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";
import React, { useEffect } from "react";

function Services() {
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
      className={` w-full flex  h-auto  flex-col gap-6    ${
        isDarkMode ? " bg-[#181818]" : "bg-white "
      }`}
    >
      <MybuinessBreadComeService />
      <div className="mx-auto 2xl:w-[60%] xl:w-[80%]   flex-col gap-6 w-[95%] mt-[3rem]  flex  justify-between items-center ">
        <Headingtittle />
        <CardlistService />
      </div>
    </div>
  );
}

export default Services;
