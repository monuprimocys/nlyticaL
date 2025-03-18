"use client";
import HeadingText from "@/app/componets/Profile/HeadingText";
import MyreviewCard from "@/app/componets/Profile/Myreview/MyreviewCard";
import React, { useEffect, useState, useCallback } from "react";
import { useGetAllReviewQuery } from "@/app/storeApp/api/reviewApi/userreviewlist";
import Cookies from "js-cookie";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { useGetReview } from "@/app/storeApp/api/useGetReview";
import video from "../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";

function Myreview() {
  const user_id = Cookies.get("user_id");
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const { data, isLoading, error, refetch: refetreviewlist } = useGetReview();

  // Memoized refetch to prevent unnecessary re-renders
  const refetchReviews = useCallback(() => {
    refetreviewlist();
  }, [refetreviewlist]);

  useEffect(() => {
    refetchReviews();
  }, [refetchReviews]);

  // State for pagination
  const [page, setPage] = useState(1);
  const pageSize = 6; // 6 cards per page

  // Log API response
  useEffect(() => {
    if (data) {
      console.log("Updated API Data:");
    }
  }, [data]);

  useEffect(() => {
    refetreviewlist(); // Force API call when page changes
  }, [page, refetreviewlist]);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="w-full">
        <AvatarWithSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching reviews</div>;
  }

  // Ensure correct totalPages calculation
  const totalPages = Math.ceil(data?.totalReviews / pageSize);
  const currentReviews = data?.reviewlist || [];

  console.log(" my    total reviews  count: ", currentReviews.length);

  const handleCardClick = (id) => {
    Cookies.set("reviewid", id);
  };

  return (
    <div className="h-full w-full py-[2rem]">
      <HeadingText text="My" text1="Review" />
      {currentReviews.length === 0 ? (
        <div className="flex  h-full  w-full flex-col items-center justify-center text-center">
          <div className="flex h-[8rem] w-[8rem] items-center justify-center">
            <Image
              src="/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif"
              alt="Loading animation"
              width={100}
              height={100}
            />
          </div>
          <h2
            className={`font-poppins font-medium ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            No Data Found
          </h2>
        </div>
      ) : (
        <div>
          <div className="mt-[3rem] grid w-full px-3 xl:px-0 grid-cols-1 md:grid-cols-2 gap-6">
            {currentReviews.map((review) => (
              <MyreviewCard
                key={review.id}
                review={review}
                onClick={() => handleCardClick(review.id)}
              />
            ))}
          </div>
          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
}

export default Myreview;
