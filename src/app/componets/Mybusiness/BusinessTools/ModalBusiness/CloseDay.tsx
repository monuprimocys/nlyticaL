"use client";

import React, { useState, useEffect } from "react";
import iconcircle from "../../../../../../public/assets/Image/bookinghourscircle.png";
import Image from "next/image";
import redicon from "../../../../../../public/assets/Image/closetimeiconred.png";
import { useAppSelector } from "@/app/hooks/hooks";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";
import { useDispatch } from "react-redux";

const CloseDay: React.FC = () => {
  // State to keep track of selected days
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Redux state: selected days
  const selectedDaysAll = useAppSelector(
    (state) => state.service.service.open_days
  );

  console.log("flsdkjaksda;fsdkaf!!!!", selectedDays);

  const dispatch = useDispatch();

  // Function to toggle the selection of days
  const toggleDaySelection = (day: string) => {
    setSelectedDays((prevSelectedDays) =>
      prevSelectedDays.includes(day)
        ? prevSelectedDays.filter((item) => item !== day)
        : [...prevSelectedDays, day]
    );
  };

  // Sync selectedDays with selectedDaysAll from Redux (if needed)
  useEffect(() => {
    if (selectedDays !== selectedDaysAll) {
      setSelectedDays(selectedDaysAll);
    }
  }, [selectedDaysAll]);

  // Dispatch update when selectedDays change
  useEffect(() => {
    if (selectedDays.length > 0) {
      dispatch(
        updateServiceField({
          closed_days: selectedDays,
        })
      );
    }
  }, [selectedDays, dispatch]);

  // Function to get button class depending on whether the day is selected
  const getButtonClass = (day: string): string => {
    return selectedDays.includes(day)
      ? "border-2 border-gray-300 text-black" // Selected day button will be black with white text
      : "bg-[#0046AE] text-white"; // Unselected day button will be blue with white text
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="flex w-full flex-col items-center space-y-6">
      {/* Label */}
      <div className="flex w-full items-start justify-start">
        <label
          className={`font-poppins text-lg font-medium    ${
            isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
          }`}
        >
          Select Days of the Week
        </label>
      </div>
      <div
        className={` w-full rounded-lg p-6   ${
          isDarkMode
            ? "bg-[#FFFFFF0A]  border-2 border-[#373737]"
            : " step-container"
        }`}
      >
        {/* Day buttons */}
        <div className="flex w-full flex-wrap gap-4">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <button
              key={day}
              className={`font-poppins items-center rounded-lg px-8 py-2 ${getButtonClass(
                day
              )}`}
              onClick={() => toggleDaySelection(day)}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Info Text */}
        <div className="flex w-full items-center gap-2 pt-5">
          <div className="flex items-center justify-center">
            <Image
              src={iconcircle}
              alt="iconcircle"
              className="h-4 w-4 md:h-5 md:w-5"
            />
          </div>
          <div>
            <p className={`font-poppins text-[10px] font-normal  md:text-sm   ${
              isDarkMode? "text-[#ffffff]" : "  text-[#B0B0B0]"
            }`}>
              Select the multiple days you want to provide the service to the
              users
            </p>
          </div>
        </div>

        {/* Time inputs */}
        <div className="grid w-full cursor-pointer grid-cols-1 gap-6 pt-4 md:grid-cols-2">
          {/* close time */}
          <div className="bordercoloricon flex w-full items-center justify-between rounded-lg px-3 py-4">
            <label className="font-poppins text-sm font-medium text-[#000000]">
              Closed
            </label>
            {/* red icon */}
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600">
              <Image
                src={redicon}
                alt="closetimeicon"
                className="h-[50%] w-[50%] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloseDay;
