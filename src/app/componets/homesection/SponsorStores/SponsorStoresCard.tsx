"use client";
import React, { useState } from "react";
import Image from "next/image";
import { GoHeart, GoHeartFill } from "react-icons/go";
import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import "./cardStyle.css";
import { useServicelikeMutation } from "@/app/storeApp/api/servicelike";
import { setLikeStatus } from "@/app/storeApp/Slice/category/likeStatusSlice";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";

function SponsorStoresCard({ data }) {
  console.log(" my card detail @@@@@@@@@@ ", data);
  const rating = data.totalAvgReview;
  const [isLiked, setIsLiked] = useState(data.isLike); // Track like state

  const dispatch = useDispatch();
  const [serviceLike] = useServicelikeMutation();
  const user_id = Cookies.get("user_id");

  const handleLikeToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user_id) {
      dispatch(showModal("loginModal"));
      return;
    }

    try {
      // Call API to toggle like status
      await serviceLike({ user_id, service_id: data.id });

      // Toggle the local like state
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);

      // Dispatch the action to update the like status in Redux
      dispatch(
        setLikeStatus({
          service_id: data.id,
          likeStatus: newLikeStatus ? 1 : 0,
        })
      );

      // Show success message based on new like status
      toast.success(
        newLikeStatus ? "You liked this item!" : "You disliked this item!"
      );
    } catch (error) {
      console.error("Error while toggling like status:", error);
      toast.error("Error while updating like status.");
    }
  };

  const router = useRouter();
  const handleCardClick = (serviceId, serviceName) => {
    if (!serviceId || !serviceName) {
      console.error("Invalid serviceId or serviceName");
      return;
    }

    const encodedServiceId = encodeString(String(serviceId)); // Ensure serviceId is a string
    const serviceSlug = serviceName.toLowerCase().replace(/\s+/g, "-"); // Convert name to URL slug

    console.log("Encoded Service ID:", encodedServiceId);

    // Navigate to the encoded route
    router.push(`/stores/${serviceSlug}/${encodedServiceId}`);

    serviceId = decodeString(encodedServiceId);

    // Store in sessionStorage for later use
    sessionStorage.setItem("serviceId", serviceId);
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`w-full h-auto  rounded-lg   flex flex-row  gap-2  ${
        isDarkMode ? "bg-[#212121] " : "bg-[#ffffff] "
      }`}
      id="border-color"
      onClick={() => handleCardClick(data.id, data.service_name)}
    >
      {/* Image Section */}
      <div className=" w-[50%]   md:w-[35%]  h-auto relative">
        <div
          className=" w-full h-full"
          style={{
            backgroundImage: `url(${data.service_images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        ></div>
        <div className="absolute left-0 top-4 w-fit bg-[#0046AE] rounded-r-md px-1 md:px-2 pb-1">
          <button className="text-white font-poppins text-[12px] md:text-sm">
            {data.category_name}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full py-3 md:w-[70%] h-full flex justify-center items-center flex-col   sm:rounded-xl relative ">
        <div className="flex flex-col w-full gap-1 md:gap-2 sm:px-6 px-1">
          {/*  sponcer  */}

          <div className=" w-full flex justify-between items-center">
            <div className=" w-fit bg-[#0046AE] px-2 py-1 rounded-lg flex items-center gap-1">
              <Image
                src={featureicon}
                alt="feature icon"
                className="object-contain w-4 h-4"
              />
              <button className="text-white font-poppins  text-[12px]  md:text-sm">
                Sponsor
              </button>
            </div>
            <div
              className="group   flex h-12 w-12 transform cursor-pointer items-center justify-center rounded-full bg-[#FFFFFF3D] transition-all duration-300 ease-in-out hover:scale-110"
              onClick={handleLikeToggle}
            >
              {isLiked ? (
                <GoHeartFill className="h-6 w-6 text-[#FF2929]" />
              ) : (
                <GoHeart className="h-6 w-6 text-black transition-colors duration-200" />
              )}
            </div>
          </div>
          {/* Avatar with details */}
          <div className="flex items-center gap-x-2">
            <div
              className="md:w-10 md:h-10 w-7 h-7 bg-cover bg-center rounded-full"
              style={{
                backgroundImage: `url(${data.vendor_image})`,
              }}
            ></div>
            <div>
              <h5
                className={` font-poppins text-sm  font-medium 
                ${isDarkMode ? "text-white" : "text-[#636363]"}
              `}
              >
                {data.vendor_first_name} <span>{data.vendor_last_name}</span>
              </h5>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h3
              className={`md:text-xl text-sm  font-semibold  font-poppins ${
                isDarkMode ? "text-white" : "text-black"
              }
            }`}
            >
              {data.service_name}
            </h3>
          </div>

          {/* Ratings and Business Info */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1 ">
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
                  className={` font-poppins text-[10px] sm:text-sm line-clamp-1   ${
                    isDarkMode ? "text-white" : "text-[#636363]"
                  }`}
                >
                  ({data.totalReviewCoun} Review)
                </p>
              </div>
            </div>

            {/* <div>
              <p className="text-[#636363] font-poppins text-[10px] sm:text-sm line-clamp-1">
                {data.total_years_count} Years in Business
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
                  isDarkMode ? "text-white" : "text-[#636363]"
                }`}
              >
                {data.address}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className=" w-full justify-start items-start flex mt-1 ">
            <div
              className={`w-full border-2    border-[#0046AE] px-2 md:px-8 py-2 md:py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer  ${
                isDarkMode ? " bg-[#0046AE2B]" : ""
              }`}
            >
              <button className="text-[#0046AE] font-medium font-poppins group-hover:text-white z-10 relative  text-sm md:text-[16px]">
                {data.price_range}
              </button>
              <div className="absolute top-0 left-0 w-full h-full bg-[#0046AE] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default SponsorStoresCard;
