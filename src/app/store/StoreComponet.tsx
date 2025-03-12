"use client";

import React, { useEffect } from "react";
import SerachDesing from "../componets/Listing/LeftSide/SerachDesing";
import CardListing from "../componets/Listing/RightSide/CardListing";
import ServiceListBreadCome from "../componets/AllBreadCome/ServiceListBreadCome";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";
import { usePathname } from "next/navigation";
import { setSelectedUser } from "../storeApp/Slice/userSlice";

function StoreComponet() {
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
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/listing") {
      dispatch(
        setSelectedUser({
          id: null,
          second_id: null,
          firstName: null,
          lastName: null,
          profilePic: null,
          lastMessage: null,
          lastSeen: null,
          isOnline: null,
          unreadMessageCount: null,
          userRole: null,
          time: null,
          isBlocked: null,
        })
      );
    }
  }, [pathname, dispatch]); // Dependency array ensures useEffect runs only when pathname changes

  console.log("My business is:!!!!!!!!!!!!!!!!!!!!!!!!!!!!@", pathname);

  return (
    <div className={`w-full h-auto   ${isDarkMode ? "bg-[#181818]" : ""}`}>
      {/* Header */}
      <div>
        <ServiceListBreadCome />
      </div>

      <div
        className={`mx-auto 2xl:w-[80%] xl:w-[80%] w-[90%] mt-[5rem] grid xl:grid-cols-[20%_80%] gap-6     grid-cols-1   ${
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

export default StoreComponet;
