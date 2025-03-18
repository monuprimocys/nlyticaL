import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import location from "../../../../../public/assets/Image/locationicon.png";
import { useGetCountryApi } from "@/app/storeApp/api/usegetCountryApi";
import { setLocation } from "@/app/storeApp/Slice/locationSearchHomeSlice";
import { useAppSelector } from "@/app/hooks/hooks";

const ListingLocation: React.FC = () => {
  const dispatch = useDispatch();

  // Ensure sessionStorage is accessed only in the browser
  const extractedCity =
    typeof window !== "undefined"
      ? sessionStorage.getItem("recentLocation") || ""
      : "";

  // State management
  const [searchValue, setSearchValue] = useState<string>(extractedCity);
  const [recentSearch, setRecentSearch] = useState<string>(extractedCity);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // API call for country list based on input value
  const { data, refetch } = useGetCountryApi(searchValue);

  useEffect(() => {
    if (extractedCity) {
      setSearchValue(extractedCity);
      setRecentSearch(extractedCity);
      dispatch(setLocation(extractedCity));
    }
  }, [extractedCity, dispatch]);

  useEffect(() => {
    if (searchValue.trim().length > 0 && searchValue !== recentSearch) {
      refetch();
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchValue, refetch, recentSearch]);

  const handleSelectLocation = (location: string) => {
    setSearchValue(location);
    setRecentSearch(location);
    dispatch(setLocation(location));
    setShowDropdown(false);
    sessionStorage.setItem("recentLocation", location);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      // ✅ Clear sessionStorage and update Redux state when input is empty
      sessionStorage.removeItem("recentLocation");
      setRecentSearch(""); // Clear recent search state
      dispatch(setLocation("")); // Update Redux store
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full flex flex-col gap-1 relative">
      <div className="relative mt-2 flex items-center">
        <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center">
          <Image
            src={location}
            alt="Location Icon"
            className="h-[1.5rem] w-[1.5rem] object-cover"
          />
        </span>

        <input
          type="text"
          id="location"
          name="location"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className={`font-poppins w-full rounded-lg py-4 pl-10 placeholder-gray-500 focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80] ${
            isDarkMode
              ? "text-white border border-[#FFFFFF0A] bg-[#FFFFFF0A]"
              : "text-black bg-white border border-[#0046AE80]"
          }`}
          placeholder="Search Location"
          value={searchValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
      </div>

      {showDropdown && (data?.countriesList?.length ?? 0) > 0 && (
        <ul className="absolute top-[6rem] left-0 w-full bg-white rounded-lg shadow-lg h-fit max-h-[30rem] overflow-y-auto z-10 border border-[#0046AE80]">
          {data?.countriesList?.map((location: string, index: number) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer font-poppins hover:bg-gray-200 text-black"
              onMouseDown={() => handleSelectLocation(location)}
            >
              {location}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListingLocation;
