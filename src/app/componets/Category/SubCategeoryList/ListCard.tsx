"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { GoHeart, GoHeartFill } from "react-icons/go";
import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useServicelikeMutation } from "@/app/storeApp/api/servicelike";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { setLikeStatus } from "@/app/storeApp/Slice/category/likeStatusSlice";
import "./style.css"; // Ensure the styles are correctly applied
import { useAppSelector } from "@/app/hooks/hooks";

function ListCard({
  service_images,
  category,
  avatar,
  name,
  service_name,
  reviews,
  yearsInBusiness,
  location,
  priceRange,
  featured,
  rating,
  isLike,
  service_id,
  onclicknavigate,
}) {
  const user_id = Cookies.get("user_id");
  const dispatch = useDispatch();
  const likeStatus = useSelector((state) => state.likeStatus[service_id]);
  const [localLikeStatus, setLocalLikeStatus] = useState(likeStatus ?? isLike);
  const [islike] = useServicelikeMutation();

  console.log(" my like  service: ", localLikeStatus);
  const handleLike = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!user_id) {
        dispatch(showModal("loginModal"));
        return;
      }

      const action = localLikeStatus === 1 ? "dislike" : "like";

      islike({ user_id, service_id, action }).then((response) => {
        if (response?.data?.status) {
          const newLikeStatus = action === "like" ? 1 : 0;
          setLocalLikeStatus(newLikeStatus);
          dispatch(setLikeStatus({ service_id, likeStatus: newLikeStatus }));

          if (action === "like") {
            toast.success("Service liked successfully!");
          } else {
            toast.error("Service disliked!");
          }
        } else {
          toast.error("Failed to update the service's like status.");
        }
      });
    },
    [user_id, localLikeStatus, service_id, islike, dispatch]
  );

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`w-full h-auto rounded-lg cursor-pointer  flex flex-row gap-2 md:gap-6   ${
        isDarkMode ? " bg-[#212121]" : "  border-color"
      }`}
      onClick={onclicknavigate}
    >
      {/* Image Section */}
      <div className="w-[60%] md:w-[30%] md:h-[15rem] sm:h-auto relative">
        <div
          className="h-full w-full rounded-lg"
          style={{
            backgroundImage: `url(${service_images?.src || ""})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute left-0 top-4 w-fit bg-[#0046AE] rounded-r-md px-1 md:px-2 pb-1">
          <button className="text-white font-poppins text-[9px] md:text-sm">
            {category}
          </button>
        </div>

        <div
          className="absolute top-1 bg-[#FFFFFF3D] right-[-0.6rem] md:right-3 group w-9 h-9 md:w-10 md:h-10 rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-110"
          onClick={handleLike}
        >
          {localLikeStatus === 1 ? (
            <GoHeartFill className="md:w-5 md:h-5 w-4 h-4 text-[#FF2929]" />
          ) : (
            <GoHeart className="md:w-5 md:h-5 w-4 h-4 text-black transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-[70%] h-full flex justify-center items-center flex-col py-3 md:py-0 sm:rounded-xl relative">
        {featured === "sponosor " && (
          <div className="absolute right-1 md:right-5 top-[-0.6rem] md:top-4 w-fit bg-[#0046AE] px-2 py-1 rounded-lg flex items-center gap-1">
            <Image
              src={featureicon}
              alt="feature icon"
              className="object-contain w-4 h-4"
            />
            <button className="text-white font-poppins text-[12px] md:text-sm">
              {featured}
            </button>
          </div>
        )}

        <div className="flex flex-col w-full gap-1 md:gap-3 sm:px-6 px-1">
          {/* Avatar with details */}
          <div className="flex items-center gap-x-2">
            <div
              className="md:w-10 md:h-10 w-7 h-7 bg-cover bg-center rounded-full mt-3"
              style={{
                backgroundImage: `url(${avatar || ""})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "50%",
              }}
            />

            <h5
              className={` pt-2 font-poppins text-sm md:text-lg font-medium  ${
                isDarkMode ? "text-[#FFFFFF]" : "text-[#636363]"
              }`}
            >
              {name}
            </h5>
          </div>

          {/* Heading */}

          <h3
            className={`md:text-xl text-sm font-semibold font-poppins  ${
              isDarkMode ? "text-[#FFFFFF]" : " text-black "
            }`}
          >
            {service_name}
          </h3>

          {/* Ratings and Business Info */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1">
              {[...Array(Math.floor(rating))].map((_, index) => (
                <MdOutlineStar
                  key={`full-${index}`}
                  className="text-[#FFA41C]"
                />
              ))}
              {rating % 1 !== 0 && <IoIosStarHalf className="text-[#FFA41C]" />}
              {[...Array(5 - Math.ceil(rating))].map((_, index) => (
                <MdOutlineStar
                  key={`empty-${index}`}
                  className="text-[#D1D1D1]"
                />
              ))}
              <div>
                <p
                  className={` font-poppins text-[10px] sm:text-sm line-clamp-1 ${
                    isDarkMode ? "text-[#FFFFFF]" : "text-[#5C5C5C]"
                  }`}
                >
                  ({reviews})
                </p>
              </div>
            </div>

            {/* <div>
              <p
                className={` font-poppins text-[10px] sm:text-sm line-clamp-1  ${
                  isDarkMode ? "text-[#FFFFFF]" : "text-[#636363]"
                }`}
              >
                {yearsInBusiness}
              </p>
            </div> */}
          </div>

          {/* Location */}
          <div className="flex gap-2">
            <div className="md:w-6 md:h-6 w-4 h-4">
              <Image
                src={locationicon}
                alt="location"
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p
                className={` font-poppins text-[12px] md:text-sm line-clamp-1  ${
                  isDarkMode ? "text-[#FFFFFF]" : "text-[#636363]"
                }`}
              >
                {location || "Location not available"}
              </p>
            </div>
          </div>
          {/* Button */}
          <div className="w-full justify-start items-start flex">
            <div
              className={`   w-[50%] border-2 border-[#0046AE] px-2 md:px-8 py-2 md:py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer   ${
                isDarkMode ? "  bg-[#0046AE2B]" : " "
              }
          }`}
            >
              <button className="text-[#0046AE] w-full font-medium font-poppins group-hover:text-white z-10 relative text-sm md:text-[16px]">
                {priceRange}
              </button>
              <div className="absolute top-0 left-0 w-full h-full bg-[#0046AE] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCard;
