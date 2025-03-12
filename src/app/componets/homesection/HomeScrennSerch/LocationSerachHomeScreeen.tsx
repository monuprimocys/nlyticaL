import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import location from "../../../../../public/assets/Image/locationicon.png";
import { useGetCountryApi } from "@/app/storeApp/api/usegetCountryApi";
import { setLocation } from "@/app/storeApp/Slice/locationSearchHomeSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import Currentlocation from "@/app/AddPost/BusinessDetail/BusinessDetailForm/Currentlocation";
import detectcurrentlocqationicon from "../../../../../public/assets/Image/search_locat_icon.svg";

const LocationSearchHomeScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { latitude, longitude, locationName } = useAppSelector(
    (state) => state.currentLocation
  );

  const currentLocation = locationName ?? "";
  let extractedCity = "";

  if (currentLocation && typeof currentLocation === "string") {
    const locationParts = currentLocation.split(",").map((part) => part.trim());

    // Get the third last value
    extractedCity =
      locationParts.length >= 3 ? locationParts[locationParts.length - 3] : "";
  }

  console.log("Extracted City:", extractedCity);

  const [searchValue, setSearchValue] = useState<string>("");
  const [recentSearch, setRecentSearch] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [useLatLon, setUseLatLon] = useState<boolean>(false); // New state to toggle lat/lon API call

  //  input box default values current location

  const { data, refetch } = useGetCountryApi(
    searchValue,
    useLatLon ? latitude : undefined,
    useLatLon ? longitude : undefined
  );

  useEffect(() => {
    setSearchValue(extractedCity);
  }, [extractedCity]);

  // 🔹 Show dropdown when the user types (not for default value)
  useEffect(() => {
    if (searchValue.trim() !== "" && searchValue !== extractedCity) {
      setShowDropdown(true);
      refetch();
    } else {
      setShowDropdown(false);
    }
  }, [searchValue, extractedCity, refetch]);

  useEffect(() => {
    if (
      searchValue.trim() === "" ||
      (searchValue.trim().length > 0 && searchValue !== recentSearch)
    ) {
      refetch();
      setShowDropdown(true);
    }
  }, [searchValue, refetch, recentSearch]);

  const handleSelectLocation = (location: string) => {
    setSearchValue(location);
    setRecentSearch(location);
    dispatch(setLocation(location));
    setShowDropdown(false);
    localStorage.setItem("recentLocation", location);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setUseLatLon(true); // Use lat/lon when search is empty
    } else {
      setUseLatLon(false); // Use search value
    }
    setShowDropdown(true);
  };

  useEffect(() => {
    if (latitude && longitude) {
      setUseLatLon(true); // Ensure lat/lon are used
      refetch();
    }
  }, [latitude, longitude, refetch]);

  const handleFocus = () => {
    setUseLatLon(true); // Ensure lat/lon are used when input is focused
    setShowDropdown(true);
    refetch();
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 10);
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    dispatch(setLocation(searchValue));
  }, [searchValue, dispatch]);

  useEffect(() => {
    setShowDropdown(false);
  }, []);

  console.log("extractedCity@@@@@@@@!!!!!!!!!!!!!!!!", extractedCity);

  const hnadaldetectcurrentLocation = () => {
    if (extractedCity) {
      setSearchValue(extractedCity);
      setRecentSearch(extractedCity);
      dispatch(setLocation(extractedCity));
      setShowDropdown(false);
      localStorage.setItem("recentLocation", extractedCity); // Save recent selection
    }
  };

  return (
    <div className="w-full flex flex-col gap-1 relative">
      <label
        className={`font-poppins text-sm font-semibold ${
          isDarkMode ? "text-white" : "text-black"
        }`}
        htmlFor="location"
      >
        Location
      </label>

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
          className={`font-poppins w-full rounded-lg py-4 pl-14 placeholder-gray-500 focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80] ${
            isDarkMode
              ? "text-white border border-[#FFFFFF0A] bg-[#FFFFFF0A]"
              : "text-black bg-white border border-[#0046AE80]"
          }`}
          placeholder="Search Location"
          value={searchValue}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      {showDropdown && (
        <ul className="absolute top-[6rem] left-0 w-full bg-white rounded-lg shadow-lg min-w-[30rem] h-fit max-h-[30rem] overflow-y-auto z-10 border border-[#0046AE80]">
          {/* Detect current location */}
          <div className="w-full justify-start items-start flex p-3">
            <div
              className="w-full flex gap-4 cursor-pointer"
              onMouseDown={hnadaldetectcurrentLocation} // Use onMouseDown to avoid blur event issues
            >
              <Image
                src={detectcurrentlocqationicon}
                alt="Detect Location Icon"
              />
              <p className="font-poppins text-[#0046AE]">Detect Location</p>
            </div>
          </div>

          {/* Show locations if available, otherwise show "Location Not Found" */}
          {data?.countriesList?.length > 0 ? (
            data.countriesList.map((location: string, index: number) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer font-poppins hover:bg-gray-200 text-black"
                onMouseDown={() => handleSelectLocation(location)}
              >
                {location}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 font-poppins text-center">
              Location Not Found
            </li>
          )}
        </ul>
      )}

      <div className="hidden">
        <Currentlocation />
      </div>
    </div>
  );
};

export default LocationSearchHomeScreen;
