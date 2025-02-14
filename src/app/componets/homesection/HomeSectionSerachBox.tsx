import { useState } from "react";
import { useGetCountryApi } from "@/app/store/api/usegetCountryApi";
import location from "../../../../public/assets/Image/locationicon.png";
import searchnormalicon from "../../../../public/assets/Image/search-normal.png";
import Image from "next/image";
import { useGetCountryCategoryApi } from "@/app/store/api/useGetCountryCategoryApi";

function HomeSectionSerachBox() {
  const { data } = useGetCountryApi();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Track selected category

  // Fetch category data based on the selected country
  const { data: categoryData } = useGetCountryCategoryApi(selectedCountry);

  const countryList = data?.countriesList || [];

  // Logging the categories correctly
  if (categoryData?.categoriesList) {
    console.log(
      "My selected country categories list is",
      categoryData.categoriesList
    );

    // Optionally log category names individually
    const categoryNames = categoryData.categoriesList.map(
      (category) => category.category_name
    );
    console.log("Category names:", categoryNames);
  }

  return (
    <div className="relative h-auto w-full">
      <div className="relative top-[-7rem] mx-auto h-fit w-[90%] rounded-xl bg-white p-4 shadow md:top-[-4rem] md:w-[85%] lg:top-[-2.5rem] xl:top-[-6.8rem] xl:p-6 2xl:w-[60%] 2xl:p-10">
        <div className="mx-auto flex w-[95%] flex-col items-start justify-start gap-6">
          <div>
            <h3 className="font-poppins text-lg font-medium text-[#0046AE] xl:text-2xl">
              Search your services
            </h3>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
            <div className="relative w-full lg:w-[40%] cursor-pointer">
              <label
                className="font-poppins text-sm font-semibold text-[#000000]"
                htmlFor="location"
              >
                Location
              </label>
              <div className="relative mt-2 flex items-center cursor-pointer">
                <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full">
                  <Image
                    src={location}
                    alt="Location Icon"
                    className="h-[1.5rem] w-[1.5rem] object-cover"
                  />
                </span>
                <select
                  id="location"
                  name="location"
                  className="border-1 cursor-pointer font-poppins w-full rounded-lg border border-[#0046AE80] bg-white py-3 pl-14 text-[#000000] placeholder-gray-500 focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80]"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Location
                  </option>
                  {countryList.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative w-full">
              <label
                className="font-poppins text-sm font-semibold text-[#000000]"
                htmlFor="service"
              >
                Search Services
              </label>
              <div className="relative mt-2 flex items-center">
                <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full">
                  <Image
                    src={searchnormalicon}
                    alt="Search Icon"
                    className="h-[1.5rem] w-[1.5rem] fill-red-700 object-cover"
                  />
                </span>

                <select
                  id="category"
                  name="category"
                  className="border-1 cursor-pointer font-poppins w-full rounded-lg border border-[#0046AE80] bg-white py-3 pl-14 text-[#000000] placeholder-gray-500 focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categoryData?.categoriesList?.map((category, index) => (
                    <option key={index} value={category.category_name}>
                      {category.category_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            

            <div className="relative flex w-fit items-center justify-center md:mt-7">
              <div className="flex h-[3.2rem] w-[7.2rem] cursor-pointer items-center justify-center rounded-xl bg-[#0046AE]">
                <button
                  type="submit"
                  className="font-poppins px-4 py-2 text-sm font-medium text-white"
                  disabled={!selectedCountry} // Disable until country is selected
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSectionSerachBox;
