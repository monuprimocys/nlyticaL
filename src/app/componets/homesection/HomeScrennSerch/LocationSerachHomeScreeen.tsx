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

  console.log("My current location:", currentLocation);

  if (currentLocation && typeof currentLocation === "string") {
    const locationParts = currentLocation.split(",").map((part) => part.trim());
    extractedCity =
      locationParts.length >= 3 ? locationParts[locationParts.length - 3] : "";
  }

  console.log("Extracted city:", extractedCity);

  const [searchValue, setSearchValue] = useState<string>("");
  const [recentSearch, setRecentSearch] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [useLatLon, setUseLatLon] = useState<boolean>(false);

  console.log(" my searchValue values ");

  const { data, refetch } = useGetCountryApi(
    searchValue,
    useLatLon ? latitude : undefined,
    useLatLon ? longitude : undefined
  );
  useEffect(() => {
    const storedLocation = sessionStorage.getItem("recentLocation");

    console.log(" my extractedCity ", extractedCity);

    if (!storedLocation) {
      sessionStorage.setItem("recentLocation", extractedCity);
    }

    setSearchValue(storedLocation || extractedCity);
  }, [extractedCity]);

  // useEffect(() => {
  //   if (!extractedCity) {
  //     setSearchValue("Ahmedabad");
  //     sessionStorage.setItem("recentLocation", "Ahmedabad");
  //   }
  // }, [extractedCity]);

  useEffect(() => {
    if (showDropdown && searchValue.trim() !== "") {
      refetch();
    }
  }, [showDropdown, searchValue, refetch]);

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
      setUseLatLon(true);
      setShowDropdown(true);
    } else {
      setUseLatLon(false);
    }
  };

  const handleFocus = () => {
    setUseLatLon(true);
    setShowDropdown(true);
    refetch();
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 10);
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const hnadaldetectcurrentLocation = () => {
    if (extractedCity) {
      setSearchValue(extractedCity);
      setRecentSearch(extractedCity);
      dispatch(setLocation(extractedCity));
      setShowDropdown(false);
      sessionStorage.setItem("recentLocation", extractedCity);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1 relative    bg-black">
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
          className={`font-poppins w-full rounded-lg py-3 pl-14 placeholder-gray-500 focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80] ${
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
          <div className="w-full justify-start items-start flex p-3">
            <div
              className="w-full flex gap-4 cursor-pointer"
              onMouseDown={hnadaldetectcurrentLocation}
            >
              <Image
                src={detectcurrentlocqationicon}
                alt="Detect Location Icon"
              />
              <p className="font-poppins text-[#0046AE]">Detect Location</p>
            </div>
          </div>

          {data?.countriesList?.length ? (
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
