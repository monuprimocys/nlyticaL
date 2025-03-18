"use client";
import React, { useEffect } from "react";
import Card from "../componets/homesection/ServicesSection3/Card";
import Header from "../componets/Category/Header";
import { useGetCategoriesQuery } from "../storeApp/api/useGetCategory";
import { Categorydata } from "@/app/types/Restypes";
import AvatarWithSpinner from "../componets/Loading/AvatarWithSpinner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { setSelectedCategory } from "../storeApp/Slice/category/categorySlice";
import { useAppSelector } from "../hooks/hooks";
import Categories from "../componets/AllBreadCome/CategorisBreadCome/Categories";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";
import { setSelectedCategoryListing } from "../storeApp/Slice/Listing/CategoryLIstingSlice";

function Category() {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const router = useRouter();
  const dispatch = useDispatch(); // Initialize dispatch
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);
  // Access selected category from Redux store
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory
  );

  if (isLoading) {
    return (
      <div className="w-full justify-center items-center flex h-full">
        <AvatarWithSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching categories.</div>;
  }

  const categories = data?.data || [];

  // Handle category card click
  const handleCategoryClick = (category: Categorydata) => {
    // Dispatch only id and category_name to Redux store
    dispatch(
      setSelectedCategoryListing({
        id: category.id,
        category_name: category.category_name,
      }),

      sessionStorage.setItem("Category_Name", category.category_name),
      sessionStorage.setItem("Category_ID", category.id)
    );

    const serviceSlug = category.category_name
      .toLowerCase()
      .replace(/\s+/g, "-"); // Convert name to URL slug

    router.push(`category/${serviceSlug}`);
  };

  return (
    <div className={`w-full h-auto    ${isDarkMode ? "  bg-[#181818]" : ""}`}>
      <div>
        <Categories />
      </div>

      {/* All Categories */}
      <div className="mx-auto 2xl:w-[60%] xl:w-[80%] w-[95%]  grid grid-cols-2  md:flex md:flex-wrap     justify-items-center  md:justify-start md:items-center gap-4 mt-[4rem]">
        {categories.length > 0 ? (
          categories.map((category: Categorydata) => (
            <Card
              key={category.id}
              id={category.id}
              category_image={category.category_image}
              category_name={category.category_name}
              subcategories_count={category.subcategories_count}
              onClick={() => handleCategoryClick(category)} // Pass the full category object to the handler
            />
          ))
        ) : (
          <div>No categories available.</div>
        )}
      </div>
    </div>
  );
}

export default Category;
