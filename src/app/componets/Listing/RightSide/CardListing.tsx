"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook
import "../../Listing/style.css";
import resetico from "../../../../../public/assets/Image/reseticon.png";
import Image from "next/image";
import cardlisticon from "../../../../../public/assets/Image/cardlist2.png";
import cardlisticon2 from "../../../../../public/assets/Image/cardlist3.png";
import GridCard from "../../Category/SubCategeoryList/GridCard";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import { useFilterMutation } from "@/app/storeApp/api/filter";
import Cookies from "js-cookie";
import ListCard from "../../Category/SubCategeoryList/ListCard";
import AvatarWithSpinner from "../../Loading/AvatarWithSpinner";
import video from "../../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import {
  clearfilterSliceListing,
  updateFilterDataListing,
} from "@/app/storeApp/Slice/Listing/FilterListingSlice";
import { FcNext, FcPrevious } from "react-icons/fc";
import CurrentLocation from "../LeftSide/CurrentLocation";
import { setSelectedCategoryListing } from "@/app/storeApp/Slice/Listing/CategoryLIstingSlice";
import { clearSearchLocationCategory } from "@/app/storeApp/Slice/category/SerachLocationSlice";
import { setselectedSubCategoryListing } from "@/app/storeApp/Slice/Listing/SubCategoryListing";
import { clearPriceListing } from "@/app/storeApp/Slice/Listing/PriceSliceListing";
import { clearRatingListing } from "@/app/storeApp/Slice/Listing/RatingSliceListing";
import { clearSearchQuery } from "@/app/storeApp/Slice/Listing/searchSlice";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";
import { clearSelectedSubCategory } from "@/app/storeApp/Slice/category/subcategorySlice";

// Your existing CardListing component
function CardListing() {
  const [viewType, setViewType] = useState("grid");
  const router = useRouter(); // Initialize useRouter
  const user_id = Cookies.get("user_id");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const searchQuery = useSelector(
    (state: { search: { query: string } }) => state.search.query
  );

  const categoeryListing = useAppSelector(
    (state) => state.categoryListing.selectedCategoryListing.id
  );

  const subcategory_id = useAppSelector(
    (state) => state.SubCategoryListing.selectedSubCategoryListing.id
  );

  const selectedratingalues = useAppSelector(
    (state) => state.RatingSliceListing.selectedRating
  );

  const price = useAppSelector((state) => state.PriceSliceListing.price);

  const dispatch = useDispatch();
  const filterslice = useAppSelector((state) => state.FilterListingSlice);
  const [filter, { data, error, isLoading }] = useFilterMutation();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  console.log(" my api responce data ", data);

  // Handle view type change
  const handleGridView = () => setViewType("grid");
  const handleListView = () => setViewType("list");
  const state = useAppSelector(
    (state) => state.locationSearchHome.selectedLocation
  );

  useEffect(() => {
    dispatch(
      updateFilterDataListing({
        category_id: categoeryListing,
        subcategory_id: subcategory_id,
        state: state,
        review_star: selectedratingalues,
        price: price,
        service_name: searchQuery,
      })
    );
  }, [
    state,
    selectedratingalues,
    price,
    categoeryListing,
    subcategory_id,
    dispatch,
    searchQuery,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const filterData = {
        category_id: filterslice.category_id,
        price: price,
        review_star: filterslice.review_star,
        state: filterslice.state,
        subcategory_id: filterslice.subcategory_id,
        type: filterslice.type,
        user_id: user_id,
        service_name: filterslice.service_name, // Ensure this is included
      };

      // Make sure to fetch only if there's data to send
      await filter(filterData);
    };

    fetchData();
  }, [filter, filterslice, price, user_id, searchQuery]);

  const serviceFilter = data?.serviceFilter || [];

  console.log(" my filter responce ", serviceFilter[0]?.price_range);

  // Handling the case when no data is found
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <AvatarWithSpinner />
      </div>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = serviceFilter.slice(indexOfFirstItem, indexOfLastItem);

  console.log(" my all item values found", currentItems);

  const totalPages = Math.ceil(serviceFilter.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (serviceId, serviceName) => {
    if (!serviceId || !serviceName) {
      console.error("Invalid serviceId or serviceName");
      return;
    }

    const encodedServiceId = encodeString(String(serviceId)); // Ensure serviceId is a string
    const serviceSlug = serviceName.toLowerCase().replace(/\s+/g, "-"); // Convert name to URL slug

    console.log("Encoded Service ID:", encodedServiceId);

    // Navigate to the encoded route
    router.push(`/stores/${serviceSlug}/${encodedServiceId}`);

    serviceId = decodeString(encodedServiceId);

    // Store in sessionStorage for later use
    sessionStorage.setItem("serviceId", serviceId);
  };

  const type = localStorage.getItem("type");

  console.log("  my type values ", type);

  const handalreset = () => {
    dispatch(clearfilterSliceListing());
    dispatch(setSelectedCategoryListing({ id: null, category_name: "" }));
    dispatch(clearSearchLocationCategory());
    sessionStorage.removeItem("city");
    sessionStorage.removeItem("lat");
    sessionStorage.removeItem("lng");
    sessionStorage.removeItem("Category_Name");
    sessionStorage.removeItem("Category_ID");
    sessionStorage.removeItem("subcategories_id");
    sessionStorage.removeItem("subcategory_name");
    dispatch(setselectedSubCategoryListing({ id: null, subcategory_name: "" }));
    dispatch(clearPriceListing());
    dispatch(clearRatingListing());
    dispatch(clearSearchQuery());
    dispatch(clearSelectedSubCategory());
  };

  return (
    <div className="w-full h-auto ">
      <div className="w-full justify-end items-center flex gap-3 mb-4">
        {/* View type selection */}
        <div
          className={`flex justify-center items-center px-6 py-2 border-2  rounded-lg gap-2 cursor-pointer   ${
            isDarkMode
              ? "text-white   hover:bg-zinc-600"
              : "text-black   hover:bg-slate-200  bordercard"
          }`}
        >
          <div className="w-[1rem] h-[1rem] flex justify-center items-center">
            <Image
              src={resetico}
              alt="Reset Filter"
              className={`h-full w-full object-cover   ${
                isDarkMode ? "bg-circle-icon" : ""
              }`}
            />
          </div>
          <button className="font-poppins  font-[500]" onClick={handalreset}>
            Reset Filter
          </button>
        </div>
        {/* Grid/List view buttons */}
        <div
          className={`flex justify-center items-center px-2 py-2 border-2  rounded-lg gap-2 cursor-pointer ${
            viewType === "grid" ? "bg-slate-300" : ""
          }
          
           ${
             isDarkMode
               ? "text-white   hover:bg-zinc-600"
               : "text-black   hover:bg-slate-200  bordercard"
           }
          
          `}
          onClick={handleGridView}
        >
          <div className="w-[1rem] h-[1rem] flex justify-center items-center">
            <Image
              src={cardlisticon}
              alt="Grid View Icon"
              className={`h-full w-full object-cover   ${
                isDarkMode ? "bg-circle-icon" : ""
              }`}
            />
          </div>
        </div>
        <div
          className={`flex justify-center items-center px-2 py-2 border-2  rounded-lg gap-2 cursor-pointer hover:bg-slate-200 ${
            viewType === "list" ? "bg-slate-300" : ""
          }
          ${
            isDarkMode
              ? "text-white   hover:bg-zinc-600"
              : "text-black   hover:bg-slate-200  bordercard"
          }
          
          
          `}
          onClick={handleListView}
        >
          <div className="w-[1rem] h-[1rem] flex justify-center items-center">
            <Image
              src={cardlisticon2}
              alt="List View Icon"
              className={`h-full w-full object-cover   ${
                isDarkMode ? "bg-circle-icon" : ""
              }`}
            />
          </div>
        </div>
      </div>

      {serviceFilter.length === 0 ? (
        <div className="flex h-auto min-h-screen w-full flex-col items-center justify-center text-center">
          <div className="flex h-[8rem] w-[8rem] items-center justify-center">
            <Image
              src={video}
              alt="Loading animation"
              width={100}
              height={100}
            />
          </div>
          <h2
            className={`font-poppins font-medium   ${
              isDarkMode ? " text-white" : "text-black"
            } text-center text-lg sm:text-xl md:text-2xl"
        }`}
          >
            No Data Found
          </h2>
        </div>
      ) : (
        <div className="w-full h-auto">
          {viewType === "grid" ? (
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentItems.map((card, index) => (
                <GridCard
                  key={index}
                  service_images={{ src: card.service_images[0] }}
                  category={card.category_name}
                  avatar={card.image}
                  name={`${card.first_name} ${card.last_name || ""}`}
                  service_name={card.service_name}
                  reviews={card.total_review_count}
                  yearsInBusiness={card.published_year}
                  location={card.address}
                  priceRange={card.price_range}
                  featured={card.is_featured ? "sponosor" : "Not Featured"}
                  rating={card.average_review_star}
                  isLike={card.isLike}
                  service_id={card.id}
                  onclicknavigate={() =>
                    handleCardClick(card.id, card.service_name)
                  }
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-auto flex flex-col gap-6">
              {currentItems.map((card, index) => (
                <div
                  key={index}
                  onClick={() => handleCardClick(card.id, card.service_name)}
                >
                  <ListCard
                    service_images={{ src: card.service_images[0] }}
                    category={card.category_name}
                    avatar={card.image}
                    name={`${card.first_name} ${card.last_name || ""}`}
                    service_name={card.service_name}
                    reviews={card.total_review_count}
                    yearsInBusiness={card.published_year}
                    location={card.address}
                    priceRange={card.price_range}
                    featured={card.is_featured ? "sponosor " : "Not Featured"}
                    rating={card.average_review_star}
                    isLike={card.isLike}
                    service_id={card.id}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Pagination controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-md mr-2"
            >
              <FcPrevious />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 ${
                  currentPage === index + 1
                    ? "bg-[#0046AE] text-white"
                    : "bg-gray-200"
                } rounded-md mx-1`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-md ml-2"
            >
              <FcNext className=" text-[#0046AE]" />
            </button>
          </div>
        </div>
      )}

      <div className="hidden">
        <CurrentLocation />
      </div>
    </div>
  );
}

export default CardListing;
