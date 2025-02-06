"use client";

import ServiceDetailBreadCome from "@/app/componets/AllBreadCome/ServiceDetailBreadCome";
import ServiceDetalScreenleftside from "@/app/componets/ServiceDetailScreen/ServiceDetalScreenleftside/ServiceDetalScreenleftside";
import ServiceDetalScreenrightside from "@/app/componets/ServiceDetailScreen/ServiceDetalScreenrightside/ServiceDetalScreenrightside";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setDarkMode } from "@/app/store/Slice/darkModeSlice";
import React, { useEffect } from "react";

function Page() {
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
      className={`w-full h-auto        ${
        isDarkMode ? "  bg-[#181818]" : " bg-white"
      }`}
    >
      {/* header */}
      <ServiceDetailBreadCome />

      {/* left side and right side card detail screen */}
      <div className="mx-auto w-[95%] md:w-[90%] lg:w-[80%] xl:w-[80%] 2xl:w-[60%] flex flex-col lg:flex-row h-auto mt-[3rem] gap-6 items-start">
        {/* Left side */}
        <div className="w-full lg:w-[65%] h-auto">
          <ServiceDetalScreenleftside />
        </div>

        {/* Right side */}
        <div className="w-full lg:w-[35%] h-auto">
          <ServiceDetalScreenrightside />
        </div>
      </div>
    </div>
  );
}

export default Page;
