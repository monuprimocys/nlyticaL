"use client";

import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/computer.png";
import Image from "next/image";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/store/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/store/api/updateServiceApi";
import { useEffect } from "react";

function BusinessVideo() {
  const dispatch = useDispatch();
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Trigger the mutation if vendor_id and service_id are present
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  //

  const storesliceImage = data?.video; // Assuming this is your URL
  const urlArray = [storesliceImage];
  console.log(" my update store data ", storesliceImage);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`w-full justify-between px-4 md:px-8 py-4 rounded-lg items-center flex  cursor-pointer  ${
        isDarkMode
          ? "bg-[#212121] text-[#ffffff]"
          : "bg-[#ffffff]  businesslable text-black"
      }  `}
      onClick={() => {
        dispatch(showModal("BusinessVideoModal"));
      }}
    >
      <div className="flex gap-3 items-center">
        <div className="h-[3rem] w-[3rem] flex justify-center items-center">
          <Image
            src={handsake}
            alt="handshake"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xl font-poppins ">Business Video</div>
      </div>

      <div className="flex gap-3 items-center">
        <p className="text-[#848484] font-normal font-poppins text-[18px]">
          {urlArray.length}
        </p>

        <div className="h-[2rem] w-[2rem] flex justify-center items-center">
          <Image
            src={arrow}
            alt="arrow"
            className={`w-full h-full object-cover  ${
              isDarkMode ? "invert" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessVideo;
