"use client";

import React from "react";
import "../../businesscss.css";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
function Headingtittle() {
  const dispatch = useDispatch();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className=" w-full justify-center items-center">
      {/*  heading */}
      <div className=" w-full flex  flex-col justify-center items-center">
        <h2
          className={`text-5xl font-medium   AmericanSign  ${
            isDarkMode ? "text-[#ffffff]" : "text-[#0046AE]"
          }`}
        >
          All
        </h2>
        <h4
          className={`text-5xl font-medium  font-poppins  ${
            isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
          }`}
        >
          Services
        </h4>
      </div>

      {/*  add service btn  */}
      <div className=" w-full  flex justify-end  items-center">
        <button
          className=" bordercolorservice text-[#0046AE] px-14 py-3 rounded-xl text-lg font-semibold"
          onClick={() => {
            dispatch(showModal("AddStoreModal"));
          }}
        >
          Add Service
        </button>
      </div>
    </div>
  );
}

export default Headingtittle;
