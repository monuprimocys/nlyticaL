import React, { useState } from "react";
import CategoryDropdwonListing from "./CategoryDropdwonListing";
import SubCategoryListingDropdwon from "./SubCategoryListingDropdwon";
import ListingLocation from "./ListingLocation";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useAppSelector } from "@/app/hooks/hooks";

const LocationCategorySubCategoryDropdwon: React.FC = () => {
  // State to track if components are visible (open/closed)
  const [isOpen, setIsOpen] = useState<boolean>(true);

  // Toggle function to open/close the components
  const toggleDropdown = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full relative">
      {/* Right side icon */}
      <div className="w-full flex justify-end items-end relative right-0">
        <MdKeyboardArrowRight
          className={`text-2xl text-[#000000] cursor-pointer transition-transform duration-300 ${
            isOpen ? "rotate-0" : "rotate-180"
          }


          ${isDarkMode ? " text-white" : "bg-white text-black"}

         
          
          `}
          onClick={toggleDropdown} // Toggle on click
        />
      </div>

      {/* Components to toggle visibility */}
      {isOpen && (
        <div className="w-full flex flex-col gap-5">
          <ListingLocation />
          <CategoryDropdwonListing />
          <SubCategoryListingDropdwon />
        </div>
      )}
    </div>
  );
};

export default LocationCategorySubCategoryDropdwon;
