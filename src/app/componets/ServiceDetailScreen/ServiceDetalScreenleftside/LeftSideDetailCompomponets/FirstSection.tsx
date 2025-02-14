"use client";

import React, { useEffect, useState } from "react";
import detailscreenimage from "../../../../../../public/assets/Image/detailscreenbgimage.png";
import { GoHeart, GoHeartFill } from "react-icons/go";
import SecondSection from "./SecondSection";
import Image from "next/image";
import featureicon from "../../../../../../public/assets/Image/cardsection5iconfeacture.png";
import { useServiceDetailApi } from "@/app/store/api/ServiceDetailScreenApi/useServiceDetailApi";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setVendorServiceDetails } from "@/app/store/Slice/ServiceDetail/ServiceDetailScreenSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useServicelikeMutation } from "@/app/store/api/servicelike";
import { setLikeStatus } from "@/app/store/Slice/category/likeStatusSlice";

function FirstSection() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop() || "";
  const dispatch = useDispatch();
  const user_id = Cookies.get("user_id");

  const { data, error, isLoading, refetch } = useServiceDetailApi(lastSegment);

  // Log the response for debugging
  console.log("API response:", data);

  // Dispatch to Redux only when data is available
  useEffect(() => {
    if (data && !isLoading && !error) {
      dispatch(setVendorServiceDetails(data));
    }
  }, [data, isLoading, error, dispatch]);

  const ServiceDetailData = useAppSelector((state) => state.serviceDetail);

  // Log the Redux store data for debugging
  console.log("All service detail:", ServiceDetailData);

  const [isLiked, setIsLiked] = useState(false);
  const [serviceLike] = useServicelikeMutation();
  // Retrieve the like status for this service from the Redux store
  const currentLikeStatus = useAppSelector(
    (state) => state.likeStatus[data?.serviceDetail.id]
  );
  // Check if the service is already liked by the user when the component mounts
  useEffect(() => {
    if (ServiceDetailData.serviceDetail && user_id) {
      const service_id = ServiceDetailData.serviceDetail.id;

      // Set the `isLiked` state based on the current like status in the Redux store
      setIsLiked(currentLikeStatus === 1); // If like status is 1, set isLiked to true
    }
  }, [ServiceDetailData.serviceDetail, user_id]);

  const handleClick = async () => {
    try {
      if (user_id) {
        const service_id = ServiceDetailData.serviceDetail.id;

        // Toggle the like status: if currently liked (1), set to 0 (dislike); if currently disliked (0), set to 1 (like)
        const newLikeStatus = isLiked ? 0 : 1; // If liked, dislike it; if disliked, like it.

        // Perform the like/dislike API action (mutation)
        await serviceLike({
          user_id: user_id,
          service_id: service_id,
          likeStatus: newLikeStatus, // Send the updated like status
        });

        // Update the local state to reflect the new like status
        setIsLiked(!isLiked);

        // Dispatch the updated like status to Redux
        dispatch(
          setLikeStatus({
            service_id: service_id,
            likeStatus: newLikeStatus, // Update Redux state with new like status
          })
        );

        // Optionally, refetch data after like/dislike action if needed
        refetch(); // Refresh data after like/dislike
      } else {
        alert("Please log in to like or dislike this service.");
      }
    } catch (error) {
      console.error("Error liking/disliking service:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full h-[40rem] relative">
      {/* Background image */}
      <div
        className="w-full h-[20rem] md:h-[25rem] cursor-pointer rounded-t-[1rem]"
        style={{
          backgroundImage: `url(${
            ServiceDetailData.serviceDetail?.cover_image || detailscreenimage
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Right side heart icon */}
        <div
          className="group absolute right-3 top-4 flex h-12 w-12 transform cursor-pointer items-center justify-center rounded-full bg-[#FFFFFF3D] transition-all duration-300 ease-in-out hover:scale-110"
          onClick={handleClick}
        >
          {isLiked ? (
            <GoHeartFill className="h-6 w-6 text-[#FF2929]" />
          ) : (
            <GoHeart className="h-6 w-6 text-black transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Featured section */}
      <div className="absolute right-5 md:right-10 h-auto bg-[#0046AE] bottom-[50%] md:bottom-[41%] z-10 w-fit px-2 py-1 rounded-lg flex justify-center items-center">
        <Image
          src={featureicon}
          alt="feature icon"
          className="object-contain w-4 h-4"
        />
        <button className="text-white font-poppins text-sm">featured</button>
      </div>

      {/* Second Section */}
      <div className="w-full h-[20rem] md:h-[17rem] absolute bottom-2 md:bottom-1">
        <SecondSection />
      </div>
    </div>
  );
}

export default FirstSection;
