import React, { useEffect } from "react";
import "./style.css";
import { IoMdStar } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useGetReview } from "@/app/storeApp/api/useGetReview";

function MyreviewCard({ review, onClick }) {
  // Function to render stars based on the rating

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

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

  const dispatch = useAppDispatch();
  const { refetch } = useGetReview();

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div
      className="cardborder flex w-full cursor-pointer flex-col gap-3 rounded-lg p-3   bg-[#FFFFFF12]
"
      onClick={onClick}
    >
      {/* heading with star */}
      <div className="flex w-full flex-row items-center justify-between">
        <h2
          className={`font-poppins line-clamp-1 text-lg font-medium  ${
            isDarkMode ? "text-white" : "text-black"
          }  `}
        >
          {review.service_name}
        </h2>
        {/* rating */}
        <div className="flex gap-1">
          {renderStars(Number(review.review_star))}
        </div>
      </div>
      {/* sub heading */}
      <div className="flex w-full items-start justify-start">
        <h4
          className={`font-poppins text-[16px] font-normal  ${
            isDarkMode ? "text-white" : "text-black"
          } `}
        >
          {review.category_name}
        </h4>
      </div>

      {/* paragraph */}
      <div className="flex w-full items-start justify-start">
        <p
          className={`font-poppins line-clamp-3 ${
            isDarkMode ? "text-white" : "text-[#535353]"
          } `}
        >
          {review.review_message}
        </p>
      </div>

      {/* btn delete and edit */}
      <div className="mx-auto flex w-[80%] items-center justify-between gap-6">
        {/* delete btn */}
        <button
          className="font-poppins w-full rounded-md bg-[#0046AE] py-2 text-white "
          onClick={() => {
            dispatch(showModal("DeleteReviewModal"));
          }}
        >
          Delete
        </button>
        {/* edit btn */}
        <button
          className={`btnbordercolor font-poppins w-full rounded-md py-2  ${
            isDarkMode ? "text-white" : "text-[#0046AE]"
          } `}
          onClick={() => {
            dispatch(showModal("EditReviewModal"));
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default MyreviewCard;
