"use client";

import React, { useEffect } from "react";
import SerachDesing from "../componets/Listing/LeftSide/SerachDesing";
import CardListing from "../componets/Listing/RightSide/CardListing";
import ServiceListBreadCome from "../componets/AllBreadCome/ServiceListBreadCome";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setDarkMode } from "../store/Slice/darkModeSlice";

function Listing() {
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
    <div className={`w-full h-auto   ${isDarkMode ? "bg-[#181818]" : ""}`}>
      {/* Header */}
      <div>
        <ServiceListBreadCome />
      </div>

      <div
        className={`mx-auto 2xl:w-[60%] xl:w-[80%] w-[90%] mt-[5rem] grid xl:grid-cols-[30%_70%] gap-6     grid-cols-1   ${
          isDarkMode ? " bg-[#181818] " : " bg-[#FFFFFF]"
        }`}
      >
        {/* First column */}
        <div className=" h-auto">
          <SerachDesing />
        </div>

        {/* Second column */}
        <div className=" h-auto ">
          <CardListing />
        </div>
      </div>
    </div>
  );
}

export default Listing;
