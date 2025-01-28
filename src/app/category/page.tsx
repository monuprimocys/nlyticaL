"use client";

import React from "react";
import Card from "../componets/homesection/ServicesSection3/Card";
import Header from "../componets/Category/Header";
import { useGetCategoriesQuery } from "../store/api/useGetCategory";
import { Categorydata } from "@/app/types/Restypes";
import AvatarWithSpinner from "../componets/Loading/AvatarWithSpinner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import { setSelectedCategory } from "../store/Slice/category/categorySlice";
import { useAppSelector } from "../hooks/hooks";

function Category() {
  const { data, error, isLoading } = useGetCategoriesQuery();
  const router = useRouter();
  const dispatch = useDispatch(); // Initialize dispatch

  // Access selected category from Redux store
  const selectedCategory = useAppSelector(
    (state) => state.category.selectedCategory
  );
  console.log("Selected Category from Redux store:", selectedCategory);

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
      setSelectedCategory({
        id: category.id,
        category_name: category.category_name,
      })
    );
    router.push(`category/${category.id}`);
  };

  console.log("my category clicked on values", categories);

  return (
    <div className="w-full h-auto">
      <div>
        <Header />
      </div>

      {/* All Categories */}
      <div className="mx-auto 2xl:w-[60%] xl:w-[80%] w-[95%] grid xl:grid-cols-4 grid-cols-2 md:grid-cols-3 gap-4 mt-[4rem]">
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
