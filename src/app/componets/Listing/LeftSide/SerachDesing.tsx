// LeftSide.tsx

"use client";
import Image from "next/image";

import "../../Listing/style.css";
import { useAppSelector } from "@/app/hooks/hooks";

import { useEffect } from "react";
import { useFilterMutation } from "@/app/store/api/filter";
import { updateFilterData } from "@/app/store/Slice/category/filterSlice";
import { useDispatch } from "react-redux";
import CategoryDropdwonListing from "./CategoryDropdwonListing";
import SubCategoryListingDropdwon from "./SubCategoryListingDropdwon";
import PriceListing from "./PriceListing";
import TypesListing from "./TypesListing";
import RatingListing from "./RatingListing";
import ListingLocation from "./ListingLocation";
import LocationCategorySubCategoryDropdwon from "./LocationCategorySubCategoryDropdwon";
import SerchboxLIsting from "./SerchboxLIsting";

// Your LeftSide component
function SerachDesing() {
  const dispatch = useDispatch();
  const filterslice = useAppSelector((state) => state.filterSlice);

  const rating = useAppSelector((state) => state.rating.selectedRating);
  const price = useAppSelector((state) => state.price.price);

  const statelocation = useAppSelector(
    (state) => state.SerachLocationSlice.selectedLocation
  );
  const state = statelocation ? statelocation.split(",")[0] : "";

  console.log("my filter slice values are", filterslice);

  useEffect(() => {
    dispatch(
      updateFilterData({
        state: state,
        review_star: rating,
        price: price,
      })
    );
  }, [state, rating, price, dispatch]);

  const [filter, { data, error, isLoading }] = useFilterMutation();

  useEffect(() => {
    // Trigger the API call once the component mounts
    const fetchData = async () => {
      const filterData = {
        category_id: filterslice.category_id,
        price: price,
        review_star: filterslice.review_star,
        state: filterslice.state,
        subcategory_id: filterslice.subcategory_id,
        type: filterslice.type,
        user_id: filterslice.user_id,
      };

      // Call the mutation with the current filter data
      await filter(filterData);
    };

    fetchData();
  }, [filter, filterslice, price]); // Add `filterslice` as dependency

  useEffect(() => {
    // Log the response when data is available
    if (data) {
      console.log("API Response:", data);
    }

    // Optionally handle the error case
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [data, error]);

  return (
    <div className="w-full h-auto grid gap-6 grid-cols-1">
      {/* Search Box */}
      <div className="relative flex items-center">
        
        <SerchboxLIsting />
      </div>
      <div className="w-full h-auto grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-1">
        {/* Location Search */}
        <div className="w-full flex flex-col gap-6 h-auto border-color rounded-lg   p-5">
          <LocationCategorySubCategoryDropdwon />
        </div>

        {/* Price range */}
        <div className="w-full h-auto border-color rounded-lg flex flex-col p-6">
          <PriceListing />
        </div>

        {/* type */}
        <div className="border-color w-full rounded-lg ">
          <TypesListing />
        </div>

        {/* Rating */}
        <div className="border-color w-full rounded-lg">
          <RatingListing />
        </div>
      </div>
    </div>
  );
}

export default SerachDesing;
