"use client"
import React, { useState, useEffect, useRef } from "react";
import iconcircle from "../../../../../../public/assets/Image/bookinghourscircle.png";
import Image from "next/image";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { useAppSelector } from "@/app/hooks/hooks";
import { useDispatch } from "react-redux";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";

const TimeModalFormValues: React.FC = () => {
  // Get the data from the Redux store
  const storevalues = useAppSelector((state) => state.service.service);

  // State to manage selected days, start time, and end time locally
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  console.log("fsdjfkosklsdjf###################", storevalues);

  const dispatch = useDispatch();

  // Use effect to set default values based on store data
  useEffect(() => {
    // Set the selected days based on the store's open_days value
    if (storevalues?.open_days) {
      const daysArray = storevalues.open_days.split(",");
      setSelectedDays(daysArray.map((day) => day.trim()));
    }

    // Set the start and end times based on store values
    if (storevalues?.open_time) {
      setStartTime(storevalues.open_time); // Set start time from store
    }

    if (storevalues?.close_time) {
      setEndTime(storevalues.close_time); // Set end time from store
    }
  }, [storevalues]);

  // Function to toggle the selection of days
  const toggleDaySelection = (day: string) => {
    const updatedSelectedDays = selectedDays.includes(day)
      ? selectedDays.filter((item) => item !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedSelectedDays);

    // Update open_days in the Redux store
    dispatch(updateServiceField({ open_days: updatedSelectedDays.join(", ") }));
  };

  // Function to get button class depending on whether the day is selected
  const getButtonClass = (day: string): string => {
    return selectedDays.includes(day)
      ? "bg-[#0046AE] text-white"
      : "border-2 border-gray-300 text-black";
  };

  // Handler for updating start time and closing the picker
  const handleStartTimeChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      const formattedTime = value.format("hh:mm A");
      setStartTime(formattedTime); // Update start time locally
      // Update open_time in Redux store
      dispatch(updateServiceField({ open_time: formattedTime }));
    } else {
      setStartTime(null); // Clear the start time if no time is selected
    }
  };

  // Handler for updating end time and closing the picker
  const handleEndTimeChange = (value: dayjs.Dayjs | null) => {
    if (value) {
      const formattedTime = value.format("hh:mm A");
      setEndTime(formattedTime); // Update end time locally
      // Update close_time in Redux store
      dispatch(updateServiceField({ close_time: formattedTime }));
    } else {
      setEndTime(null); // Clear the end time if no time is selected
    }
  };

  // Ref for the time picker elements to detect clicks outside
  const startTimePickerRef = useRef(null);
  const endTimePickerRef = useRef(null);

  // Close the time pickers if a click outside of them occurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        startTimePickerRef.current &&
        !startTimePickerRef.current.contains(event.target)
      ) {
        setOpenStartTimePicker(false);
      }

      if (
        endTimePickerRef.current &&
        !endTimePickerRef.current.contains(event.target)
      ) {
        setOpenEndTimePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="flex w-full flex-col items-center space-y-6">
      <div className="flex w-full items-start justify-start">
        <label
          className={`font-poppins text-lg font-medium   ${
            isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
          }`}
        >
          Business Opening Hours
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

        {/* Instructions */}
        <div className="flex w-full items-center gap-2 pt-5">
          <div className="flex items-center justify-center">
            <Image
              src={iconcircle}
              alt="iconcircle"
              className="h-4 w-4 md:h-5 md:w-5"
            />
          </div>
          <div>
            <p
              className={`font-poppins text-[10px] font-normal  md:text-sm   ${
                isDarkMode ? "text-[#FFFFFF]" : "text-[#B0B0B0]"
              }`}
            >
              Select the multiple days you want to provide the service to the
              users
            </p>
          </div>
        </div>

        {/* Time inputs */}
        <div className="grid w-full grid-cols-1 gap-6 pt-4 md:grid-cols-2">
          {/* Start time */}
          <div
            className="w-full"
            ref={startTimePickerRef}
            onClick={() => setOpenStartTimePicker(true)} // Open the time picker on click
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="Start Time"
                  value={startTime ? dayjs(startTime, "hh:mm A") : null}
                  onChange={handleStartTimeChange} // Handle start time change
                  sx={{
                    width: "100%",
                  }}
                 
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          {/* End time */}
          <div
            className="w-full"
            ref={endTimePickerRef}
            onClick={() => setOpenEndTimePicker(true)} // Open the time picker on click
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["TimePicker"]}>
                <TimePicker
                  label="End Time"
                  value={endTime ? dayjs(endTime, "hh:mm A") : null}
                  onChange={handleEndTimeChange} // Handle end time change
                  sx={{ width: "100%" }}
                 
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeModalFormValues;
