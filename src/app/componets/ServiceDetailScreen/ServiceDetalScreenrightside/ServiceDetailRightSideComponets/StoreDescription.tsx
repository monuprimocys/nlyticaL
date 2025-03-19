"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { decodeString } from "@/app/utils/enocodeAndDecode";

function StoreDescription() {
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";
  const lastSegment = decodeString(lastSegment1);

  useEffect(() => {
    Cookies.set("detail_id", lastSegment);
  }, [lastSegment]);

  const dispatch = useAppDispatch();
  const { data, error, isLoading, refetch } = useServiceDetailApi(lastSegment);
  const StoreDescription = data?.serviceDetail.service_description;
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`p-4 rounded-lg ${
        isDarkMode
          ? "bg-[#212121]"
          : "bg-[#ffffff] photoservicedetailborderandshado"
      }`}
    >
      <div
        className={`text-lg font-medium font-poppins mb-4 ${
          isDarkMode ? "text-[#ffffff]" : "text-[#3E5155]"
        }`}
      >
        Store Description
      </div>

      <div
        className={`text-sm font-poppins overflow-hidden ${
          isDarkMode ? "text-[#ffffff]" : "text-[#3E5155]"
        }`}
        style={{
          maxHeight: isExpanded ? "none" : "4.5em",
          display: "-webkit-box",
          WebkitLineClamp: isExpanded ? "none" : 3,
          WebkitBoxOrient: "vertical",
        }}
        dangerouslySetInnerHTML={{
          __html: StoreDescription || "No description available.",
        }}
      />

      {StoreDescription && StoreDescription.length > 100 && (
        <button
          className="mt-2 text-[#0046AE] font-semibold text-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
}

export default StoreDescription;
