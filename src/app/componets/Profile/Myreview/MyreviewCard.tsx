import React from "react";
import "./style.css";
import { IoMdStar } from "react-icons/io";

function MyreviewCard({ review }) {
  // Function to render stars based on the rating
  const renderStars = (rating) => {
    const filledStars = Array.from({ length: 5 }, (_, index) => {
      return index < rating ? (
        <IoMdStar key={index} className="text-[#FFA41C]" />
      ) : (
        <IoMdStar key={index} className="text-[#FFA41C] opacity-[40%]" />
      );
    });
    return filledStars;
  };

  return (
    <div className="cardborder flex w-full cursor-pointer flex-col gap-3 rounded-lg p-3">
      {/* heading with star */}
      <div className="flex w-full flex-row items-center justify-between">
        <h2 className="font-poppins line-clamp-1 text-lg font-medium">
          {review.service_name}
        </h2>
        {/* rating */}
        <div className="flex gap-1">
          {renderStars(Number(review.review_star))}
        </div>
      </div>
      {/* sub heading */}
      <div className="flex w-full items-start justify-start">
        <h4 className="font-poppins text-[16px] font-normal text-black">
          {review.category_name}
        </h4>
      </div>

      {/* paragraph */}
      <div className="flex w-full items-start justify-start">
        <p className="font-poppins line-clamp-3 text-[#535353]">
          {review.review_message}
        </p>
      </div>

      {/* btn delete and edit */}
      <div className="mx-auto flex w-[80%] items-center justify-between gap-6">
        {/* delete btn */}
        <button className="font-poppins w-full rounded-md bg-[#0046AE] py-2 text-white">
          Delete
        </button>
        {/* edit btn */}
        <button className="btnbordercolor font-poppins w-full rounded-md py-2 text-[#0046AE]">
          Edit
        </button>
      </div>
    </div>
  );
}

export default MyreviewCard;
