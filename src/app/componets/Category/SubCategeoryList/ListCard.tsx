"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { GoHeart, GoHeartFill } from "react-icons/go";
import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import { useServicelikeMutation } from "@/app/store/api/servicelike";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/app/store/Slice/modalSlice";
import { setLikeStatus } from "@/app/store/Slice/category/likeStatusSlice";
import "./style.css"; // Ensure the styles are correctly applied

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
}) {
  const user_id = Cookies.get("user_id");
  const dispatch = useDispatch();
  const likeStatus = useSelector((state) => state.likeStatus[service_id]);
  const [localLikeStatus, setLocalLikeStatus] = useState(likeStatus ?? isLike);
  const [islike] = useServicelikeMutation();

  console.log(" my like  service: ", localLikeStatus);
  const handleLike = useCallback(() => {
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

        toast.success(
          action === "like"
            ? "Service liked successfully!"
            : "Service disliked!"
        );
      } else {
        toast.error("Failed to update the service's like status.");
      }
    });
  }, [user_id, localLikeStatus, service_id, islike, dispatch]);

  return (
    <div className="w-full h-auto rounded-lg cursor-pointer  border-color flex flex-row gap-2 md:gap-6">
      {/* Image Section */}
      <div className="w-[50%] md:w-[30%] md:h-[15rem] sm:h-auto relative">
        <div
          className="h-full w-full rounded-lg"
          style={{
            backgroundImage: `url(${service_images?.src || ""})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div className="absolute left-0 top-4 w-fit bg-[#0046AE] rounded-r-md px-1 md:px-2 pb-1">
          <button className="text-white font-poppins text-[12px] md:text-sm">
            {category}
          </button>
        </div>

        <div
          className="absolute top-1 bg-[#FFFFFF3D] right-[-0.6rem] md:right-3 group w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-110"
          onClick={handleLike}
        >
          {localLikeStatus === 1 ? (
            <GoHeartFill className="md:w-6 md:h-6 w-5 h-5 text-[#FF2929]" />
          ) : (
            <GoHeart className="md:w-6 md:h-6 w-5 h-5 text-black transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-[70%] h-full flex justify-center items-center flex-col py-3 md:py-0 sm:rounded-xl relative">
        {featured === "Featured" && (
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
            <div>
              <h5 className="text-[#636363] pt-2 font-poppins text-sm md:text-lg font-medium">
                {name}
              </h5>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h3 className="md:text-xl text-sm font-semibold text-black font-poppins">
              {service_name}
            </h3>
          </div>

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
                <p className="text-[#5C5C5C] font-poppins text-[10px] sm:text-sm line-clamp-1">
                  ({reviews})
                </p>
              </div>
            </div>

            <div>
              <p className="text-[#636363] font-poppins text-[10px] sm:text-sm line-clamp-1">
                {yearsInBusiness}
              </p>
            </div>
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
              <p className="text-[#636363] font-poppins text-[12px] md:text-sm line-clamp-1">
                {location || "Location not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="w-full justify-start items-start flex pt-2 md:pt-4 md:pl-7 pl-1">
          <div className="w-fit border-2 border-[#0046AE] px-2 md:px-8 py-2 md:py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer">
            <button className="text-[#0046AE] w-full font-medium font-poppins group-hover:text-white z-10 relative text-sm md:text-[16px]">
              {priceRange}
            </button>
            <div className="absolute top-0 left-0 w-full h-full bg-[#0046AE] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCard;
