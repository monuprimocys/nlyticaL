"use client";
import Image from "next/image";
import line from "../../../public/assets/Image/line.png";
import bgimage from "../../../public/assets/Image/fottertopimagerightside.png";

import emailicon from "../../../public/assets/Image/emailfooter.png";
import { useAppSelector } from "../hooks/hooks";
import { useGetCategoriesQuery } from "../storeApp/api/useGetCategory";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setActiveComponent } from "../storeApp/Slice/activeComponentSlice";
import { useAddNewsemail } from "../storeApp/api/useAddNewsemail";
import { useState } from "react";
import { toast } from "react-toastify";
import { setSelectedCategoryListing } from "../storeApp/Slice/Listing/CategoryLIstingSlice";
import useTranslation from "../hooks/useTranslation";

function Fotter() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useDispatch();

  const { data } = useGetCategoriesQuery();

  console.log(" my api responce called ", data?.data);

  const router = useRouter();
  const categories = data?.data || [];
  const firstColumn = categories.slice(0, 5);
  const secondColumn = categories.slice(5, 10);
  const thirdColumn = categories.slice(10, 15);
  const fourthColumn = categories.slice(15, 20);

  const hnadalprivacyclik = () => {
    router.push("/Profile");
    dispatch(setActiveComponent("Privacy Policy"));
  };

  const handaltermcom = () => {
    router.push("/Profile");
    dispatch(setActiveComponent("Terms and Condition"));
  };

  console.log(" my   api responce called12121212~~~@!@ ", firstColumn);

  const [email, setEmail] = useState("");
  const { mutate, isLoading } = useAddNewsemail();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter an email address.");
      return;
    }

    console.log("Submitting Email:", email); // ✅ Log input email before API call

    mutate(email, {
      onSuccess: (data) => {
        console.log("API Response onSuccess:", data); // ✅ Log API success response
        toast.success(
          data?.message || "Your email has been successfully subscribed!"
        );
        setEmail(""); // Clear input field after successful submission
      },
      onError: (error: any) => {
        console.error(
          "API Response onError:",
          error.response?.data || error.message
        ); // ✅ Log API error response
        toast.error(error.response?.data?.message || "Something went wrong");
      },
    });
  };

  const { getTranslation } = useTranslation();

  return (
    <div
      className={`relative w-full pt-10    ${
        isDarkMode ? "dark:bg-[#181818] " : ""
      } `}
    >
      {/* fotter top content */}

      <div className="gap-8 w-[90%] mb-4 backgroundImage md:w-[80%]  xl:w-[65%] 2xl:w-[50%] mx-auto flex justify-between pb-3 lg:pb-2 2xl:pb-0 md:pb-[0.4rem] pt-10 md:pt-0  items-center h-full rounded-[1.5rem] relative bottom-[-5rem] md:flex-row flex-col overflow-hidden">
        {/* content  */}

        <div className="flex flex-col xl:w-[60%] w-full md:pl-10 gap-6 px-3 md:px-0 ">
          <div className="w-full">
            <h2 className="text-xl font-semibold text-white md:text-2xl font-poppins">
              {getTranslation(
                "Stay connected with us for the latest updates and exciting news!",
                "Stay connected with us for the latest updates and exciting news!"
              )}
            </h2>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-between px-5 py-2 bg-white rounded-lg w-full max-w-[400px] font-poppins text-[#0046AE] font-[600] cursor-pointer"
          >
            <div className="w-10 h-5 xl:w-9">
              <Image
                src={emailicon}
                alt="Email Icon"
                className="object-cover w-full h-full"
              />
            </div>
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full px-3 py-2 mr-2 text-black rounded-lg focus:outline-none focus:ring-0 font-[400]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#0046AE] text-white px-3 py-2 rounded-lg font-poppins"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* image */}

        <div
          className="xl:w-[40%] w-[90%]    overflow-hidden md:rounded-br-[1rem] h-[14rem] lg:h-[18rem] md:h-[15rem] bg-contain  xl:bg-transparent md:bg-right-bottom 2xl:bg-center  bg-bottom  2xl:bg-cover"
          style={{
            backgroundImage: `url(${bgimage.src})`,
          }}
        ></div>
      </div>

      {/* fotter content  */}
      <div
        className={`w-full h-auto   bg-center bg-cover flex  justify-center    items-center  backgroundImage2   ${
          isDarkMode ? "dark:bg-[#181818]" : ""
        }`}
      >
        <div
          className={`w-full flex flex-col h-full pt-20 pb-5  ${
            isDarkMode ? "dark:bg-[#212121]" : ""
          }`}
        >
          {/* Footer Content */}
          <div className="w-[90%] md:w-[80%] mx-auto grid  grid-cols-2    md:grid-cols-[20%_80%] gap-8 gap-y-6">
            {/* Use Links Links */}
            <div className="flex flex-col items-center md:items-start space-y-6 w-full ">
              <div className="flex flex-col items-center md:items-start gap-y-3">
                <h3 className="text-2xl font-bold text-[#0046AE] font-poppins">
                  {getTranslation("Use Links ", "Use Links")}
                </h3>
                <Image src={line} alt="Line" className="w-16" />
              </div>
              <div className="flex flex-col items-center md:items-start space-y-4 text-sm font-medium">
                <p
                  className={`font-normal font-poppins cursor-pointer hover:text-[#0046AE] ${
                    isDarkMode ? "dark:text-white" : ""
                  }`}
                  onClick={() => router.push("/about")}
                >
                  About Us 
                </p>

                <p
                  className={`font-normal font-poppins cursor-pointer hover:text-[#0046AE] ${
                    isDarkMode ? "dark:text-white" : ""
                  }`}
                  onClick={hnadalprivacyclik}
                >
                  Privacy Policy
                </p>

                <p
                  className={`font-normal font-poppins cursor-pointer hover:text-[#0046AE] ${
                    isDarkMode ? "dark:text-white" : ""
                  }`}
                  onClick={handaltermcom}
                >
                  Terms & Conditions
                </p>
              </div>
            </div>
            <div className="w-full   md:hidden">
              {/* Heading */}
              <div className="flex flex-col items-center md:items-start gap-y-3">
                <h3 className="text-2xl font-bold text-[#0046AE] font-poppins">
                         {getTranslation("Categories", "Categories")}
                </h3>
                <Image src={line} alt="Line" className="w-16" />
              </div>

              {/* Categories Grid */}
              <div className="grid  w-full justify-items-center  items-center md:grid-cols-4 gap-6 mt-4">
                {[firstColumn].map((column, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 text-sm font-medium"
                  >
                    {column.map((category) => (
                      <p
                        key={category.id}
                        className={`font-normal font-poppins cursor-pointer hover:text-[#0046AE]  ${
                          isDarkMode ? "dark:text-white" : ""
                        }`}
                        onClick={() => {
                          router.push("/store");

                          sessionStorage.setItem(
                            "Category_ID",
                            category.id.toString()
                          );
                          sessionStorage.setItem(
                            "Category_Name",
                            category.category_name
                          );

                          sessionStorage.removeItem("subcategory_name");
                          sessionStorage.removeItem("subcategories_id");

                          dispatch(
                            setSelectedCategoryListing({
                              id: category.id.toString(),
                              category_name: category.category_name,
                            })
                          );
                        }}
                      >
                        {category.category_name}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className=" w-full  md:hidden">
              <div className="grid    grid-flow-col justify-items-center items-center w-full gap-6 mt-4">
                {[secondColumn].map((column, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 text-sm font-medium"
                  >
                    {column.map((category) => (
                      <p
                        key={category.id}
                        className={`font-normal font-poppins cursor-pointer hover:text-[#0046AE]  ${
                          isDarkMode ? "dark:text-white" : ""
                        }`}
                        onClick={() => {
                          router.push("/store");

                          sessionStorage.setItem(
                            "Category_ID",
                            category.id.toString()
                          );
                          sessionStorage.setItem(
                            "Category_Name",
                            category.category_name
                          );

                          sessionStorage.removeItem("subcategory_name");
                          sessionStorage.removeItem("subcategories_id");

                          dispatch(
                            setSelectedCategoryListing({
                              id: category.id.toString(),
                              category_name: category.category_name,
                            })
                          );
                        }}
                      >
                        {category.category_name}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className=" w-full  md:hidden">
              <div className="grid    grid-flow-col justify-items-center items-center w-full gap-6 mt-4">
                {[thirdColumn].map((column, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 text-sm font-medium"
                  >
                    {column.map((category) => (
                      <p
                        key={category.id}
                        className={`font-normal font-poppins cursor-pointer hover:text-[#0046AE]  ${
                          isDarkMode ? "dark:text-white" : ""
                        }`}
                        onClick={() => {
                          router.push("/store");

                          sessionStorage.setItem(
                            "Category_ID",
                            category.id.toString()
                          );
                          sessionStorage.setItem(
                            "Category_Name",
                            category.category_name
                          );

                          sessionStorage.removeItem("subcategory_name");
                          sessionStorage.removeItem("subcategories_id");

                          dispatch(
                            setSelectedCategoryListing({
                              id: category.id.toString(),
                              category_name: category.category_name,
                            })
                          );
                        }}
                      >
                        {category.category_name}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-full  md:hidden">
              <div className="grid    grid-flow-col  justify-items-center  items-center w-full gap-6 mt-4">
                {[fourthColumn].map((column, index) => (
                  <div
                    key={index}
                    className="flex flex-col space-y-2 text-sm font-medium"
                  >
                    {column.map((category) => (
                      <p
                        key={category.id}
                        className={`font-normal font-poppins cursor-pointer hover:text-[#0046AE]  ${
                          isDarkMode ? "dark:text-white" : ""
                        }`}
                        onClick={() => {
                          router.push("/store");

                          sessionStorage.setItem(
                            "Category_ID",
                            category.id.toString()
                          );
                          sessionStorage.setItem(
                            "Category_Name",
                            category.category_name
                          );

                          sessionStorage.removeItem("subcategory_name");
                          sessionStorage.removeItem("subcategories_id");

                          dispatch(
                            setSelectedCategoryListing({
                              id: category.id.toString(),
                              category_name: category.category_name,
                            })
                          );
                        }}
                      >
                        {category.category_name}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Categories Section */}
            <div className="w-full hidden md:block">
              {/* Heading */}
              <div className="flex flex-col items-center md:items-start gap-y-3">
                <h3 className="text-2xl font-bold text-[#0046AE] font-poppins">
                {getTranslation("Categories", "Categories")}
                </h3>
                <Image src={line} alt="Line" className="w-16" />
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                {[firstColumn, secondColumn, thirdColumn, fourthColumn].map(
                  (column, index) => (
                    <div
                      key={index}
                      className="flex flex-col space-y-2 text-sm font-medium"
                    >
                      {column.map((category) => (
                        <p
                          key={category.id}
                          className={`font-normal font-poppins cursor-pointer hover:text-[#0046AE]  ${
                            isDarkMode ? "dark:text-white" : ""
                          }`}
                          onClick={() => {
                            router.push("/store");

                            sessionStorage.setItem(
                              "Category_ID",
                              category.id.toString()
                            );
                            sessionStorage.setItem(
                              "Category_Name",
                              category.category_name
                            );

                            sessionStorage.removeItem("subcategory_name");
                            sessionStorage.removeItem("subcategories_id");

                            dispatch(
                              setSelectedCategoryListing({
                                id: category.id.toString(),
                                category_name: category.category_name,
                              })
                            );
                          }}
                        >
                          {category.category_name}
                        </p>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="flex items-center justify-center mt-10 w-[90%] md:w-[80%] mx-auto">
            <p
              className={`text-black font-poppins ${
                isDarkMode ? "dark:text-[#FFFFFF]" : "text-black"
              }`}
            >
              Copyright © 2000-2024{" "} 
              <a
                href="https://primocys.com/"
                className={`${
                  isDarkMode ? "dark:text-[#FFFFFF]" : "text-[#000000]"
                } font-semibold`}
              >
                Nlytical
              </a>{" "}
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fotter;
