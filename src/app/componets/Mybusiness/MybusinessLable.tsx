"use client";
import React from "react";
import "./businesscss.css";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useTotalPercentage } from "@/app/store/api/useTotalPercentage";
import { useAppSelector } from "@/app/hooks/hooks";

function MybusinessLable() {
  const router = useRouter();

  const vendor_id = Cookies.get("user_id");

  const { data } = useTotalPercentage(vendor_id);

  console.log(" my total percentage data", data);

  const totalPercentage = data?.percentage;

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  console.log(" my dark mode121212121@", isDarkMode);

  const getBorderColor = () => {
    if (totalPercentage >= 90) {
      return "bordercolorfillbusiness"; // Green for completed
    } else if (totalPercentage >= 60) {
      return "bordercolorfillbusiness"; // Yellow for halfway
    } else if (totalPercentage >= 30) {
      return "bordercolorfillbusiness"; // Red for initial progress
    }
    return ""; // No additional border color for below 30%
  };

  return (
    <div
      className={`mx-auto 2xl:w-[60%] xl:w-[80%] w-[90%] mt-[3rem]    rounded-lg gap-6  justify-items-center py-6 md:py-10 px-6 md:px-16 grid  grid-cols-1  md:grid-cols-2  items-center    ${
        isDarkMode ? "bg-[#212121] text-[#ffffff]" : " bg-white businesslable"
      } `}
    >
      {/* left side circle with text */}
      <div className="  flex  w-full  justify-start items-center gap-5">
        <div className="relative flex justify-center items-center">
          <div
            className={`rounded-full h-[5rem] w-[5rem] bordercolorbusiness flex justify-center items-center`}
          >
            <p className="text-[#00AE5D] font-medium text-lg font-poppins">
              {totalPercentage}
            </p>
          </div>
          <div
            className={`absolute rounded-full h-[5rem] w-[5rem] border-2 ${getBorderColor()} transition-all duration-300`}
            style={{
              clipPath: `inset(0 ${100 - totalPercentage}% 0 0)`, // Clip the border based on percentage
            }}
          />
        </div>
        {/* content  */}
        <div className=" flex gap-1 flex-col">
          <p
            className={`  font-poppins text-xl  font-medium   ${
              isDarkMode
                ? "text-[#ffffff]  font-medium"
                : "text-[#000000]  font-medium"
            } `}
          >
            Increase Business Profile Score
          </p>
          <p className=" text-[#848484]   font-poppins text-lg">
            {" "}
            Reach out to more Customers
          </p>
        </div>
      </div>
      {/*  right side btn  */}
      <div
        className="  w-full   flex justify-center items-center md:justify-end  md:items-end "
        onClick={() => router.push("/Mybusiness/BusinessTools")}
      >
        <button className="py-3 px-6 text-white rounded-md  font-poppins bg-[#0046AE] ">
          Increase Score
        </button>
      </div>
    </div>
  );
}

export default MybusinessLable;
