"use client";
import featureicon from "../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";
import { setLikeStatus } from "@/app/storeApp/Slice/category/likeStatusSlice";
import { useDispatch } from "react-redux";
import { useServicelikeMutation } from "@/app/storeApp/api/servicelike";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import Cookies from "js-cookie";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";
const Section5card = ({ data }) => {
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

  const rating = data.totalAvgReview;

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

  console.log(" my card data detail ", data);

  const is_featured = data.is_featured;

  return (
    <div
      className="h-[26rem]   cursor-pointer lg:h-[30rem] overflow-hidden  w-full relative rounded-xl flex flex-col  shadow-md     mb-2    "
      onClick={() => handleCardClick(data.id, data.service_name)}
    >
      {/* Image Section (60% height of parent) */}
      <div
        className="relative w-full h-[45%] sm:h-[45%] md:h-[50%] rounded-t-xl"
        style={{
          backgroundImage: `url(${data.service_images[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Top-left button */}
        <div className="absolute left-0 h-auto bg-[#0046AE] top-4 w-fit rounded-r-md px-2 py-1">
          <button className="text-white font-poppins">
            {data.category_name}
          </button>
        </div>

        {/* Top-right heart icon */}
        <div
          className="absolute  bg-[#FFFFFF3D] right-3 group top-4 w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-110"
          onClick={handleLikeToggle} // Add click event handler
        >
          {/* Conditionally render the heart icon based on isLiked */}
          {isLiked ? (
            <GoHeartFill className="w-6 h-6 text-[#FF2929]" />
          ) : (
            <GoHeart className="w-6 h-6 text-black transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Content Section (40% height of parent) */}
      <div
        className={`w-full h-[65%]  md:h-[70%] lg:h-[50%] xl:h-[55%]    flex justify-center items-center rounded-xl relative ${
          isDarkMode ? "   bg-[#212121]" : ""
        }`}
      >
        {/* top right */}
        {is_featured == 1 ? (
          <div className="absolute right-4 h-auto bg-[#0046AE] top-[-1rem] w-fit px-2 py-1 rounded-lg flex justify-center items-center">
            <Image
              src={featureicon}
              alt="feature icon"
              className="object-contain w-4 h-4"
            />
            <button className="text-white font-poppins text-sm">Sponcer</button>
          </div>
        ) : null}

        <div className="flex flex-col w-full gap-3  xl:px-6 px-4">
          {/* Avatar with detail */}
          <div className="flex items-center  gap-x-2">
            <div
              className="w-10 h-10"
              style={{
                backgroundImage: `url(${data.vendor_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "50%",
              }}
            ></div>

            <div>
              <h5
                className={` font-poppins text-lg font-medium  ${
                  isDarkMode ? "text-[#FFFFFF]" : " text-[#636363]"
                }`}
              >
                {data.vendor_first_name} <span>{data.vendor_last_name}</span>
              </h5>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h3
              className={`xl:text-[18px] text-xl font-semibold  font-poppins   ${
                isDarkMode ? "text-[#FFFFFF]" : "  text-black"
              }`}
            >
              {data.service_name}
            </h3>
          </div>

          {/* Ratings and Business Info */}
          <div className="flex items-center w-full  justify-between">
            <div className="flex items-center justify-center gap-1">
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
                    isDarkMode ? "text-[#FFFFFF]" : "text-[#636363] "
                  }`}
                >
                  ({data.totalReviewCount})
                </p>
              </div>
            </div>

            {/* <div className="flex items-center justify-center">
              <p className="font-medium font-poppins text-[#636363] text-[12px] xl:text-sm line-clamp-1">
                {data.total_years_count}
              </p>
            </div> */}
          </div>

          {/* Location */}
          <div className="flex gap-2">
            <div className="w-6 h-6">
              <Image
                src={locationicon}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p
                className={` font-poppins font-normal text-sm  ${
                  isDarkMode ? "text-[#FFFFFF]" : "text-[#636363] "
                }`}
              >
                {data.address}
              </p>
            </div>
          </div>

          {/* Button */}
          <div
            className={`w-full mx-auto border-2 border-[#0046AE] px-4 py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer  ${
              isDarkMode ? "bg-[#0046AE2B]" : "bg-[#FFFFFF] "
            }`}
          >
            <button className="text-[#0046AE] font-medium font-poppins group-hover:text-white z-10 relative">
              {data.price_range}
            </button>
            <div className="absolute top-0 left-0 w-full h-full bg-[#0046AE] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Section5card;
