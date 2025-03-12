"use client";

import React from "react";
import addprofile from "../../../../../public/assets/Image/addcontactbusiness.png";
import Image from "next/image";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";

function AddContact() {
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className="  flex  flex-col gap-2 cursor-pointer "
      onClick={() => {
        dispatch(showModal("ContactDetailsModal"));
      }}
    >
      <div className=" w-[6.3rem]  h-[6.3rem] rounded-lg  flex justify-center items-center  bg-[#DCEBFF]  ">
        <Image
          src={addprofile}
          alt="edit profile"
          className="w-[60%] h-[60%]  object-contain rounded-lg"
        />
      </div>
      {/*  lable  */}
      <div
        className={`flex flex-col  items-center   font-poppins   text-[17px] font-medium  ${
          isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
        } `}
      >
        <p>Add </p>
        <p> Contact</p>
      </div>
    </div>
  );
}

export default AddContact;
