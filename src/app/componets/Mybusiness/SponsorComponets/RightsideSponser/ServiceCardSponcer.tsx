"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoHeart, GoHeartFill } from "react-icons/go";
import featureicon from "../../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { useServicelikeMutation } from "@/app/storeApp/api/servicelike";
import { setLikeStatus } from "@/app/storeApp/Slice/category/likeStatusSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";

function ServiceCardSponcer() {
  const service_id = Cookies.get("service_id");

  const { data, error, isLoading, refetch } = useServiceDetailApi(service_id);

  useEffect(() => {
    refetch();
  }, []);

  // // Static data
  // const data = {
  //   id: "1",
  //   service_name: "Premium Service",
  //   service_images: [
  //     "https://plus.unsplash.com/premium_photo-1734640921345-6037f1c70e20?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   ],
  //   vendor_image:
  //     "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   vendor_first_name: "John",
  //   vendor_last_name: "Doe",
  //   category_name: "Electronics",
  //   totalAvgReview: 4.5,
  //   totalReviewCoun: 150,
  //   price_range: "12$$$",
  //   address: "1234 Street Name, City, Country",
  //   isLike: false,
  // };

  const rating = data?.serviceDetail.totalReviewCount ?? 0;
  const [isLiked, setIsLiked] = useState(data?.serviceDetail.isLike); // Track like state

  const dispatch = useDispatch();
  const [serviceLike] = useServicelikeMutation();
  const user_id = Cookies.get("user_id");

  const handleLikeToggle = async () => {
    try {
      // Call API to toggle like status
      await serviceLike({ user_id, service_id: data?.serviceDetail.id });

      // Toggle the local like state
      const newLikeStatus = !isLiked;
      setIsLiked(newLikeStatus);

      // Dispatch the action to update the like status in Redux
      dispatch(
        setLikeStatus({
          service_id: data?.serviceDetail.id,
          likeStatus: newLikeStatus ? 1 : 0,
        })
      );

      // Show success message based on new like status
      if (newLikeStatus) {
        toast.success("You liked this item!");
      } else {
        toast.success("You disliked this item!");
      }
    } catch (error) {
      console.error("Error while toggling like status:", error);
      toast.error("Error while updating like status.");
    }
  };

  //   const router = useRouter();
  //   const handleCardClick = (id) => {

  //     router.push(`/ServiceDetail/${id}`);
  //   };

  const is_featured = data?.serviceDetail.is_featured;

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

  return (
    <div
      className="w-full h-auto rounded-lg bordercolordailybudget p-2 flex flex-row gap-2"
      onClick={() =>
        handleCardClick(
          data?.serviceDetail.id,
          data?.serviceDetail.service_name
        )
      }
    >
      {/* Image Section */}
      <div className="w-[50%] md:w-[35%] h-auto relative">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${data?.serviceDetail.service_images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        ></div>
        <div className="absolute left-0 top-4 w-fit bg-[#0046AE] rounded-r-md px-1 md:px-2 pb-1">
          <button className="text-white font-poppins text-[12px] md:text-sm">
            {data?.serviceDetail.service_name}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full md:w-[70%] h-full flex justify-center items-center flex-col sm:rounded-xl relative">
        <div className="flex flex-col w-full gap-1 md:gap-2 sm:px-6 px-1">
          {/* sponcer */}
          <div className="w-full flex justify-between items-center">
            {is_featured === 1 && (
              <div className="w-fit bg-[#0046AE] px-2 py-1 rounded-lg flex items-center gap-1">
                <Image
                  src={featureicon}
                  alt="feature icon"
                  className="object-contain w-4 h-4"
                />
                <button className="text-white font-poppins text-[12px] md:text-sm">
                  Sponsor
                </button>
              </div>
            )}

            <div
              className="group flex h-12 w-12 transform cursor-pointer items-center justify-center rounded-full bg-[#FFFFFF3D] transition-all duration-300 ease-in-out hover:scale-110"
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
                backgroundImage: `url(${data?.vendorDetails.image})`,
              }}
            ></div>
            <div>
              <h5 className="text-[#636363] font-poppins text-sm font-medium">
                {data?.vendorDetails.first_name}{" "}
                <span>{data?.vendorDetails.last_name}</span>
              </h5>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h3 className="md:text-xl text-sm font-semibold text-black font-poppins">
              {data?.serviceDetail.category_name}
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
                  ({data?.serviceDetail.totalReviewCount} Review)
                </p>
              </div>
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
                {data?.serviceDetail.address}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="w-full justify-start items-start flex mt-1">
            <div className="w-full border-2 border-[#0046AE] px-2 md:px-8 py-2 md:py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer">
              <button className="text-[#0046AE] font-medium font-poppins group-hover:text-white z-10 relative text-sm md:text-[16px]">
                {data?.serviceDetail.price_range}
              </button>
              <div className="absolute top-0 left-0 w-full h-full bg-[#0046AE] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCardSponcer;
