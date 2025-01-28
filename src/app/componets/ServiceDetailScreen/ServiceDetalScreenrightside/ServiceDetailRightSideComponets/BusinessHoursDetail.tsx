"use client";

import { useServiceDetailApi } from "@/app/store/api/ServiceDetailScreenApi/useServiceDetailApi";
import { usePathname } from "next/navigation";
import React from "react";

function BusinessHoursDetail() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop() || "";
  const { data, error, isLoading, refetch } = useServiceDetailApi(lastSegment);

  // Ensure the response data exists and then split open and closed days into arrays
  const openDays = (data?.serviceDetail?.open_days || [])
    .flat()
    .join(",")
    .split(",")
    .map((day) => day.trim()); // Ensure we split and trim spaces
  const closedDays = (data?.serviceDetail?.closed_days || [])
    .flat()
    .join(",")
    .split(",")
    .map((day) => day.trim()); // Ensure we split and trim spaces

  console.log("My open days and closed days", openDays, closedDays);

  const opnetime = data?.serviceDetail.open_time;
  const closetime = data?.serviceDetail.close_time;

  const daysOfWeek = [
    { day: "Mon", label: "Monday" },
    { day: "Tue", label: "Tuesday" },
    { day: "Wed", label: "Wednesday" },
    { day: "Thu", label: "Thursday" },
    { day: "Fri", label: "Friday" },
    { day: "Sat", label: "Saturday" },
    { day: "Sun", label: "Sunday" },
  ];

  // Function to get the status of a specific day
  const getDayStatus = (day, close) => {
    if (openDays.includes(day, close)) return `${opnetime} - ${closetime}`;
    if (closedDays.includes(day)) return "Closed";
    return "Closed"; // Default to closed if the day is not listed
  };

  return (
    <div className="p-4 rounded-lg photoservicedetailborderandshado bg-white">
      {/* Heading */}
      <div className="text-lg font-medium font-poppins text-[#3E5155] mb-4">
        Business Hours
      </div>

      {/* Loop through each day of the week */}
      <div className="w-full flex flex-col gap-4">
        {daysOfWeek.map((item) => {
          const status = getDayStatus(item.day);
          return (
            <div
              key={item.day}
              className="w-full justify-between flex items-center"
            >
              <div className="text-sm font-medium font-poppins text-[#000000]">
                {item.label}
              </div>
              <div
                className={`text-sm font-medium font-poppins ${
                  status === "Closed" ? "text-[#FF0000]" : "text-[#000000]"
                }`}
              >
                {status}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BusinessHoursDetail;
