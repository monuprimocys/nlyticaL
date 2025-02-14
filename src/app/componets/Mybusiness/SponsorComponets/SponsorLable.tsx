"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";
import SponsorLableicon from "../../../../../public/assets/Image/Sponsor.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function SponsorLable() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const router = useRouter();
  return (
    <div
      className={`mx-auto 2xl:w-[60%] xl:w-[80%] w-[90%] mt-[3rem]    rounded-lg gap-6   py-6 md:py-10 px-6 md:px-16  ${
        isDarkMode ? "bg-[#212121] text-[#ffffff]" : " bg-white businesslable"
      } `}
    >
      <div className=" w-full v flex flex-col md:flex-row gap-4 justify-between items-center h-auto">
        {/*  left side desing  */}

        <div className=" w-full flex gap-2">
          <h4 className="  font-poppins text-xl   font-medium   text-black">
            Grow Your{" "}
            <span className=" text-[#FF5249] ">Business By Boosting</span>{" "}
          </h4>
          <div>
            <Image
              src={SponsorLableicon}
              alt="Sponsor Lable"
              className="w-[25px] h-[25px] object-contain"
            />
          </div>
        </div>

        {/*  right side btn  */}
        <div
          className="  w-full   flex md:justify-end justify-center items-center  "
          onClick={() => router.push("/Mybusiness/Sponsor")}
        >
          <button className="py-3 px-6 text-white rounded-md  font-poppins bg-[#0046AE] ">
            Sponsor Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default SponsorLable;
