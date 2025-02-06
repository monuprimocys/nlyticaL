"use client";

import Image from "next/image";
import React from "react";
import priceicon from "../../../../../public/assets/Image/priceicon.png";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setPriceListing } from "@/app/store/Slice/Listing/PriceSliceListing";

const PriceListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const price = useAppSelector((state) => state.PriceSliceListing.price);

  const updatePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Dispatching the new price to Redux store
    dispatch(setPriceListing(Number(event.target.value)));
  };

  console.log("Updated price: listing", price);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="flex flex-col w-full h-auto">
      {/* heading */}
      <div className="w-full justify-start items-center gap-3 flex">
        <div>
          <Image
            src={priceicon}
            alt="priceicon"
            className={`h-[1.3rem] w-[1.3rem] object-cover   ${
              isDarkMode ? "bg-circle-icon" : ""
            }`}
          />
        </div>

        <div>
          <h5
            className={`font-poppins text-black font-normal   ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Pricing Filter
          </h5>
        </div>
      </div>

      {/* price range input box */}
      <div
        className={`rounded-lg mt-5 w-full   ${
          isDarkMode ? "bg-transparent" : " bg-white"
        }`}
      >
        <div>
          <input
            type="range"
            id="price-range"
            className="w-full accent-[#0046AE] cursor-pointer"
            min="0" // Minimum price value
            max="1000" // Maximum price value
            value={price}
            onChange={updatePrice}
          />
        </div>
        <div className="flex justify-between ">
          <span
            id="minPrice"
            className={`font-poppins    ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            $100
          </span>
          <span id="currentPrice" className="text-[#0046AE] font-poppins">
            ${price}
          </span>
          <span
            id="maxPrice"
            className={`font-poppins    ${
              isDarkMode ? "text-white" : "text-[#0000004F]"
            }`}
          >
            $1000
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceListing;
