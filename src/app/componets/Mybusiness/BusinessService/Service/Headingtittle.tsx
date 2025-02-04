"use client";


import React from "react";
import "../../businesscss.css";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/store/Slice/modalSlice";
function Headingtittle() {
  const dispatch = useDispatch();

  return (
    <div className=" w-full justify-center items-center">
      {/*  heading */}
      <div className=" w-full flex  flex-col justify-center items-center">
        <h2 className="text-5xl font-medium text-[#0046AE]  AmericanSign">
          All
        </h2>
        <h4 className="text-5xl font-medium text-[#000000] font-poppins">
          Services
        </h4>
      </div>

      {/*  add service btn  */}
      <div
        className=" w-full  flex justify-end  items-center"
        
      >
        <button className=" bordercolorservice text-[#0046AE] px-14 py-3 rounded-xl text-lg font-semibold"  onClick={() => {
          dispatch(showModal("AddStoreModal"));
        }}>
          Add Service
        </button>
      </div>
    </div>
  );
}

export default Headingtittle;
