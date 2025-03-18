"use client";
import React from "react";
import "./cardStyle.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/CategorySelectedIDandValues";
import { useAppSelector } from "@/app/hooks/hooks";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";
import { setSelectedCategoryListing } from "@/app/storeApp/Slice/Listing/CategoryLIstingSlice";

function NewCardDesingHome({ total, title, category_image, subCategoryId }) {
  const router = useRouter(); // Initialize router

  const dispatch = useDispatch();

  // Handle card click to navigate to the subcategory detail page
  const handleCardClick = () => {
    // dispatch(
    //   setSelectedCategory({
    //     id: subCategoryId,
    //     category_name: title,
    //   })
    // );

    dispatch(
      setSelectedCategoryListing({
        id: subCategoryId,
        category_name: title,
      })
    );
    // sessionStorage.setItem("cid", subCategoryId);
    sessionStorage.setItem("Category_Name", title);

    const encodedServiceId = encodeString(String(subCategoryId)); // Ensure serviceId is a string
    const serviceSlug = title.toLowerCase().replace(/\s+/g, "-"); // Convert name to URL slug

    const cid = decodeString(encodedServiceId);
    sessionStorage.setItem("Category_ID", cid);

    router.push(`/category/${serviceSlug}`);
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className="w-[8rem] h-[11rem] flex flex-col gap-1 overflow-x-hidden justify-between items-center cursor-pointer"
      onClick={handleCardClick} // Add click handler here
    >
      {/* Card Image Section */}
      <div
        className={`w-full h-[70%] flex justify-center items-center  rounded-lg   ${
          isDarkMode ? " bg-[#212121]" : " bg-[#0046AE0F] cardbordercolor"
        }`}
      >
        <div
          className="w-[50%] h-[50%] bg-cover rounded-xl"
          style={{
            backgroundImage: `url(${category_image})`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      {/* Card Content Section */}
      <div className="w-full h-[30%] flex justify-center items-center">
        <p
          className={`font-poppins  text-center line-clamp-2  ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {title} ({total})
        </p>
      </div>
    </div>
  );
}

export default NewCardDesingHome;
