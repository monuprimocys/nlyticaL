import { useAppSelector } from "@/app/hooks/hooks";
import { useGetDailyBuget } from "@/app/storeApp/api/useGetDailyBuget";
import { setSelectedPrice } from "@/app/storeApp/Slice/priceSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function RangedailyBudget() {
  const startdate = useAppSelector((state) => state.startDateSponsor.startDate);
  const enddate = useAppSelector((state) => state.endDateSponsor.endDate);

  const dispatch = useDispatch();

  // Convert both start and end date to Date objects
  const start = new Date(startdate);
  let end = new Date(enddate);

  // Check if end date is invalid or not selected
  if (isNaN(end.getTime())) {
    // Default end date to current date if not selected
    end = new Date();
  }

  // Calculate the difference in time (in milliseconds)
  const timeDifference = end - start;

  // Convert time difference from milliseconds to days
  const totalDays = Math.max(timeDifference / (1000 * 3600 * 24), 1); // Ensure minimum is 1 day

  console.log("My total days:", totalDays);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const { data } = useGetDailyBuget();

  // State to manage the selected range value
  const [rangeValue, setRangeValue] = useState(totalDays);

  // Get the price for the selected range (based on rangeValue or totalDays)
  const selectedPrice = data
    ? data.data[Math.min(rangeValue - 1, 29)]?.price
    : 0;

  useEffect(() => {
    // Sync range value with total days when the total days changes
    setRangeValue(totalDays);
  }, [totalDays]);

  console.log(" my total days:@@@@@@@@@@@@@", selectedPrice);

  useEffect(() => {
    // Sync range value with total days when the total days changes
    setRangeValue(totalDays);

    // Dispatch the selectedPrice to Redux store
    dispatch(setSelectedPrice(selectedPrice));
  }, [totalDays, selectedPrice, dispatch]);

  return (
    <div className=" mx-auto flex flex-col">
      {/* Range button */}
      <div
        className={`rounded-lg mt-5 w-full ${
          isDarkMode ? "bg-transparent" : "bg-white"
        }`}
      >
        <div className="flex justify-between">
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            1 Day
          </span>
          <span id="currentPrice" className="text-[#0046AE] font-poppins">
            {totalDays} Day {/* Display the total days */}
          </span>
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            30 Day
          </span>
        </div>
        <input
          type="range"
          id="area_distance"
          className="w-full accent-[#0046AE] cursor-pointer"
          min="1" // Minimum Day
          max="30" // Maximum Day
          value={rangeValue} // Set the range input value from state
        />
        <div className="flex justify-between">
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            {data?.data[0].price} {/* Price for 1 day */}
          </span>
          <span id="currentPrice" className="text-[#0046AE] font-poppins">
            {selectedPrice} {/* Display the selected price */}
          </span>
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            {data?.data[29].price} {/* Price for 30 days */}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RangedailyBudget;
