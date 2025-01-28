"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";
import verfiyicon from "../../../../../../public/assets/Image/verfiy.png";
import Image from "next/image";

function VenderDetailInformation() {
  const ServiceDetailData = useAppSelector(
    (state) => state.serviceDetail.vendorDetails
  );
  const listing = useAppSelector((state) => state.serviceDetail);

  return (
    <div className="p-4 rounded-lg photoservicedetailborderandshado bg-white">
      {/* Heading */}
      <div className="text-lg font-medium font-poppins text-[#3E5155] mb-4">
        Vendor Information
      </div>

      {/* Avatar and Name */}
      <div className="flex gap-6 items-center">
        {/* Avatar */}
        <div
          className="h-12 w-12 bg-cover bg-center rounded-full"
          style={{
            backgroundImage: `url(${ServiceDetailData.image})`,
          }}
        ></div>

        {/* Name and Details */}
        <div className="flex flex-col">
          <div className="flex items-center font-poppins gap-2 text-lg font-medium text-[#3E5155]">
            <span>
              {ServiceDetailData.first_name} {ServiceDetailData.last_name}
            </span>

            {/* Verify Icon */}
            <Image className="h-5 w-5" src={verfiyicon} alt="Verified Icon" />
          </div>

          <div className="text-sm text-[#757575] mt-1">
            <span className=" text-[#0046AE]  font-poppins">
              {" "}
              {listing.serviceDetail.total_stores_count} Listings
            </span>
            <span className="text-[#929292] ml-2 font-poppins">
              Member since {listing.serviceDetail.published_year}{" "}
              {listing.serviceDetail.published_month}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenderDetailInformation;
