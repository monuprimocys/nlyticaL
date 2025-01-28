"use client";

import React, { useEffect, useState } from "react";
import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/contactbusinesss.png";
import Image from "next/image";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/store/Slice/modalSlice";
import { useUpdateServiceMutation } from "@/app/store/api/updateServiceApi"; // Adjust import

function ContactDetails() {
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();
  const dispatch = useDispatch();

  console.log("fsdjkifhsjkiufhsdfk@@", data);

  useEffect(() => {
    // Replace this logic with an actual API call to fetch the business name
    if (vendor_id && service_id) {
      updateService({ vendor_id, service_id })
        .then((response) => {
          // Log the entire API response
          console.log("API Response:", response);
        })
        .catch((err) => {
          console.error("API Error:", err); // Log any error if the API call fails
        });
    }
  }, [vendor_id, service_id, updateService]);

  return (
    <div
      className="w-full justify-between px-8 py-4 rounded-lg items-center flex businesslable cursor-pointer"
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
        <div className="text-xl font-poppins text-black">Contact Details</div>
      </div>

      <div className="flex gap-3 items-center">
        <p className="text-[#848484] font-normal font-poppins text-[18px]">
          {data?.service.service_phone}
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

export default ContactDetails;
