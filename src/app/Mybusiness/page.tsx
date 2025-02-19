"use client";

import React, { useEffect } from "react";
import MybusinessLable from "../componets/Mybusiness/MybusinessLable";
import MainSectionQuickLink from "../componets/Mybusiness/BusinessQuickLinks/MainSectionQuickLink";
import Businesstools from "../componets/Mybusiness/BusinessTools/Businesstools";
import BusinessService from "../componets/Mybusiness/BusinessService/BusinessService";
import CustomeSupport from "../componets/Mybusiness/CustomreSupport/CustomeSupport";
import MybusinessBreadCome from "../componets/AllBreadCome/MybusinessBreadCome";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { setDarkMode } from "../store/Slice/darkModeSlice";
import SponsorLable from "../componets/Mybusiness/SponsorComponets/SponsorLable";

function Mybusiness() {
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
      className={`w-full h-auto flex flex-col ${
        isDarkMode ? " bg-[#181818]" : " bg-white"
      }`}
    >
      {/*  MybusinessBreadCome  */}
      <MybusinessBreadCome />

      {/*  complete my lable bussiness  */}
      <MybusinessLable />
      <SponsorLable />
      <MainSectionQuickLink />
      <Businesstools />
      <BusinessService />
      <CustomeSupport />
    </div>
  );
}

export default Mybusiness;
