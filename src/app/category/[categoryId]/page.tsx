"use client";
import React from "react";
import { useGetSubCategoriesQuery } from "@/app/store/api/useGetAllSubCategory";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import SubCategoryCard from "@/app/componets/SubCategory/SubCategoryCard";
import { usePathname, useRouter } from "next/navigation";
import { SubCategoryData } from "@/app/types/Restypes";
import Header from "@/app/componets/Category/Header";
import { useDispatch } from "react-redux";
import { setselectedSubCategory } from "@/app/store/Slice/category/subcategorySlice";
import { useAppSelector } from "@/app/hooks/hooks";
import video from "../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import Image from "next/image";
import SubcategoryBreadCome from "@/app/componets/AllBreadCome/CategorisBreadCome/SubcategoryBreadCome";

function Category() {
  const router = useRouter();
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop();
  const dispatch = useDispatch(); // Initialize dispatch

  const selectedCategory = useAppSelector(
    (state) => state.subcategory.selectedSubCategory
  );

  console.log(" my sub category detail", selectedCategory);

  const { data, error, isLoading } = useGetSubCategoriesQuery({
    category_id: lastSegment || "",
  });

  if (isLoading) {
    return (
      <div className="w-full justify-center items-center flex h-full">
        <AvatarWithSpinner />
      </div>
    );
  }

  if (error) {
    const errorMessage =
      (error as { message?: string }).message || "Error loading subcategories";
    return (
      <div className="text-red-500 p-4 border border-red-500 rounded-md">
        {errorMessage}
      </div>
    );
  }

  // Handle category card click
  const handleCategoryClick = (subCategory: SubCategoryData) => {
    // Dispatch the action to store the selected subcategory
    dispatch(
      setselectedSubCategory({
        id: subCategory.id,
        subcategory_name: subCategory.subcategory_name,
      }),
      sessionStorage.setItem("subcategory_name", subCategory.subcategory_name),
      sessionStorage.setItem("subid", subCategory.id)
    );

    // Navigate to the detail page
    router.push(`subcategorydetail/${subCategory.id}`);
  };

  if (!data?.subCategoryData?.length) {
    return (
      <div className="w-full h-auto">
        <SubcategoryBreadCome />
        <div className="flex h-auto min-h-screen w-full flex-col items-center justify-center text-center">
          <div className="flex h-[8rem] w-[8rem] items-center justify-center">
            <Image
              src={video}
              alt="Loading animation"
              width={100}
              height={100}
            />
          </div>
          <h2 className={`font-poppins font-medium text-black`}>
            No Data Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto">
      <SubcategoryBreadCome />
      <div className="mx-auto 2xl:w-[60%] xl:w-[80%] w-[95%] grid gap-4 mt-[4rem]">
        {data?.subCategoryData?.map((subCategory: SubCategoryData) => (
          <SubCategoryCard
            key={subCategory.id}
            id={subCategory.id}
            subcategory_name={subCategory.subcategory_name}
            subcategory_image={subCategory.subcategory_image}
            services_count={subCategory.services_count}
            category_id={subCategory.category_id}
            onClick={() => handleCategoryClick(subCategory)} // Pass the full subCategory object
          />
        ))}
      </div>
    </div>
  );
}

export default Category;
