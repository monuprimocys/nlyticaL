"use client";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs"; // Import dayjs
import {
  setMonthValue,
  setYearValue,
} from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/monthYearSlice";
import { useAppSelector } from "@/app/hooks/hooks";

interface MonthYearProps {
  required?: boolean;
}

const MonthYear: React.FC<MonthYearProps> = ({ required }) => {
  const dispatch = useDispatch();
  const monthValue = useSelector((state: any) => state.monthYear.monthValue);
  const yearValue = useSelector((state: any) => state.monthYear.yearValue);
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
          {/* Month Picker */}
          <DatePicker
            label="Month"
            value={monthValue ? dayjs(monthValue) : null} // Ensure it's a valid dayjs object
            onChange={(newValue) =>
              dispatch(setMonthValue(newValue?.toISOString()))
            }
            views={["month"]}
          />

          {/* Year Picker */}
          <DatePicker
            label="Year"
            value={yearValue ? dayjs(yearValue) : null} // Ensure it's a valid dayjs object
            onChange={(newValue) =>
              dispatch(setYearValue(newValue?.toISOString()))
            }
            views={["year"]}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default MonthYear;
