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

  return (
    <div className="flex flex-col gap-2  relative  xl:top-[2.4rem]">
      <label htmlFor="month" className="font-poppins text-black">
        {" "}
        Year of Establishment
        <span className=" text-[#F21818] pl-[1px]">*</span>
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
              <TextField {...params} required={required} /> // Add required to TextField
            )}
            className="w-full cursor-pointer appearance-none rounded-lg border-2 border-gray-300 px-4 py-4 pr-10 text-gray-700 focus:border-[#d1d5db] focus:outline-none"
          />

          {/* Only Year Picker */}
          <DatePicker
            label="Year"
            value={yearValue}
            onChange={(newValue) => dispatch(setYearValue(newValue))}
            views={["year"]} // Only year view
            renderInput={(params) => (
              <TextField {...params} required={required} /> // Add required to TextField
            )}
            className="w-full cursor-pointer appearance-none rounded-lg border-2 border-gray-300 px-4 py-4 pr-10 text-gray-700 focus:border-[#d1d5db] focus:outline-none"
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default MonthYear;
