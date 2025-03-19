"use client";
import React from "react";
import "./NewCitiesstyle.css";
import mumbai from "../../../../../public/assets/Image/Mumbai_03-2016_30_Gateway_of_India 1.png";
import Image from "next/image";
import arrow from "../../../../../public/assets/Image/arrow-up.png";
import { useAppSelector } from "@/app/hooks/hooks";
import { useRouter } from "next/navigation";

function NewCitiesCard({ data }) {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const router = useRouter();

  console.log(" my  card is dark id ", data);

  const handleClick = () => {
    sessionStorage.setItem("recentLocation", data.city);
    router.push("/store");
  };

  return (
    <div
      className={`w-[22rem] flex cursor-pointer relative gap-6 rounded-lg h-auto p-4 shadow-lg transition-transform hover:scale-105 ${
        isDarkMode ? "bg-[#212121] text-white" : "text-black  "
      }`}
      id="shadow-radius"
      onClick={handleClick} // Add onClick handler here
    >
      <div className="w-full sm:w-[25%] h-auto">
        <Image
          className="object-cover w-full h-[100%] rounded-lg"
          src={mumbai}
          alt="Mumbai"
        />
      </div>
      {/* Inner text */}
      <div className="flex flex-col gap-2 justify-center w-[70%]">
        <h6 className="font-poppins font-medium text-lg">{data.city}</h6>
        <p className="text-[#0046AE] font-poppins font-normal text-sm">
          Explore
        </p>
      </div>
      {/* Right side circle with arrow */}
      <div className="group">
        <div className="absolute  right-[-0.8rem] md:right-[-1rem] group-hover:bg-[#0046AE] top-[76%] md:top-1/2 transform -translate-y-1/2 border-[5px] border-[#0046AE] h-[4rem] w-[4rem] rounded-full flex justify-center items-center">
          <Image
            src={arrow}
            alt="arrow"
            className="w-[50%] h-[50%] object-cover group-hover:invert"
          />
        </div>
      </div>
    </div>
  );
}

export default NewCitiesCard;
