"use client";

import React from "react";
import "./cardStyle.css";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "@/app/store/Slice/AddpostSelectedIDandvalues/CategorySelectedIDandValues";

function NewCardDesingHome({ total, title, category_image, subCategoryId }) {
  const router = useRouter(); // Initialize router

  const dispatch = useDispatch();

  // Handle card click to navigate to the subcategory detail page
  const handleCardClick = () => {
    dispatch(
      setSelectedCategory({
        id: subCategoryId,
        category_name: title,
      })
    );

    router.push(`/category/${subCategoryId}`);
  };

  return (
    <div
      className="w-[8rem] h-[11rem] flex flex-col gap-1 overflow-x-hidden justify-between items-center cursor-pointer"
      onClick={handleCardClick} // Add click handler here
    >
      {/* Card Image Section */}
      <div className="w-full h-[70%] flex justify-center items-center bg-[#0046AE0F] rounded-lg cardbordercolor">
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
        <p className="font-poppins text-black text-center line-clamp-2">
          {title} ({total})
        </p>
      </div>
    </div>
  );
}

export default NewCardDesingHome;
