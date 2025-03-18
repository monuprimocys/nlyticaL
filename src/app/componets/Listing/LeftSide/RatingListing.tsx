import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setSelectedRatingListing } from "@/app/storeApp/Slice/Listing/RatingSliceListing";
import React, { useState, useEffect } from "react";
import { IoStarOutline, IoClose } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

const RatingListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedRatingFromStore = useAppSelector(
    (state) => state.RatingSliceListing.selectedRating
  );

  console.log("My selected rating: " + selectedRatingFromStore);

  const [rating, setRating] = useState<boolean>(true);

  // Sync local state with Redux store
  useEffect(() => {
    setSelectedRatingListing(selectedRatingFromStore);
  }, [selectedRatingFromStore]);

  const togglerating = () => {
    setRating((prevState) => !prevState);
  };

  const handleRatingSelect = (ratingValue: number) => {
    // Dispatch selected rating to Redux store
    dispatch(setSelectedRatingListing(ratingValue));
  };

  const handleClearRating = () => {
    // Dispatch clearing the selected rating to Redux store
    dispatch(setSelectedRatingListing(0));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div>
      <div
        className={`btnshadow w-full flex justify-between items-center h-auto p-4 shadow-lg rounded-xl   ${
          isDarkMode
            ? "bg-[#FFFFFF21] text-[#ffffff]"
            : "bg-[#ffffff] text-[#000000]"
        }`}
      >
        <div className="flex items-center justify-start gap-3">
          <IoStarOutline className="text-lg" />
          <div>
            <h6
              className={`font-poppins  font-normal  ${
                isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
              }`}
            >
              Rating
            </h6>
          </div>
        </div>

        {/* Icon dropdown */}
        <div onClick={togglerating}>
          <MdKeyboardArrowRight
            className={`rotate-${
              rating ? "90" : "0"
            } text-2xl text-[#000000] cursor-pointer transition-transform duration-300
            
              ${isDarkMode ? "text-[#ffffff]" : "text-[#000000]"}
            
            
            `}
          />
        </div>
      </div>

      {/* Dropdown Inputs */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden flex flex-col  px-6 ${
          rating ? "max-h-[400px] py-4 " : "max-h-0"
        }`}
        style={{ transitionProperty: "max-height" }}
      >
        {[5, 4, 3, 2, 1].map((value) => (
          <div
            key={value}
            onClick={() => handleRatingSelect(value)}
            className={`flex w-full px-3 py-4 rounded-lg items-center gap-3 cursor-pointer ${
              selectedRatingFromStore === value ? "typeborder text-black" : ""
            }`}
          >
            {/* Circle left side */}
            <div
              className={`h-4 w-4 rounded-full p-[2px] flex justify-center items-center ${
                selectedRatingFromStore === value
                  ? "circlbordercolor"
                  : " circlbordercolor"
              }`}
            >
              <div
                className={`h-full w-full rounded-full ${
                  selectedRatingFromStore === value ? "bg-[#0046AE]" : ""
                }`}
              ></div>
            </div>

            <div className="">
              <h4
                className={`font-poppins text-lg ${
                  selectedRatingFromStore === value
                    ? "font-medium"
                    : "font-normal"
                }
                ${
                  isDarkMode
                   ? "text-[#ffffff]"
                    : "text-[#000000]"
                }
                
                `}
              >
                {value} Star
              </h4>
            </div>

            {/* Show cross icon next to selected rating within the dropdown */}
            {selectedRatingFromStore === value && (
              <div
                className={`cursor-pointer  ml-auto   ${
                  isDarkMode ? "text-[#ffffff]" : "text-[#0046AE]"
                }`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent dropdown from toggling
                  handleClearRating();
                }}
              >
                <IoClose className="text-xl" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingListing;
