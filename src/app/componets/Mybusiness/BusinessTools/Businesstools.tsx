"use client";

import React from "react";
import "../businesscss.css";
import tollsimage from "../../../../../public/assets/Image/businesstools.png";
import Image from "next/image";
import Arrowleftside from "../../../../../public/assets/Image/arrow-left.png";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";

function Businesstools() {
  const router = useRouter();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`mx-auto 2xl:w-[55%] xl:w-[80%] w-[90%] mt-[3rem]  gap-5 rounded-lg py-8 px-6 md:px-12 flex justify-between items-center cursor-pointer  ${
        isDarkMode
          ? "bg-[#212121] text-[#ffffff]"
          : "bg-[#ffffff] businesslable text-[#212121]"
      } `}
      onClick={() => router.push("/Mybusiness/BusinessTools")}
    >
      {/* Left Side */}
      <div className="flex justify-start items-center gap-6">
        {/* Image */}
        <Image
          className="rounded-lg w-[6rem] h-[6rem] object-cover"
          src={tollsimage}
          alt="Tolls"
        />
        <div className=" w-full flex-col flex gap-2">
          <h3 className="text-lg font-medium font-poppins">Business Tools</h3>
          <p className="text-[#848484] font-poppins font-normal">
            Manage Offers, Reviews and more
          </p>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex justify-end items-center gap-4 cursor-pointer">
        {/* Arrow left */}
        <Image
          className={`w-[2rem] h-[2rem] object-cover    ${
            isDarkMode ? "invert" : ""
          }`}
          src={Arrowleftside}
          alt="Arrow left"
        />
      </div>
    </div>
  );
}

export default Businesstools;
