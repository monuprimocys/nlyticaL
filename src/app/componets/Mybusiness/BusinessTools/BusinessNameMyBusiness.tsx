"use client";

import React, { useEffect, useState } from "react";
import "../businesscss.css";
import handsake from "../../../../../public/assets/Image/handshake.png";
import Image from "next/image";
import arrow from "../../../../../public/assets/Image/arrow-left.png";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/store/Slice/modalSlice";
import { useUpdateServiceMutation } from "@/app/store/api/updateServiceApi"; // Adjust import
import {
  addServiceImage,
  updateServiceField,
} from "@/app/store/Slice/serviceSlice";
import { useAppSelector } from "@/app/hooks/hooks";

function BusinessNameMyBusiness() {
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Trigger the mutation if vendor_id and service_id are present
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  console.log("jkhfnjklsdfhjksdfhksfhsdf", data?.service);

  // Handle the different states of the API call
  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    }

    if (error) {
      console.error("Error fetching service:", error);
    }

    if (data) {
      console.log("API Response:", data);

      dispatch(updateServiceField(data.service));
      dispatch(addServiceImage(data.service_images));
    }
  }, [data, isLoading, error]);

  const serviceupdatafromstore = useAppSelector((state) => state.service);

  console.log(
    " my api reponce stor ein slice 12121212",
    serviceupdatafromstore
  );

  return (
    <div
      className="w-full justify-between px-4 md:px-8 py-4 rounded-lg items-center flex businesslable cursor-pointer"
      onClick={() => {
        dispatch(showModal("BusinessNameModal"));
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
        <div className="text-xl font-poppins text-black">Business Name </div>
      </div>

      <div className="flex gap-3 items-center">
        <p className="text-[#848484] font-normal font-poppins text-[18px]">
          {serviceupdatafromstore.service.service_name}
        </p>

        <div className="h-[2rem] w-[2rem] flex justify-center items-center">
          <Image
            src={arrow}
            alt="arrow"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessNameMyBusiness;
