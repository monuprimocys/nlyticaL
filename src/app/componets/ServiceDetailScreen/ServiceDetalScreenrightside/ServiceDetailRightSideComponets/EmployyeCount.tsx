"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import { HiOutlineUsers } from "react-icons/hi";

function EmployyeCount() {
  const pathname = usePathname();
  const lastSegment = decodeString(
    pathname.split("/").filter(Boolean).pop() || ""
  );

  // Store service ID in cookies
  useEffect(() => {
    Cookies.set("detail_id", lastSegment);
  }, [lastSegment]);

  // Fetch service details
  const { data, error, isLoading } = useServiceDetailApi(lastSegment);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`p-5 rounded-lg shadow-md border transition-all duration-300 ${
        isDarkMode ? "bg-[#212121] border-gray-700" : "bg-white border-gray-300"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="bg-transparent  text-black p-3 rounded-full ">
          <HiOutlineUsers className="text-2xl" />
        </div>

        {/* Text */}
        {isLoading ? (
          <p className="text-gray-500 text-lg">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-lg">Error fetching data</p>
        ) : (
          <p
            className={`text-lg font-medium font-poppins ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Number of Employees:{" "}
            {data?.serviceDetail?.employee_strength || "N/A"}
          </p>
        )}
      </div>
    </div>
  );
}

export default EmployyeCount;
