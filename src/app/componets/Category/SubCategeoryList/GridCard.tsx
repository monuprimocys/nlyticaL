"use client";

import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";

import Image from "next/image";
import { useServicelikeMutation } from "@/app/storeApp/api/servicelike";
import Cookies from "js-cookie";
import { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { setLikeStatus } from "@/app/storeApp/Slice/category/likeStatusSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { useRouter } from "next/navigation";

const GridCard = ({
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
  isLike, // this can be passed as a prop, indicating the initial like state
  service_id,
  onclicknavigate,
}) => {
  const user_id = Cookies.get("user_id");
  const dispatch = useDispatch();
  const likeStatus = useSelector((state: any) => state.likeStatus[service_id]);
  const [localLikeStatus, setLocalLikeStatus] = useState(likeStatus ?? isLike);
  const [islike] = useServicelikeMutation();

  console.log(" all avatar image", avatar);

  const handleLike = useCallback(
    (event) => {
      event.stopPropagation(); // Prevent event bubbling to parent div
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

  const router = useRouter();

  return (
    <div
      className={`h-[27.4rem] lg:h-[30rem] cursor-pointer overflow-hidden w-full relative rounded-xl flex flex-col shadow-md mb-2   ${
        isDarkMode ? "bg-[#212121] " : "bg-[#ffffff] "
      } `}
      onClick={onclicknavigate}
    >
      {/* Image Section */}
      <div
        className="relative w-full h-[45%] sm:h-[45%] md:h-[50%] rounded-t-xl bg-cover"
        style={{
          backgroundImage: `url(${service_images?.src || ""})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Category Button */}
        <div className="absolute left-0 top-4 bg-[#0046AE] px-2 py-1 rounded-r-md">
          <button className="text-white font-poppins">{category}</button>
        </div>

        {/* Like Button */}
        <div
          className="absolute top-4 right-3 bg-[#FFFFFF3D] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-110"
          onClick={handleLike} // Make sure this event stops propagation to parent div
        >
          {localLikeStatus === 1 ? (
            <GoHeartFill className="w-5 h-5 text-[#FF2929]" />
          ) : (
            <GoHeart className="w-5 h-5 text-black transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full h-[55%] flex justify-center items-center rounded-xl relative">
        {featured === "sponosor" && (
          <div className="absolute right-4 top-[-1rem] bg-[#0046AE] px-2 py-1 rounded-lg flex justify-center items-center">
            <Image
              src={featureicon}
              alt="Feature icon"
              className="object-contain w-4 h-4"
            />
            <button className="text-white font-poppins text-sm">
              {featured}
            </button>
          </div>
        )}
        <div className="flex flex-col w-full gap-3 xl:px-6 px-4">
          {/* Avatar */}
          <div className="flex items-center gap-x-2">
            <div
              className="w-10 h-10 rounded-full"
              style={{
                backgroundImage: `url(${avatar || ""})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div>
              <h5
                className={` font-poppins text-lg font-medium   ${
                  isDarkMode ? "  text-white " : " text-[#636363] "
                }`}
              >
                {name}
              </h5>
            </div>
          </div>

          {/* Service Name */}
          <div>
            <h3
              className={`xl:text-[18px] text-xl font-semibold  font-poppins  ${
                isDarkMode ? " text-white " : "text-black "
              }`}
            >
              {service_name}
            </h3>
          </div>

          {/* Ratings and Business Info */}
          <div className="flex items-center w-full justify-between">
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
                  className={` font-poppins text-[12px] xl:text-sm  ${
                    isDarkMode ? "  text-white " : " text-[#5C5C5C] "
                  }`}
                >
                  ({reviews})
                </p>
              </div>
            </div>
            {/* <div>
              <p
                className={`font-medium font-poppins  text-[12px] xl:text-sm  ${
                  isDarkMode ? "  text-white " : " text-[#636363] "
                }`}
              >
                {yearsInBusiness}
              </p>
            </div> */}
          </div>

          {/* Location */}
          <div className="flex gap-2 w-full">
            <div className="w-6 h-6">
              <Image
                src={locationicon}
                alt="Location icon"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-full">
              <p
                className={` font-poppins font-normal text-sm line-clamp-2  ${
                  isDarkMode ? "  text-white " : " text-[#636363] "
                }`}
              >
                {location} 
              </p>
            </div>
          </div>

          {/* Price Range Button */}
          <div
            className={`w-full mx-auto border-2 border-[#0046AE] px-4 py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer   ${
              isDarkMode ? "  bg-[#0046AE2B]" : " "
            } `}
          >
            <button className="text-[#0046AE] font-medium font-poppins group-hover:text-white z-10 relative">
              {priceRange}
            </button>
            <div className="absolute top-0 left-0 w-full h-full bg-[#0046AE] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default GridCard;
