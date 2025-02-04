"use client";

import React from "react";
import addprofile from "../../../../../public/assets/Image/addphotobusiness.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/store/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";

function AddPhotos() {
  const dispatch = useDispatch();

    const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  
  return (
    <div className="  flex  flex-col gap-2 cursor-pointer ">
      <div
        className="w-[6.3rem]  h-[6.3rem] rounded-lg  flex justify-center items-center  bg-[#C5FFCD]  "
        onClick={() => {
          dispatch(showModal("BusinessImagesModal"));
        }}
      >
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
        <p>Add </p>
        <p>Photos</p>
      </div>
    </div>
  );
}

export default AddPhotos;
