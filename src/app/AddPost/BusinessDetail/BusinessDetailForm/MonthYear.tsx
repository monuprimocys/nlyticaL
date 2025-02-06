"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField"; // Add TextField import
import {
  setMonthValue,
  setYearValue,
} from "@/app/store/Slice/AddpostSelectedIDandvalues/monthYearSlice";
import { useAppSelector } from "@/app/hooks/hooks";

interface MonthYearProps {
  required?: boolean;
}

const MonthYear: React.FC<MonthYearProps> = ({ required }) => {
  // Use dispatch and selector from redux store
  const dispatch = useDispatch();
  const monthValue = useSelector((state: any) => state.monthYear.monthValue);
  const yearValue = useSelector((state: any) => state.monthYear.yearValue);
  const getvalues = useAppSelector((state) => state.monthYear);

  // console.log("Month Value:", getvalues.monthValue.format("MMMM"));
  // console.log("Year Value:", getvalues.yearValue.format("YYYY"));
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  return (
    <div className="flex flex-col gap-2 relative xl:top-[2.4rem]">
      <label
        htmlFor="month"
        className={`font-poppins ${isDarkMode ? "text-white" : "text-black"}`}
      >
        Year of Establishment
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          {/* Only Month Picker */}
          <DatePicker
            label="Month"
            value={monthValue}
            onChange={(newValue) => dispatch(setMonthValue(newValue))}
            views={["month"]} // Only month view
            renderInput={(params) => (
              <TextField
                {...params}
                required={required}
                className={`w-full cursor-pointer appearance-none rounded-lg px-4 py-4 pr-10 ${
                  isDarkMode
                    ? "bg-[#333333] border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                    : "bg-white border-[#d1d5db] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                }`} // Conditional styling based on dark mode
              />
            )}
          />

          {/* Only Year Picker */}
          <DatePicker
            label="Year"
            value={yearValue}
            onChange={(newValue) => dispatch(setYearValue(newValue))}
            views={["year"]} // Only year view
            renderInput={(params) => (
              <TextField
                {...params}
                required={required}
                className={`w-full cursor-pointer appearance-none rounded-lg px-4 py-4 pr-10 ${
                  isDarkMode
                    ? "bg-[#333333] border-[#444444] text-white focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                    : "bg-white border-[#d1d5db] text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                }`} // Conditional styling based on dark mode
              />
            )}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default MonthYear;
