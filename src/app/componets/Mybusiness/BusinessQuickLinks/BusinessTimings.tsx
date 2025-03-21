"use client";

import React from "react";
import addprofile from "../../../../../public/assets/Image/businesstime.png";
import Image from "next/image";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";

function BusinessTimings() {
  const dispatch = useDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const is_store = Cookies.get("is_store");

  const subscriber_user = Cookies.get("subscriber_user");

  const handalmodalopne = () => {
    if (Number(subscriber_user) === 0) {
      dispatch(showModal("CheackStoreAdd"));
      dispatch(hideModal("CheackStoreandPlaneModal"));
      dispatch(hideModal("BusinessTimingsModal"));
    }
    if (Number(subscriber_user) === 1) {
      dispatch(showModal("CheackStoreandPlaneModal"));
    } else {
      if (vendor_id && service_id) {
        updateService({ vendor_id, service_id }); // API call on button click
      }
      dispatch(showModal("BusinessTimingsModal"));
    }
  };

  return (
    <div
      className="  flex  flex-col gap-2 cursor-pointer "
      onClick={handalmodalopne}
    >
      <div className=" w-[6.3rem]  h-[6.3rem] rounded-lg  flex justify-center items-center  bg-[#E6DCFF]  ">
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
        <p>Business </p>
        <p>Timings</p>
      </div>
    </div>
  );
}

export default BusinessTimings;
