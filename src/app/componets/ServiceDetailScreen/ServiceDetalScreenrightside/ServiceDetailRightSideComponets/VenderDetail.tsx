"use client"; // This is important for Next.js to handle client-side rendering

import React, { useState } from "react";
import "../style.css";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/store/Slice/modalSlice";

function VenderDetail() {
  const ServiceDetailData = useAppSelector(
    (state) => state.serviceDetail.serviceDetail.service_phone
  );
  const user_id = Cookies.get("user_id");
  const dispatch = useDispatch();

  // State to handle whether the phone number is shown fully
  const [isNumberVisible, setIsNumberVisible] = useState(false);

  // Function to toggle phone number visibility
  const togglePhoneNumberVisibility = () => {
    //   if user id not exit the show alert
    if (!user_id) {
      dispatch(showModal("loginModal"));
      return;
    }
    setIsNumberVisible(!isNumberVisible);
  };

  // Show only the first 4 digits by default
  const displayedPhoneNumber = isNumberVisible
    ? ServiceDetailData
    : `${ServiceDetailData.slice(0, 4)}XXXXXXXXXX`; // Hides part of the number except for the first 4 digits

  return (
    <div className="bordercolo p-3 gap-1 bg-[#0046AE] rounded-lg w-full flex flex-col justify-center items-center">
      {/* Description */}
      <h6 className="font-poppins text-[#FFFFFFBD] text-sm mb-2">Phone</h6>

      {/* Phone number */}
      <h4 className="font-poppins text-white text-lg ">
        {displayedPhoneNumber}
      </h4>

      <div className="h-[1px] w-[90%] mx-auto bg-[#FFFFFF] opacity-[30%] "></div>

      {/* Show phone number button */}
      <button
        onClick={togglePhoneNumberVisibility}
        className="w-full text-white font-poppins text-sm py-2 px-4 rounded-lg bg-transparent transition-all duration-300"
      >
        Show Number
        {/* line */}
        <div className="h-[1px] w-[29.7%] mx-auto bg-[#FFFFFF] opacity-[30%] "></div>
      </button>
    </div>
  );
}

export default VenderDetail;
