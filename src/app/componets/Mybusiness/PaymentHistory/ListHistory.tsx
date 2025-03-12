"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import { useGetPaymenthistory } from "@/app/storeApp/api/useGetPaymenthistory";
import React, { useState } from "react";
import Image from "next/image";
import { MdChevronRight, MdExpandLess } from "react-icons/md";
import dateIcon from "../../../../../public/assets/Image/data.png";

function ListHistory() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { data } = useGetPaymenthistory();
  const [openIndex, setOpenIndex] = useState<number | null>(null); // 🔥 Track which dropdown is open

  console.log("List History", data?.GoalData);

  return (
    <div
      className={`mx-auto 2xl:w-[50%] xl:w-[70%] w-[90%] mt-6 rounded-lg shadow-md ${
        isDarkMode
          ? "bg-[#212121] text-white"
          : "bg-white border border-[#ECECEC]"
      }`}
    >
      {data?.GoalData?.length > 0 ? (
        data.GoalData.map((history, index) => (
          <div key={history.id} className="">
            {/* Payment History Card (Clickable) */}
            <div
              className={`flex justify-between items-center p-4 rounded-lg cursor-pointer ${
                isDarkMode ? "bg-[#2C2C2C]" : "bg-white"
              }`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)} // 🔥 Toggle dropdown for each item
            >
              {/* Left Section - Date & Duration */}
              <div className="flex items-center gap-4">
                <Image src={dateIcon} alt="date icon" width={50} height={50} />
                <div className="flex flex-col">
                  <p className="text-base font-semibold font-poppins">
                    {history.start_date} - {history.end_date}
                  </p>
                  <p className="text-sm text-gray-500 font-poppins">
                    {history.days} days
                  </p>
                </div>
              </div>

              {/* Right Section - Price & Arrow */}
              <div className="flex items-center flex-col gap-2">
                <p className="text-lg font-semibold">${history.price}</p>
                {openIndex === index ? (
                  <MdExpandLess className="text-2xl text-gray-500" />
                ) : (
                  <MdChevronRight className="text-2xl text-gray-500 rotate-90" />
                )}
              </div>
            </div>

            {/* 🔥 Dropdown Section (Appears when clicked) */}
            {openIndex === index && (
              <div className="w-[90%] mx-auto mt-4 bg-transparent p-4 rounded-lg">
                <ul className="w-full space-y-2 text-sm font-poppins">
                  <li className="flex justify-between">
                    <span className="font-poppins font-normal text-[16px]">
                      Selected Ad Days
                    </span>{" "}
                    <span className="font-poppins font-normal text-[16px]">
                      {history.days} days
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-poppins font-normal text-[16px]">
                      GST
                    </span>{" "}
                    <span className="font-poppins font-normal text-[16px]">
                      $50
                      {/* 10% GST */}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-poppins font-normal text-[16px]">
                      Tax
                    </span>{" "}
                    <span className="font-poppins font-normal text-[16px]">
                      $42
                      {/* 5% Tax */}
                    </span>
                  </li>
                  <li className="flex justify-between font-semibold border-t pt-2">
                    <span className="font-poppins font-medium text-[16px]">
                      Platform Charges
                    </span>{" "}
                    <span>$50</span>
                  </li>
                  <li className="flex justify-between font-semibold pt-2">
                    <span className="font-poppins font-medium text-[16px]">
                      Total
                    </span>{" "}
                    <span>${history.price}</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center p-4 text-gray-500">
          No payment history found.
        </p>
      )}
    </div>
  );
}

export default ListHistory;
