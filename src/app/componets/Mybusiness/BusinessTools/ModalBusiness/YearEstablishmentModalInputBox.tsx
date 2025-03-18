"use client";
import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import dayjs from "dayjs"; // Import dayjs
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";

interface MonthYearProps {
  required?: boolean;
}

const YearEstablishmentModalInputBox: React.FC<MonthYearProps> = () => {
  const dispatch = useAppDispatch();
  const storevalues = useAppSelector((state) => state.service.service);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const published_year = storevalues.published_year;
  const published_month = storevalues.published_month;

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const [monthValue, setMonthValue] = React.useState<any>(null);
  const [yearValue, setYearValue] = React.useState<any>(null);

  // Set default values if they exist
  React.useEffect(() => {
    if (published_year && published_month) {
      const defaultYear = dayjs(`${published_year}`);
      const defaultMonth = dayjs(
        `${published_year}-${published_month.padStart(2, "0")}-01`
      );

      setYearValue(defaultYear); // Set the default year
      setMonthValue(defaultMonth); // Set the default month
    }
  }, [published_year, published_month]);

  const handleSave = () => {
    if (monthValue && yearValue) {
      // Format the month and year properly
      const formattedMonth = monthValue.format("MMMM"); // Get month in MM format (01, 02, ...)
      const formattedYear = yearValue.format("YYYY"); // Get full year (e.g., 2025)

      // Send update request to the API
      updateService({
        vendor_id,
        service_id,
        published_year: formattedYear,
        published_month: formattedMonth,
      });

      // Dispatch update to the service state
      dispatch(
        updateServiceField({
          published_year: formattedYear,
          published_month: formattedMonth,
        })
      );

      // Hide the modal after saving
      dispatch(hideModal("YearEstablishmentModal"));
    }
  };

  return (
    <div className="h-auto w-full flex flex-col gap-6">
      <div className="flex flex-col gap-2 relative">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            {/* Only Month Picker */}
            <DatePicker
              label="Month"
              value={monthValue}
              onChange={(newValue) => setMonthValue(newValue)} // Use local state setter for month
              views={["month"]} // Only month view
              renderInput={(params) => <TextField {...params} />}
              className="w-full cursor-pointer appearance-none rounded-lg border-2 border-gray-300 px-4 py-4 pr-10 text-gray-700 focus:border-[#d1d5db] focus:outline-none"
            />

            {/* Only Year Picker */}
            <DatePicker
              label="Year"
              value={yearValue}
              onChange={(newValue) => setYearValue(newValue)} // Use local state setter for year
              views={["year"]} // Only year view
              renderInput={(params) => <TextField {...params} />}
              className="w-full cursor-pointer appearance-none rounded-lg border-2 border-gray-300 px-4 py-4 pr-10 text-gray-700 focus:border-[#d1d5db] focus:outline-none"
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleSave} // Call handleSave when button is clicked
          className="w-[160px] h-[45px] border-[#0046AE] text-white font-poppins font-medium rounded-lg bg-[#0046AE] transition duration-300 ease-in-out"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default YearEstablishmentModalInputBox;
