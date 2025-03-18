"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import searchnormalicon from "../../../../../public/assets/Image/search-normal12.png";
import { useGetCountryCategoryApi } from "@/app/storeApp/api/useGetCountryCategoryApi";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Currentlocation from "@/app/AddPost/BusinessDetail/BusinessDetailForm/Currentlocation";
import { useRouter } from "next/navigation";
import { MdOutlineStar } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { setSelectedCategoryListing } from "@/app/storeApp/Slice/Listing/CategoryLIstingSlice";

interface Category {
  id: number;
  category_name: string;
}

interface Service {
  service_id: number;
  service_name: string;
  area: string;
  distance_km: string;
  service_images: string[];
  avg_rating?: number;
  review_count?: number;
}

const MAX_RECENT_SEARCHES = 5;

const CategorySearchHomeScreen: React.FC = () => {
  const { latitude, longitude } = useAppSelector(
    (state) => state.currentLocation
  );

  const dispatch = useAppDispatch();

  const dropdownRef = useRef<HTMLDivElement>(null);
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const value = useAppSelector((state) => state.locationSearchHome);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const router = useRouter();

  const lat = latitude || "";
  const lon = longitude || "";

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedSearches);
  }, []);

  const handleClearLocalStorageValues = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem("recentSearches");
    setRecentSearches([]);
  };

  const { data, refetch } = useGetCountryCategoryApi(
    value.selectedLocation,
    searchValue,
    lat,
    lon
  );

  useEffect(() => {
    if (value.selectedLocation) {
      refetch();
    }
  }, [value.selectedLocation, refetch, data]);

  useEffect(() => {
    refetch();
  }, [searchValue, refetch]);

  const defaultCategories = data?.categories ?? [];

  // Function to filter categories by name
  const filteredCategories = (data?.categoriesList ?? []).filter(
    (category: Category) =>
      category.category_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  console.log(" my defaultCategories 1212121212 ", filteredCategories);

  const filteredServices = (data?.servicesList ?? []).filter(
    (service: Service) =>
      service.service_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const saveRecentSearch = (value: string) => {
    if (!value.trim()) return;
    let updatedSearches = [value, ...recentSearches.filter((s) => s !== value)];
    if (updatedSearches.length > MAX_RECENT_SEARCHES) {
      updatedSearches = updatedSearches.slice(0, MAX_RECENT_SEARCHES);
    }
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleSelectSearch = (value: string, id: string) => {
    const selectedCategory = { id, category_name: value };
    dispatch(setSelectedCategoryListing(selectedCategory));

    sessionStorage.setItem("Category_Name", value);
    sessionStorage.setItem("Category_ID", id);
    sessionStorage.removeItem("subcategory_name");
    sessionStorage.removeItem("subcategories_id");

    router.push("/store");
  };

  const handleDeleteSearch = (
    e: React.MouseEvent<HTMLSpanElement>,
    searchToDelete: string
  ) => {
    e.stopPropagation();
    e.preventDefault();

    const updatedSearches = recentSearches.filter(
      (search) => search !== searchToDelete
    );

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget?.classList.contains("dropdown-menu")) {
      saveRecentSearch(searchValue);
      setTimeout(() => setShowDropdown(false), 100);
    }
  };

  console.log(" my filter values ", filteredServices);

  return (
    <div className="w-full flex flex-col gap-1 relative">
      <label
        className={`font-poppins text-sm font-semibold ${
          isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
        }`}
        htmlFor="category"
      >
        Search
      </label>

      <div className="relative mt-2 flex items-center">
        <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full">
          <Image
            src={searchnormalicon}
            alt="Search Icon"
            className="h-[1.1rem] w-[1.1rem] object-cover"
          />
        </span>
        <input
          type="text"
          id="category"
          name="category"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className={`font-poppins w-full rounded-lg py-3 pl-14 placeholder-gray-500 focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80] ${
            isDarkMode
              ? "text-[#ffffff] border border-[#FFFFFF0A] bg-[#FFFFFF0A]"
              : "text-[#000000] bg-white border border-[#0046AE80]"
          }`}
          placeholder="Search for Category or Service"
          value={searchValue.toLowerCase()} // Ensures input is always in uppercase
          onChange={(e) => {
            setSearchValue(e.target.value.toUpperCase()); // Convert input to uppercase
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleBlur}
        />
      </div>
      {showDropdown && (
        <ul
          className={`dropdown-menu  absolute top-[6rem] left-0   w-full bg-white rounded-lg shadow-lg max-h-[30rem] overflow-y-auto z-10 
    ${searchValue.trim() !== "" ? "border border-[#0046AE80]" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          tabIndex={-1}
        >
          {recentSearches.length > 0 && (
            <>
              <li className="px-4 py-2 font-poppins text-sm flex justify-between items-center text-gray-600 border-b">
                <span>Recent Searches</span>
                <button
                  className="text-blue-400 cursor-pointer"
                  onClick={handleClearLocalStorageValues}
                >
                  Clear All
                </button>
              </li>
              {recentSearches.map((search, index) => (
                <li
                  key={index}
                  className="px-4 py-2 flex justify-between items-center text-sm font-poppins cursor-pointer hover:bg-gray-200"
                >
                  <span onMouseDown={() => handleSelectSearch(search, "")}>
                    {search}
                  </span>
                  <span
                    onClick={(e) => handleDeleteSearch(e, search)}
                    className="cursor-pointer text-gray-500 hover:text-red-500"
                  >
                    <RxCross2 />
                  </span>
                </li>
              ))}
            </>
          )}
          {(defaultCategories.length > 0
            ? defaultCategories
            : filteredCategories
          ).length > 0 && (
            <>
              <li className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b">
                🔥{" "}
                {defaultCategories.length > 0
                  ? "Top Trending Categories"
                  : "Filtered Categories"}
              </li>
              {(defaultCategories.length > 0
                ? defaultCategories
                : filteredCategories
              ).map((category: Category) => (
                <li
                  key={category.id}
                  className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-200"
                  onMouseDown={() =>
                    handleSelectSearch(category.category_name, category.id)
                  }
                >
                  <Image
                    src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/web2022/search_treanding.svg"
                    alt="Trending Icon"
                    width={30}
                    height={30}
                  />
                  <p className="text-base font-medium">
                    {category.category_name}
                  </p>
                </li>
              ))}
            </>
          )}

          {filteredServices.length > 0 && (
            <>
              <li className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 border-b">
                Recommended Services
              </li>
              {filteredServices.map((service: Service) => {
                const rating = service.avg_rating || 0;

                return (
                  <li
                    key={service.service_id}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() =>
                      router.push(`/ServiceDetail/${service.service_id}`)
                    }
                  >
                    {service.service_images.length > 0 && (
                      <Image
                        src={service.service_images[0]}
                        alt={service.service_name}
                        width={40}
                        height={50}
                        className="rounded mt-1"
                      />
                    )}

                    <div className="w-full">
                      <p className="text-base font-medium">
                        {service.service_name}
                      </p>
                      <div className="w-full flex gap-5 items-center">
                        <div className="flex items-center gap-1">
                          <div className="bg-[#007A0C]  flex justify-center items-center  px-1 w-fit text-xs rounded-sm text-white font-poppins">
                            {rating}
                            <MdOutlineStar className=" text-xs" />
                          </div>
                          <p className="text-xs font-poppins text-gray-500">
                            ({service.review_count || 0})
                          </p>
                        </div>
                        <p className="text-xs font-poppins text-gray-500">
                          • {service.area} • {service.distance_km}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </>
          )}

          {searchValue.trim() !== "" &&
            filteredCategories.length === 0 &&
            filteredServices.length === 0 && (
              <li className="px-4 py-2 border-t  text-center text-gray-500">
                No categories or services found
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

export default CategorySearchHomeScreen;
