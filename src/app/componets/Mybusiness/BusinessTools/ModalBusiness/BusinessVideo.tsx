"use client";

import "../../businesscss.css";
import handsake from "../../../../../../public/assets/Image/computer.png";
import Image from "next/image";
import arrow from "../../../../../../public/assets/Image/arrow-left.png";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { useEffect, useState } from "react";

function BusinessVideo() {
  const dispatch = useDispatch();

  const [videoUrl, setVideoUrl] = useState(
    localStorage.getItem("video_url") || ""
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newUrl = localStorage.getItem("video_url");
      setVideoUrl(newUrl || "");
    }, 1000); // Check every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`w-full  gap-4  px-4 md:px-8 py-4 rounded-lg items-center flex  cursor-pointer  ${
        isDarkMode
          ? "bg-[#212121] text-[#ffffff]"
          : "bg-[#ffffff]  businesslable text-black"
      }  `}
      onClick={() => {
        dispatch(showModal("BusinessVideoModal"));
      }}
    >
      <div className="flex gap-3 items-center w-[40%]">
        <div className="h-[3rem] w-[3rem] flex justify-center items-center">
          <Image
            src={handsake}
            alt="handshake"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-xl font-poppins ">Business Video Url</div>
      </div>

      <div className="flex gap-3 items-center">
        <p className="text-[#848484] font-normal font-poppins text-[18px]">
          {videoUrl}
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
