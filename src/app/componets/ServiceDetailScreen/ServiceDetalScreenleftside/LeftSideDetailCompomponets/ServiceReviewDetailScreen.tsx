"use client";

import React from "react";
import staricon from "../../../../../../public/assets/Image/starindetailscreen.png";
import Image from "next/image";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import Cookies from "js-cookie";
import { useAppSelector } from "@/app/hooks/hooks";
import video from "../../../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";

function ServiceReviewDetailScreen() {
  const dispatch = useDispatch();
  const user_id = Cookies.get("user_id");
  const reviewsData = useAppSelector(
    (state) => state.serviceDetail.serviceDetail.reviews
  );

  const reviewsDatastar = useAppSelector(
    (state) => state.serviceDetail.serviceDetail
  );

  // Handle clicking on the star
  const handleStarClick = () => {
    if (!user_id) {
      dispatch(showModal("loginModal"));
      return; // Stop further execution if user_id is not found
    }
    dispatch(showModal("ServiceDetailScreenRatingModal"));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`w-full h-auto p-6 rounded-lg   ${
        isDarkMode
          ? "bg-[#212121] text-white"
          : "photoservicedetailborderandshado  text-black  bg-white"
      }`}
    >
      {/* Heading */}
      <div className="text-lg font-medium font-poppins">Reviews & Ratings</div>

      {/* Review List */}
      <div className="w-full flex flex-col gap-6 pt-4">
        <div className=" w-full flex justify-between   items-center">
          {/* Star Rating Section */}
          <div className=" flex  flex-col gap-6">
            <h4
              className={`font-poppins  text-lg font-medium  ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Start Your Review
            </h4>

            {/* if user id not exist show alert */}
            <div className="w-full flex  gap-4" onClick={handleStarClick}>
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-12 w-12 rounded-lg p-1 cursor-pointer flex justify-center items-center bg-[#E8E8E8]"
                >
                  <Image
                    src={staricon}
                    alt="star"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Rating */}
          <div className=" pt-8  flex justify-start items-center gap-6">
            <div className="w-14 h-14 rounded-lg bg-[#0046AE] flex justify-center items-center cursor-pointer">
              <p className="font-medium text-white font-poppins text-lg">
                {" "}
                {reviewsDatastar.totalAvgReview}{" "}
              </p>
            </div>
            <div
              className={`text-base font-medium font-poppins   ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {reviewsDatastar.totalReviewCount} ratings
            </div>
          </div>
        </div>

        {/* Review Card */}
        <div className="w-full flex flex-col gap-6 mt-12">
          {reviewsData.length > 0 ? (
            reviewsData.map((review, idx) => {
              // Convert review_star to a number for rating calculation
              const rating = parseFloat(review.review_star);

              return (
                <div
                  className={`w-full h-auto  p-4 rounded-lg relative  ${
                    isDarkMode
                      ? "bg-[#FFFFFF05] text-white"
                      : "bg-white text-black  photoservicedetailborderandshado"
                  }`}
                  id={String(idx)}
                  key={idx}
                >
                  <div className="w-full flex justify-between items-center ">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12  relative">
                        <div
                          className=" h-full w-full  rounded-full absolute top-[-2rem] left-0"
                          style={{
                            backgroundImage: `url(${review.image || ""})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        ></div>
                      </div>
                      <div
                        className={`text-base font-medium absolute left-[20%] md:left-[12%] top-4 font-poppins    ${
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
            })
          ) : (
            <div className="flex h-auto min-h-[20rem] w-full flex-col items-center justify-center text-center">
              <div className="flex h-[8rem] w-[8rem] items-center justify-center">
                <Image
                  src={video}
                  alt="Loading animation"
                  width={100}
                  height={100}
                />
              </div>
              <h2
                className={`font-poppins font-medium   ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                No Ratings to show
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServiceReviewDetailScreen;
