"use client";

import React, { useEffect } from "react";
import addprofile from "../../../../../public/assets/Image/addphotobusiness.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { useUpdateService } from "@/app/storeApp/api/useUpdateService";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import Cookies from "js-cookie";
function AddPhotos() {
  const dispatch = useDispatch();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const handalmodalopne = () => {
    if (vendor_id && service_id) {
      updateService({ vendor_id, service_id }); // API call on button click
    }
    dispatch(showModal("BusinessImagesModal"));
  };

  return (
    <div className="  flex  flex-col gap-2 cursor-pointer ">
      <div
        className="w-[6.3rem]  h-[6.3rem] rounded-lg  flex justify-center items-center  bg-[#C5FFCD]  "
        onClick={handalmodalopne}
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
