"use client";
import React, { useEffect } from "react";
import { useTermAndconditionQuery } from "@/app/storeApp/api/termAndcondition";
import HeadingText from "@/app/componets/Profile/HeadingText";
import AvatarWithSpinner from "@/app/componets/Loading/AvatarWithSpinner";
import { useAppSelector } from "@/app/hooks/hooks";

function TermCondition() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const {
    data: termAndConditionData,
    isLoading,
    isError,
  } = useTermAndconditionQuery();

  // Handle loading and error states
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <AvatarWithSpinner />
      </div>
    );
  if (isError || !termAndConditionData)
    return <div>Error loading terms and conditions.</div>;

  // Extract the actual content from the data
  const content = termAndConditionData?.data[0]?.text;

  return (
    <div className="h-auto w-full py-[2rem]">
      {/* Heading */}
      <div>
        <HeadingText text="Terms and " text1="Condition" />
      </div>

      {/* Content */}
      <div className="mt-10 flex w-full flex-col items-center justify-start">
        {/* Heading and content */}
        <div className="mx-auto flex w-[90%] flex-col items-start justify-start gap-4 xl:w-full">
          <div
            className={`font-poppins text-lg font-normal   w-full    ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}

export default TermCondition;
