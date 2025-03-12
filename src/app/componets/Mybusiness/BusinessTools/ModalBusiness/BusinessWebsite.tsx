"use client";

import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/worldwide.png";
import Image from "next/image";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";

function BusinessWebsite() {
  const dispatch = useDispatch();
  const storevalues = useAppSelector((state) => state.service);

  console.log(" my image lenth ", storevalues);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`w-full justify-between px-4 md:px-8 py-4  overflow-hidden rounded-lg items-center flex  cursor-pointer  ${
        isDarkMode
          ? "bg-[#212121] text-[#ffffff]"
          : "bg-[#ffffff]  businesslable text-black"
      }  `}
      onClick={() => {
        dispatch(showModal("BusinessWebsiteModal"));
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
        <div className="text-xl font-poppins ">Business Website</div>
      </div>

      <div className="flex gap-3 items-center">
        <p className="text-[#848484] font-normal font-poppins text-[18px] line-clamp-1">
          {storevalues.service.service_website}
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

export default BusinessWebsite;
