"use client";

import React, { useEffect, useState } from "react";
import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/bar-chart.png";
import Image from "next/image";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/store/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";

function YearEstablishment() {
  const dispatch = useDispatch();
  const storevalues = useAppSelector((state) => state.service.service);

  return (
    <div
      className="w-full justify-between px-8 py-4 rounded-lg items-center flex businesslable cursor-pointer"
      onClick={() => {
        dispatch(showModal("YearEstablishmentModal"));
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
        <div className="text-xl font-poppins text-black">
          Year of Establishment
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <p className="text-[#848484] font-normal font-poppins text-[18px]">
          <span>
            {" "}
            {storevalues.published_year}{" "}
            <span> {storevalues.published_month}</span>
          </span>
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

export default YearEstablishment;
