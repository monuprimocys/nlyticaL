"use client";

import featureicon from "../../../../../public/assets/Image/cardsection5iconfeacture.png";
import locationicon from "../../../../../public/assets/Image/locationicon.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { GoHeart, GoHeartFill } from "react-icons/go";
import Image from "next/image";

const Section5card: React.FC<{ favorite: any }> = ({ favorite }) => {
  const featured = favorite.is_featured;

  console.log(" my filter data from like api", favorite);
  const rating = favorite.totalAvgReview;

  return (
    <div className="relative mb-2 flex h-[26rem] w-full flex-col overflow-hidden rounded-xl shadow-md lg:h-[30rem]">
      {/* Image Section */}
      <div
        className="relative h-[45%] w-full rounded-t-xl sm:h-[45%] md:h-[50%]"
        style={{
          backgroundImage: `url(${favorite.service_images})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Top-left button */}
        <div className="absolute left-0 top-4 h-auto w-fit rounded-r-md bg-[#0046AE] px-2 py-1">
          <button className="font-poppins text-white">
            {favorite.category_name}
          </button>
        </div>

        {/* Top-right heart icon */}
        <div className="group absolute right-3 top-4 flex h-12 w-12 transform cursor-pointer items-center justify-center rounded-full bg-[#FFFFFF3D] transition-all duration-300 ease-in-out hover:scale-110">
          {favorite.isLike ? (
            <GoHeartFill className="h-6 w-6 text-[#FF2929]" />
          ) : (
            <GoHeart className="h-6 w-6 text-black transition-colors duration-200" />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="relative flex h-[55%] w-full items-center justify-center rounded-xl sm:h-[50%] md:h-[55%] lg:h-[50%] xl:h-[55%]">
        {/* top right */}
        {featured==1 && (
          <div className="absolute right-4 top-[-1rem] flex h-auto w-fit items-center justify-center rounded-lg bg-[#0046AE] px-2 py-1">
            <Image
              src={featureicon}
              alt="feature icon"
              className="h-4 w-4 object-contain"
            />
            <button className="font-poppins text-sm text-white">
              featured
            </button>
          </div>
        )}

        <div className="flex w-full flex-col gap-3 px-4 xl:px-6">
          {/* Avatar with detail */}
          <div className="flex items-center gap-x-2">
            <div
              className="h-10 w-10"
              style={{
                backgroundImage: `url(${favorite.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                borderRadius: "50%",
              }}
            ></div>

            <div>
              <h5 className="font-poppins text-lg font-medium text-[#636363] flex gap-1">
                <span> {favorite.first_name}</span>
                <span>{favorite.last_name}</span>
              </h5>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h3 className="font-poppins text-xl font-semibold text-black xl:text-[18px]">
              {favorite.service_name}
            </h3>
          </div>

          {/* Ratings and Business Info */}
          <div className="flex w-full items-center justify-between">
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
                <p className="font-poppins text-[12px] text-[#5C5C5C] xl:text-sm">
                  ({favorite.totalReviewCount})
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <p className="font-poppins line-clamp-1 text-[12px] font-medium text-[#636363] xl:text-sm">
                {favorite.last_name}
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="flex w-full gap-2">
            <div className="h-6 w-6">
              <Image
                src={locationicon}
                alt="location icon"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-full">
              <p className="font-poppins line-clamp-1 text-sm font-normal text-[#636363]">
                {favorite.address}
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="group relative mx-auto flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-[#0046AE] px-4 py-3">
            <button className="font-poppins relative z-10 font-medium text-[#0046AE] group-hover:text-white">
              From {favorite.price_range}
            </button>
            <div className="absolute left-0 top-0 h-full w-full origin-left scale-x-0 transform bg-[#0046AE] transition-transform duration-500 group-hover:scale-x-100"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section5card;
