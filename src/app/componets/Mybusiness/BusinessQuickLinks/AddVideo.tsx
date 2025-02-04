import React from "react";
import addprofile from "../../../../../public/assets/Image/videobusiness.png";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";

function AddVideo() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="  flex  flex-col gap-2 cursor-pointer ">
      <div className="w-[6.3rem]  h-[6.3rem]  rounded-lg  flex justify-center items-center  bg-[#FFE1AA]  ">
        <Image
          src={addprofile}
          alt="edit profile"
          className="w-[60%] h-[60%] object-cover rounded-lg"
        />
      </div>
      {/*  lable  */}
      <div
        className={`flex flex-col  items-center   font-poppins   text-[17px] font-medium  ${
          isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
        } `}
      >
        <p>Add </p>
        <p> Video</p>
      </div>
    </div>
  );
}

export default AddVideo;
