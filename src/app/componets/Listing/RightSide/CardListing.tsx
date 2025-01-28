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
import { useFilterMutation } from "@/app/store/api/filter";
import Cookies from "js-cookie";
import ListCard from "../../Category/SubCategeoryList/ListCard";
import AvatarWithSpinner from "../../Loading/AvatarWithSpinner";
import video from "../../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import { updateFilterDataListing } from "@/app/store/Slice/Listing/FilterListingSlice";
import { FcNext, FcPrevious } from "react-icons/fc";
import CurrentLocation from "../LeftSide/CurrentLocation";

// Your existing CardListing component
function CardListing() {
  const [viewType, setViewType] = useState("grid");
  const router = useRouter(); // Initialize useRouter
  const user_id = Cookies.get("user_id");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const { latitude, longitude, locationName, errorMessage } = useAppSelector(
    (state) => state.currentLocation
  );
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
  const statelocation = useAppSelector(
    (state) => state.SerachLocationSlice.selectedLocation
  );
  const state = statelocation ? statelocation.split(",")[0] : "";

  const dispatch = useDispatch();
  const filterslice = useAppSelector((state) => state.FilterListingSlice);
  const [filter, { data, error, isLoading }] = useFilterMutation();

 

  // Handle view type change
  const handleGridView = () => setViewType("grid");
  const handleListView = () => setViewType("list");

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

  // Handling the case when no data is found
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <AvatarWithSpinner />
      </div>
    );
  }

  if (!serviceFilter.length) {
    return (
      <div className="flex h-auto min-h-screen w-full flex-col items-center justify-center text-center">
        <div className="flex h-[8rem] w-[8rem] items-center justify-center">
          <Image src={video} alt="Loading animation" width={100} height={100} />
        </div>
        <h2 className="font-poppins font-medium text-black">No Data Found</h2>
      </div>
    );
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = serviceFilter.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(serviceFilter.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (serviceId) => {
    router.push(`/ServiceDetail/${serviceId}`); // Navigate to dynamic route
  };

  return (
    <div className="w-full h-auto">
      <div className="w-full justify-end items-center flex gap-3 mb-4">
        {/* View type selection */}
        <div className="flex justify-center items-center px-6 py-2 border-2 bordercard rounded-lg gap-2 cursor-pointer hover:bg-slate-200">
          <div className="w-[1rem] h-[1rem] flex justify-center items-center">
            <Image
              src={resetico}
              alt="Reset Filter"
              className="h-full w-full object-cover"
            />
          </div>
          <button
            className="font-poppins text-[#000000] font-[500]"
            onClick={handleGridView}
          >
            Reset Filter
          </button>
        </div>
        {/* Grid/List view buttons */}
        <div
          className={`flex justify-center items-center px-2 py-2 border-2 bordercardbtn rounded-lg gap-2 cursor-pointer hover:bg-slate-200 ${
            viewType === "grid" ? "bg-slate-300" : ""
          }`}
          onClick={handleGridView}
        >
          <div className="w-[1rem] h-[1rem] flex justify-center items-center">
            <Image
              src={cardlisticon}
              alt="Grid View Icon"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div
          className={`flex justify-center items-center px-2 py-2 border-2 bordercardbtn rounded-lg gap-2 cursor-pointer hover:bg-slate-200 ${
            viewType === "list" ? "bg-slate-300" : ""
          }`}
          onClick={handleListView}
        >
          <div className="w-[1rem] h-[1rem] flex justify-center items-center">
            <Image
              src={cardlisticon2}
              alt="List View Icon"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-full h-auto">
        {viewType === "grid" ? (
          <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Map through items and pass the handleCardClick function */}
            {currentItems.map((card, index) => (
              <div key={index}>
                <GridCard
                  service_images={{ src: card.service_images[0] }}
                  category={card.category_name}
                  avatar={card.image}
                  name={`${card.first_name} ${card.last_name || ""}`}
                  service_name={card.service_name}
                  reviews={card.total_review_count}
                  yearsInBusiness={card.published_year}
                  location={card.address}
                  priceRange={card.service_price || "N/A"}
                  featured={card.is_featured ? "Featured" : "Not Featured"}
                  rating={card.average_review_star}
                  isLike={card.isLike}
                  service_id={card.id}
                  onclicknavigate={() => handleCardClick(card.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-auto flex flex-col gap-6">
            {/* Map through items and pass the handleCardClick function */}
            {currentItems.map((card, index) => (
              <div key={index} onClick={() => handleCardClick(card.id)}>
                <ListCard
                  service_images={{ src: card.service_images[0] }}
                  category={card.category_name}
                  avatar={card.image}
                  name={`${card.first_name} ${card.last_name || ""}`}
                  service_name={card.service_name}
                  reviews={card.total_review_count}
                  yearsInBusiness={card.published_year}
                  location={card.address}
                  priceRange={card.service_price || "N/A"}
                  featured={card.is_featured ? "Featured" : "Not Featured"}
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
                  ? "bg-blue-500 text-white"
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
            <FcNext />
          </button>
        </div>
      </div>

      <div className="hidden">
        <CurrentLocation />
      </div>
    </div>
  );
}

export default CardListing;
