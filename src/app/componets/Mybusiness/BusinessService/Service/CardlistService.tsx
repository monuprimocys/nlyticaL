"use client";

import React, { useEffect, useState } from "react";
import CardDesignBusiness from "./CardDesignBusiness";
import { useStoreListApi } from "@/app/store/api/usestorelist";
import Cookies from "js-cookie";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import { FcNext, FcPrevious } from "react-icons/fc";
import { useAppSelector } from "@/app/hooks/hooks";

function CardlistService() {
  const service_id = Cookies.get("service_id");

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Local state to manage API loading, error, fetched data, and pagination
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch store list via the custom API hook
  const { data, isLoading, refetch } = useStoreListApi(service_id);

  // Use effect to trigger the API call only once after the page loads
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (service_id) {
          await refetch(); // Call the API to fetch store list
        } else {
          throw new Error("Service ID is missing");
        }
      } catch (err) {
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Trigger fetch on component mount
  }, [service_id, refetch]);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <AvatarWithSpinner />
      </div>
    );
  }

  if (error) {
    return <div>{`Error: ${error}`}</div>;
  }

  // Check if the store list is empty
  if (data?.StoreList?.length === 0) {
    return (
      <div
        className={`flex items-center justify-center h-full w-full  ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        <span>No data found for the given service ID</span>
      </div>
    );
  }

  // Calculate the index of the first and last store for the current page
  const indexOfLastStore = currentPage * itemsPerPage;
  const indexOfFirstStore = indexOfLastStore - itemsPerPage;
  const currentStores = data?.StoreList?.slice(
    indexOfFirstStore,
    indexOfLastStore
  );

  // Pagination logic
  const totalPages = Math.ceil(data?.StoreList?.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className=" w-full flex flex-col">
      <div className="w-full grid md:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-6 h-auto">
        {currentStores?.map((store) => {
          // Get the first image and avatar (assuming there's one image and avatar per store)
          const mainImage = store.store_images[0]?.url || ""; // Fallback to an empty string if no image is found

          return (
            <CardDesignBusiness
              key={store.id}
              name={store.vendor_details.first_name}
              store_name={store.store_name}
              store_description={store.store_description}
              priceRange={`$${store.price}`}
              mainImage={mainImage}
              avatar={store.vendor_details.image}
              store_id={store.id}
            />
          );
        })}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md mr-2 hover:bg-gray-300"
        >
          <FcPrevious />
        </button>
        <span className={`px-4 py-2  font-poppins  ${
          isDarkMode? "text-white" : "text-gray-800"
        } `}>{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md ml-2 hover:bg-gray-300"
        >
          <FcNext />
        </button>
      </div>
    </div>
  );
}

export default CardlistService;
