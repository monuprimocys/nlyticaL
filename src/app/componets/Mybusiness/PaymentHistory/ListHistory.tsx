"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import { useGetPaymenthistory } from "@/app/storeApp/api/useGetPaymenthistory";
import React from "react";
import Image from "next/image";
import dateIcon from "../../../../../public/assets/Image/data.png";
import { useGetPaymenthistrySubription } from "@/app/storeApp/api/useGetPaymenthistrySubription";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";

function ListHistory() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { data } = useGetPaymenthistory();
  const { data: paymentHistory, isLoading } = useGetPaymenthistrySubription();

  console.log(" my paymentHistory subscription  from ", paymentHistory?.data);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <AvatarWithSpinner />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <div
        className={`mx-auto 2xl:w-[50%] xl:w-[70%] w-[90%] mt-6 rounded-lg shadow-md ${
          isDarkMode
            ? "bg-[#212121] text-white"
            : "bg-white border border-[#ECECEC]"
        }`}
      >
        {/* Heading */}
        <div className="w-full flex justify-center items-center p-3">
          <h3 className="font-poppins text-black text-lg font-medium">
            Subscription Payment History
          </h3>
        </div>

        {paymentHistory?.data?.length > 0 ? (
          paymentHistory.data.map((history) => (
            <div key={history.id}>
              {/* Payment History Card */}
              <div
                className={`flex justify-between items-center p-4 rounded-lg ${
                  isDarkMode ? "bg-[#2C2C2C]" : "bg-white"
                }`}
              >
                {/* Left Section - Date & Duration */}
                <div className="flex items-center gap-4">
                  <Image
                    src={dateIcon}
                    alt="date icon"
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col">
                    <p className="text-base font-semibold font-poppins">
                      {history.start_date} - {history.expire_date}
                    </p>
                    <p className="text-sm text-gray-500 font-poppins">
                      {history.payment_mode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Always Open Dropdown Section */}
              <div className="w-[90%] mx-auto mt-4 bg-transparent p-4 rounded-lg">
                <ul className="w-full space-y-2 text-sm font-poppins">
                  <li className="flex justify-between">
                    <span className="font-normal text-[16px]">Plan Name</span>
                    <span className="font-normal text-[16px]">
                      {history.plan_name}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-normal text-[16px]">
                      Selected Ad Days
                    </span>
                    <span className="font-normal text-[16px]">
                      {history.start_date} - {history.expire_date}
                    </span>
                  </li>
                  {/* <li className="flex justify-between">
                    <span className="font-normal text-[16px]">GST</span>
                    <span className="font-normal text-[16px]">$50</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-normal text-[16px]">Tax</span>
                    <span className="font-normal text-[16px]">$42</span>
                  </li>
                  <li className="flex justify-between font-semibold border-t pt-2">
                    <span className="font-medium text-[16px]">
                      Platform Charges
                    </span>
                    <span>$50</span>
                  </li> */}
                  <li className="flex justify-between font-semibold border-t pt-2">
                    <span className="font-medium text-[16px]">Total</span>
                    <span>${history.price}</span>
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 font-poppins p-4">
            No subscription history found.
          </p>
        )}
      </div>
      <div
        className={`mx-auto 2xl:w-[50%] xl:w-[70%] w-[90%] mt-6 rounded-lg shadow-md ${
          isDarkMode
            ? "bg-[#212121] text-white"
            : "bg-white border border-[#ECECEC]"
        }`}
      >
        {/* Heading */}
        <div className="w-full flex justify-center items-center p-3">
          <h3 className="font-poppins text-black text-lg font-medium">
            Campaign Payment History
          </h3>
        </div>

        {data?.GoalData?.length > 0 &&
          data.GoalData.map((history) => (
            <div key={history.id}>
              {/* Payment History Card */}
              <div
                className={`flex justify-between items-center p-4 rounded-lg ${
                  isDarkMode ? "bg-[#2C2C2C]" : "bg-white"
                }`}
              >
                {/* Left Section - Date & Duration */}
                <div className="flex items-center gap-4">
                  <Image
                    src={dateIcon}
                    alt="date icon"
                    width={50}
                    height={50}
                  />
                  <div className="flex flex-col">
                    <p className="text-base font-semibold font-poppins">
                      {history.start_date} - {history.end_date}
                    </p>
                    <p className="text-sm text-gray-500 font-poppins">
                      {history.days} days
                    </p>
                  </div>
                </div>
              </div>

              {/* Always Open Dropdown Section */}
              <div className="w-[90%] mx-auto mt-4 bg-transparent p-4 rounded-lg">
                <ul className="w-full space-y-2 text-sm font-poppins">
                  <li className="flex justify-between">
                    <span className="font-normal text-[16px]">
                      Selected Ad Days
                    </span>
                    <span className="font-normal text-[16px]">
                      {history.days} days
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-normal text-[16px]">GST</span>
                    <span className="font-normal text-[16px]">$50</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-normal text-[16px]">Tax</span>
                    <span className="font-normal text-[16px]">$42</span>
                  </li>
                  <li className="flex justify-between font-semibold border-t pt-2">
                    <span className="font-medium text-[16px]">
                      Platform Charges
                    </span>
                    <span>$50</span>
                  </li>
                  <li className="flex justify-between font-semibold pt-2">
                    <span className="font-medium text-[16px]">Total</span>
                    <span>${history.price}</span>
                  </li>
                </ul>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListHistory;
