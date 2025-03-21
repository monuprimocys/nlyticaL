"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import dropdown from "../../../../../public/assets/Image/category-2.png";
import { useGetCategoriesQuery } from "@/app/storeApp/api/useGetCategory";
import { setSelectedCategoryListing } from "@/app/storeApp/Slice/Listing/CategoryLIstingSlice";
import { useAppSelector } from "@/app/hooks/hooks";

const CategoryDropdownListing: React.FC = () => {
  const dispatch = useDispatch();
  const { data } = useGetCategoriesQuery();
  const categories = data?.data || [];

  const [searchValue, setSearchValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const selectedCategory = useAppSelector(
    (state) => state.categoryListing.selectedCategoryListing
  );

  console.log("Updated slice values:", selectedCategory);

  // Sync local state when Redux slice updates
  useEffect(() => {
    if (selectedCategory?.id) {
      setSearchValue(selectedCategory.category_name);
    } else {
      setSearchValue("");
    }
  }, [selectedCategory]); // Runs only when Redux state updates

  // Handle category selection
  const handleSelectCategory = (category) => {
    dispatch(
      setSelectedCategoryListing({
        id: category.id.toString(),
        category_name: category.category_name,
      })
    );
    setShowDropdown(false);
  };

  // Clear input and reset Redux state
  const handleClearCategory = () => {
    dispatch(setSelectedCategoryListing({ id: null, category_name: "" }));
    sessionStorage.removeItem("subcategories_id");
    sessionStorage.removeItem("subcategory_name");
    sessionStorage.removeItem("Category_ID");
    sessionStorage.removeItem("Category_Name");
  };

  return (
    <div className="w-full flex flex-col h-full gap-1 relative">
      <div className="relative mt-2 flex items-center">
        <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center">
          <Image
            src={dropdown}
            alt="Dropdown Icon"
            className={`h-[1rem] w-[1rem] opacity-[50%] ${
              isDarkMode ? "bg-circle-icon" : ""
            }`}
          />
        </span>
        <input
          type="text"
          id="category"
          name="category"
          className={`font-poppins w-full rounded-lg py-4 pl-10 placeholder-gray-500 focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80] ${
            isDarkMode
              ? "text-white border border-[#FFFFFF0A] bg-[#FFFFFF0A]"
              : "text-black bg-white border border-[#0046AE80]"
          }`}
          placeholder="Search Category"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
          autoComplete="off"
        />
        {searchValue && (
          <button
            className="absolute right-3 text-[#0046AE]"
            onClick={handleClearCategory}
          >
            ✖
          </button>
        )}
      </div>
      {showDropdown && (
        <ul className="absolute top-[5rem] left-0 w-full bg-white border font-poppins border-[#DBDBDB] rounded-lg shadow-lg max-h-[30rem] overflow-y-auto z-10">
          {categories.length > 0 ? (
            categories
              .filter((cat) =>
                cat.category_name
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              )
              .map((categoryItem) => (
                <li
                  key={categoryItem.id}
                  className="px-4 py-2 cursor-pointer font-poppins hover:bg-gray-200 text-black"
                  onMouseDown={() => handleSelectCategory(categoryItem)}
                >
                  {categoryItem.category_name}
                </li>
              ))
          ) : (
            <li className="px-4 py-2 text-gray-500 font-poppins text-center">
              Category Not Found
            </li>
          )}

          {/* Show "Category Not Found" if no matches after filtering */}
          {categories.length > 0 &&
            categories.filter((cat) =>
              cat.category_name
                .toLowerCase()
                .includes(searchValue.toLowerCase())
            ).length === 0 && (
              <li className="px-4 py-2 text-gray-500 font-poppins text-center">
                Category Not Found
              </li>
            )}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdownListing;
