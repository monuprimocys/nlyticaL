"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import dropdownIcon from "../../../../../public/assets/Image/subcategorylisting.png";
import { useAppSelector } from "@/app/hooks/hooks";
import { useGetSubCategoriesQuery } from "@/app/storeApp/api/useGetAllSubCategory";
import { setselectedSubCategoryListing } from "@/app/storeApp/Slice/Listing/SubCategoryListing";
import { setselectedSubCategory } from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/SubCategorySelectedIdandValues";

const SubCategoryListingDropdown: React.FC = () => {
  const dispatch = useDispatch();

  // Get selected category ID from Redux
  const category_id = useAppSelector(
    (state) => state.categoryListing.selectedCategoryListing.id
  );

  // Fetch subcategories based on category_id
  const { data, refetch } = useGetSubCategoriesQuery(
    { category_id: category_id || "" },
    { skip: !category_id }
  );

  const SubCategoryDetail = useAppSelector(
    (state) => state.subcategory.selectedSubCategory
  );

  console.log(" my SubCategoryDetail values from slice ", SubCategoryDetail);

  const subcategories = data?.subCategoryData || [];

  useEffect(() => {
    dispatch(
      setselectedSubCategoryListing({
        id: SubCategoryDetail.id,
        subcategory_name: SubCategoryDetail.subcategory_name,
      })
    );
  });

  // Local state for search and dropdown visibility
  const [searchValue, setSearchValue] = useState<string>(
    SubCategoryDetail.subcategory_name || ""
  );
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // **1️⃣ Prevent Infinite Loop: Only Refetch When `category_id` Changes**
  useEffect(() => {
    if (category_id) refetch();
  }, [category_id]); // ✅ Removed `data` and `refetch` from dependencies

  // **2️⃣ Handle Empty Search (Prevent Redundant Updates)**
  useEffect(() => {
    if (!searchValue) {
      dispatch(
        setselectedSubCategoryListing({ id: null, subcategory_name: "" })
      );
    }
  }, [searchValue, dispatch]);  

  // **3️⃣ Filter Subcategories Without useEffect (Avoid Infinite Loop)**
  const filteredSubcategories = subcategories.filter((subcategory) =>
    subcategory.subcategory_name
      .toLowerCase()
      .includes(searchValue.toLowerCase())
  );

  const handleSelectSubCategory = (subcategory: {
    id: number;
    subcategory_name: string;
  }) => {
    setSearchValue(subcategory.subcategory_name);

    
    dispatch(setselectedSubCategory(subcategory));


    setShowDropdown(false);
    sessionStorage.setItem("subcategory", JSON.stringify(subcategory));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full flex flex-col gap-1 relative">
      {/* Input Box with Dropdown Icon */}
      <div className="relative flex items-center">
        <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center">
          <Image
            src={dropdownIcon}
            alt="Dropdown Icon"
            className={`h-[1rem] w-[1rem] ${
              isDarkMode ? "bg-circle-icon" : "text-gray-700"
            }`}
          />
        </span>

        <input
          type="text"
          id="subcategory"
          name="subcategory"
          className={`w-full rounded-lg font-poppins border ${
            category_id
              ? "border-[#0046AE80]  text-black"
              : "bg-transparent text-transparent cursor-not-allowed"
          } py-4 pl-10 pr-4  focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80]  ${
            isDarkMode
              ? " text-[#ffffff]  bg-[#FFFFFF21] "
              : " text-black bg-white placeholder-gray-500"
          }`}
          placeholder="Search Subcategories"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => category_id && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
          disabled={!category_id} // Disable input if category_id is missing
        />
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <ul
          className={`absolute top-[5rem] left-0 w-full bg-white border border-[#0046AE80] rounded-lg shadow-lg max-h-[30rem] overflow-y-auto z-10 
      ${isDarkMode ? "text-[#ffffff]" : "text-gray-700 bg-white"}`}
        >
          {filteredSubcategories && filteredSubcategories.length > 0 ? (
            filteredSubcategories.map((subcategory) => (
              <li
                key={subcategory.id}
                className="px-4 py-2 cursor-pointer font-poppins hover:bg-gray-200 text-black"
                onMouseDown={() => handleSelectSubCategory(subcategory)}
              >
                {subcategory.subcategory_name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-center text-gray-500">
              No subcategories found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SubCategoryListingDropdown;
