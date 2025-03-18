import React from "react";
import cardtopicon from "../../../../../public/assets/Image/Homesection8card.png";
import Image from "next/image";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { useAppSelector } from "@/app/hooks/hooks";
import image from "../../../../../public/assets/Image/Homesection8card.png";

const Card: React.FC = ({ data }) => {
  const rating = data.review_star;

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={` shadow-md mb-3  flex flex-col justify-start items-start p-2 rounded-xl cursor-pointer  mr-1   ${
        isDarkMode
          ? "text-white  bg-[#212121]"
          : "text-black bg-white shadowsection8card"
      }`}
    >
      {/* ICON */}
      <div className="w-16 h-16">
        <Image src={cardtopicon || image} alt="icon" width={54} height={54} />
      </div>

      {/* CONTENT */}
      <div>
        <p
          className={`text-sm  font-poppins line-clamp-5 lg:line-clamp-4  ${
            isDarkMode ? "  text-white" : "text-black"
          }`}
        >
          {data.review_text}
        </p>
      </div>

      {/* line veticaly  */}
      <div className="w-full h-[1px] bg-[#E4E4E4] my-2 rounded-xl"></div>

      {/* NAME */}
      <div className="w-full flex justify-between items-center mt-4">
        {/* LEFT SIDE */}
        <div className="flex items-center ">
          <div
            className="w-10 h-10 rounded-full bg-slate-300 mr-3"
            style={{
              borderRadius: "50%",
              backgroundImage: `url(${data.image || image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div>
            <h4
              className={` font-poppins text-lg font-semibold   ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {data.full_name}
            </h4>
            <p
              className={`font-poppins text-sm font-normal  ${
                isDarkMode ? "text-white" : "  text-[#757575] "
              }`}
            >
              {data.client_role}
            </p>
          </div>
        </div>
        {/* right side  */}
        <div className=" flex justify-between items-center ">
          {[...Array(Math.floor(rating))].map((_, index) => (
            <MdOutlineStar key={`full-${index}`} className="text-[#FFA41C]" />
          ))}
          {rating % 1 !== 0 && <IoIosStarHalf className="text-[#FFA41C]" />}
          {[...Array(5 - Math.ceil(rating))].map((_, index) => (
            <MdOutlineStar key={`empty-${index}`} className="text-[#D1D1D1]" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
