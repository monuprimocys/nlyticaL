"use client";

import React from "react";
import { IoIosStarHalf } from "react-icons/io";
import { useAppSelector } from "@/app/hooks/hooks";
import { MdOutlineStar } from "react-icons/md";
import Image from "next/image";
function BusinessRevieweCard({ review }) {
  // Function to render stars based on the rating

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const rating = review.review_star;
  return (
    <div
      className={`w-full h-auto   p-4 rounded-lg relative  ${
        isDarkMode
          ? "bg-[#FFFFFF05] text-white"
          : "bg-white text-black  photoservicedetailborderandshado"
      }`}
      style={{
        boxShadow: "2px 4px 14.4px 0px #0000000F",
        border: "1px solid #00000014",
      }}
    >
      <div className="w-full flex justify-between items-center ">
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12  relative">
            <Image
              src={review.image}
              alt="avatar"
              className="  rounded-full absolute top-[-1.7rem] left-0"
              width={80}
              height={80}
            />
          </div>
          <div
            className={`text-base font-medium absolute left-[14%] top-4 font-poppins    ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <span>
              {review.first_name && review.first_name}{" "}
              {review.last_name && review.last_name}
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2    absolute  right-4  top-4">
          {[...Array(Math.floor(rating))].map((_, index) => (
            <MdOutlineStar
              key={`full-${index}`}
              className="text-[#FFA41C] text-lg cursor-pointer"
            />
          ))}
          {rating % 1 !== 0 && (
            <IoIosStarHalf className="text-[#FFA41C] text-lg  cursor-pointer" />
          )}
          {[...Array(5 - Math.ceil(rating))].map((_, index) => (
            <MdOutlineStar
              key={`empty-${index}`}
              className="text-[#D1D1D1] text-lg cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Review Content */}
      <div className="w-full flex flex-col gap-2">
        <p
          className={`font-poppins  text-sm  ${
            isDarkMode ? "text-white" : "text-[#535353]"
          }`}
        >
          {review.review_message}
        </p>
      </div>
    </div>
  );
}

export default BusinessRevieweCard;
