"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import priceicon from "../../../../../public/assets/Image/priceicon.png";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setPriceListing } from "@/app/storeApp/Slice/Listing/PriceSliceListing";
import { useGetPrice } from "@/app/storeApp/api/useGetPrice";

const PriceListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const price = useAppSelector((state) => state.PriceSliceListing.price);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { data, refetch } = useGetPrice();

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  // Ensure minPrice and maxPrice are numbers
  const minPrice = data?.min_price
    ? Number(data.min_price.replace(/[¥,]/g, ""))
    : 0;
  const maxPrice = data?.max_price
    ? Number(data.max_price.replace(/[¥,]/g, ""))
    : 1000;

  // Handle price change
  const updatePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(event.target.value);
    dispatch(setPriceListing(newPrice));
  };

  return (
    <div className="flex flex-col w-full h-auto">
      {/* Header */}
      <div className="w-full flex items-center gap-3">
        <Image
          src={priceicon}
          alt="Price Icon"
          className={`h-[1.3rem] w-[1.3rem] object-cover ${
            isDarkMode ? "bg-circle-icon" : ""
          }`}
        />
        <h5
          className={`font-poppins font-normal ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Pricing Filter
        </h5>
      </div>

      {/* Price Range Input */}
      <div
        className={`rounded-lg mt-5 w-full ${
          isDarkMode ? "bg-transparent" : "bg-white"
        }`}
      >
        <input
          type="range"
          id="price-range"
          className="w-full accent-[#0046AE] cursor-pointer"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updatePrice}
        />

        <div className="flex justify-between">
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            ¥{minPrice}
          </span>
          <span className="text-[#0046AE] font-poppins">¥{price}</span>
          <span
            className={`font-poppins ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            ¥{maxPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceListing;
