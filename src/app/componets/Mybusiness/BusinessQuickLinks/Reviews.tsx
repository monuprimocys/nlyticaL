"use client";

import React from "react";
import addprofile from "../../../../../public/assets/Image/businesssreview.png";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";

function Reviews() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();
  return (
    <div
      className="  flex  flex-col gap-2 cursor-pointer "
      onClick={() => {
        dispatch(showModal("BusinessRebiewListModal"));
      }}
    >
      <div className=" w-[6.3rem]  h-[6.3rem] rounded-lg  flex justify-center items-center  bg-[#B5E2FF]  ">
        <Image
          src={addprofile}
          alt="edit profile"
          className="w-[60%] h-[60%] object-cover rounded-lg"
        />
      </div>
      {/*  lable  */}
      <div
        className={`flex flex-col  items-center   font-poppins   text-[17px] font-medium  ${
          isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
        } `}
      >
        <p>Reviews </p>
      </div>
    </div>
  );
}

export default Reviews;
