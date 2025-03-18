"use client";

import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/computer-1.png";
import Image from "next/image";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { useEffect, useState } from "react";

function BusinessImages() {
  const dispatch = useDispatch();
  const [serviceImageLength, setServiceImageLength] = useState(() => {
    return localStorage.getItem("service_image_length") || 0;
  });

  useEffect(() => {
    // Function to check and update state from localStorage
    const checkLocalStorage = () => {
      const newValue = localStorage.getItem("service_image_length") || 0;
      setServiceImageLength(newValue);
    };

    // Set interval to check localStorage every 2 seconds
    const interval = setInterval(checkLocalStorage, 2000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`w-full justify-between px-4 md:px-8 py-4 rounded-lg items-center flex  cursor-pointer  ${
        isDarkMode
          ? "bg-[#212121] text-[#ffffff]"
          : "bg-[#ffffff]  businesslable text-black"
      }  `}
      onClick={() => {
        dispatch(showModal("BusinessImagesModal"));
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
        <div className="text-xl font-poppins ">Business Images</div>
      </div>

      <div className="flex gap-3 items-center">
        <p className="text-[#848484] font-normal font-poppins text-[18px]">
          {serviceImageLength}
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

export default BusinessImages;
