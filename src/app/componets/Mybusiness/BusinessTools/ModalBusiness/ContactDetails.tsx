"use client";

import React, { useEffect, useState } from "react";
import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/contactbusinesss.png";
import Image from "next/image";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useUpdateService } from "@/app/storeApp/api/useUpdateService";

function ContactDetails() {
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const { data: detaildata, refetch } = useUpdateService();

  useEffect(() => {
    refetch();
  }, [detaildata]);
  return (
    <div
      className={`w-full justify-between px-4 md:px-8 py-4 rounded-lg items-center flex  cursor-pointer  ${
        isDarkMode
          ? "bg-[#212121] text-[#ffffff]"
          : "bg-[#ffffff]  businesslable text-black"
      }  `}
      onClick={() => {
        dispatch(showModal("ContactDetailsModal"));
      }}
    >
      <div className="flex gap-3 items-center">
        <div className="h-[3rem] w-[3rem] flex justify-center items-center">
          <Image
            src={handsake}
            alt="handshake"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xl font-poppins ">Contact Details </div>
      </div>

      <div className="flex gap-3 items-center">
        <p
          className={` font-normal font-poppins text-[18px]  ${
            isDarkMode ? "text-[#FFFFFF7D]" : "text-[#848484]"
          }`}
        >
          {detaildata?.service?.service_country_code}-
          {detaildata?.service?.service_phone}
        </p>

        <div className="h-[2rem] w-[2rem] flex justify-center items-center">
          <Image
            src={arrow}
            alt="arrow"
            className={`w-full h-full object-cover  ${
              isDarkMode ? "invert" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
