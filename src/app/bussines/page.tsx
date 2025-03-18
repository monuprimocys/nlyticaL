"use client";

import React, { useEffect } from "react";
import MybusinessLable from "../componets/Mybusiness/MybusinessLable";
import MainSectionQuickLink from "../componets/Mybusiness/BusinessQuickLinks/MainSectionQuickLink"; 
import Businesstools from "../componets/Mybusiness/BusinessTools/Businesstools"; 
import BusinessService from "../componets/Mybusiness/BusinessService/BusinessService";
import CustomeSupport from "../componets/Mybusiness/CustomreSupport/CustomeSupport";
import MybusinessBreadCome from "../componets/AllBreadCome/MybusinessBreadCome";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";
import SponsorLable from "../componets/Mybusiness/SponsorComponets/SponsorLable";
import { useUpdateServiceMutation } from "../storeApp/api/updateServiceApi";
import Cookies from "js-cookie";
import Labelhistory from "../componets/Mybusiness/PaymentHistory/Labelhistory";
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

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Trigger the mutation if vendor_id and service_id are present
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

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
      <Labelhistory />
      <CustomeSupport />
    </div>
  );
}

export default Mybusiness;
