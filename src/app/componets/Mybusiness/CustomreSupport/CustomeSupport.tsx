"use client";

import React, { useEffect } from "react";
import "../businesscss.css";
import tollsimage from "../../../../../public/assets/Image/supportcustomre.png";
import Image from "next/image";
import Arrowleftside from "../../../../../public/assets/Image/arrow-left.png";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { showModal } from "@/app/storeApp/Slice/modalSlice";

function CustomeSupport() {
  const router = useRouter();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const vendor_id = Cookies.get("user_id");

  const service_id = Cookies.get("service_id");

  const [updateService, { data: updateservicedata, isLoading, error }] =
    useUpdateServiceMutation();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Trigger the mutation if vendor_id and service_id are present
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  const service_name = updateservicedata?.service.service_name;

  const is_store = Cookies.get("is_store");

  const disptach = useAppDispatch();

  const handleCardClick = () => {
    if (Number(is_store) === 0) {
      disptach(showModal("CheackStoreAdd"));
    }

    if (!service_name) {
      console.error("Invalid serviceId or serviceName");
      return;
    }

    const serviceSlug = service_name.toLowerCase().replace(/\s+/g, "-"); // Convert name to URL slug

    // Navigate to the encoded route
    router.push(`/bussines/services/${serviceSlug}`);
  };
  return (
    <div
      className={`mx-auto 2xl:w-[55%] xl:w-[80%] w-[90%] mt-[3rem]  gap-5 rounded-lg py-8 px-6 md:px-12 flex justify-between items-center cursor-pointer  ${
        isDarkMode
          ? "bg-[#212121] text-[#ffffff]"
          : "bg-[#ffffff] businesslable text-[#212121]"
      } `}
      onClick={handleCardClick}
    >
      {/* Left Side */}
      <div className="flex justify-start items-center gap-6">
        {/* Image */}
        <Image
          className="rounded-lg w-[6rem] h-[6rem] object-cover"
          src={tollsimage}
          alt="Tolls"
        />
        <div className=" w-full flex-col flex gap-2">
          <h3 className="text-lg font-medium font-poppins">Support</h3>
          <p className="text-[#848484] font-poppins font-normal">
            Connect with Us
          </p>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex justify-end items-center gap-4 cursor-pointer">
        {/* Arrow left */}
        <Image
          className={`w-[2rem] h-[2rem] object-cover    ${
            isDarkMode ? "invert" : ""
          }`}
          src={Arrowleftside}
          alt="Arrow left"
        />
      </div>
    </div>
  );
}

export default CustomeSupport;
