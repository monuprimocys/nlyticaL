import React from "react";
import cardtopicon from "../../../../../public/assets/Image/Homesection8card.png";
import Image from "next/image";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { HomeSection8CardRes } from "@/app/types/Restypes";

const Card: React.FC<HomeSection8CardRes> = ({
  avatar,
  title,
  name,
  position,
}) => {
  return (
    <div className="shadowsection8card shadow-md mb-3  flex flex-col justify-start items-start p-2 rounded-xl cursor-pointer bg-white mr-1">
      {/* ICON */}
      <div className="w-16 h-16">
        <Image src={cardtopicon} alt="icon" width={64} height={64} />
      </div>

      {/* CONTENT */}
      <div>
        <p className="text-sm text-black font-poppins line-clamp-5 lg:line-clamp-4">
          {title}
        </p>
      </div>

      {/* line veticaly  */}
      <div className="w-full h-[1px] bg-[#E4E4E4] my-2 rounded-xl"></div>

      {/* NAME */}
      <div className="w-full flex justify-between items-center mt-4">
        {/* LEFT SIDE */}
        <div className="flex items-center ">
          <div className="w-10 h-10 rounded-full bg-slate-300 mr-3">
            <Image src={avatar} alt="icon" width={40} height={40} />
          </div>
          <div>
            <h4 className="text-[#000000] font-poppins text-lg font-semibold">
              {name}
            </h4>
            <p className="text-[#757575] font-poppins text-sm font-normal">
              {position} 
            </p>
          </div>
        </div>
        {/* right side  */}
        <div className=" flex justify-between items-center ">
          <MdOutlineStar className="text-xl text-[#FFA41C]" />
          <MdOutlineStar className="text-xl text-[#FFA41C]" />
          <MdOutlineStar className="text-xl text-[#FFA41C]" />
          <MdOutlineStar className="text-xl text-[#FFA41C]" />
          <IoIosStarHalf className="text-xl text-[#FFA41C]" />
        </div>
      </div>
    </div>
  );
};

export default Card;
