"use client";

import React, { useEffect } from "react";
import aboutimage from "../../../public/assets/Image/aboutus.png";
import Image from "next/image";
import "./style.css";
import Version from "../componets/About/Version";
import Section3 from "../componets/About/Section3";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";

function AboutComponet() {
  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);


  return (
    <div
      className={`w-full h-auto     ${
        isDarkMode ? " bg-[#181818]" : "bg-white"
      } `}
    >
      <div className="2xl:w-[60%] w-[90%] xl:w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center justify-between gap-6">
        {/* Left side */}
        <div className="w-full flex  h-full  flex-col md:flex-row lg:flex-col gap-6 items-center justify-center overflow-hidden">
          {/* Heading */}
          <div className="flex flex-col gap-1  h-full justify-center  md:justify-start  lg:justify-center items-center  pt-3">
            <h2
              className={`md:text-4xl text-2xl font-medium  AmericanSign ${
                isDarkMode ? "text-[#FFFFFF]" : "text-[#0046AE]"
              } `}
            >
              Find deals in
            </h2>
            <h3
              className={`font-poppins md:text-4xl text-2xl  font-medium  ${
                isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
              }`}
            >
              Nearby Stores
            </h3>
            <p
              className={`font-poppins  font-normal text-sm md:text-lg max-w-lg mx-auto  ${
                isDarkMode ? "text-[#FFFFFFBA]" : "text-[#4A4A4A]"
              }`}
            >
              We are dedicated to delivering innovative solutions that empower
              our customers and drive meaningful change.
            </p>
          </div>

          {/* Image */}
          <div className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px]">
            <Image
              src={aboutimage}
              alt="About American Sign"
              layout="responsive"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="w-full flex flex-col gap-4  md:flex-row lg:flex-col items-center justify-start h-full overflow-hidden">
          <div className=" h-full  flex  w-full flex-col justify-center  md:justify-start  lg:justify-center gap-2 ">
            <div className="w-full flex justify-center items-center">
              <h2
                className={` text-3xl lg:text-5xl font-semibold ${
                  isDarkMode ? "text-[#FFFFFF]" : "text-[#0046AE]"
                }`}
              >
                15 Years Of Service
              </h2>
            </div>
            <div className="w-full lg:px-4 xl:px-0   xl:w-[70%] mx-auto ">
              <p
                className={` font-poppins text-lg  ${
                  isDarkMode ? "text-[#FFFFFFBA]" : "text-[#4A4A4A]"
                }`}
              >
                We are dedicated to delivering innovative solutions that empower
                our customers and drive meaningful change.
              </p>
            </div>
          </div>

          <div
            className={`w-full sm:w-[90%]  h-auto rounded-xl p-6 flex flex-col justify-start items-start gap-4  ${
              isDarkMode ? "bg-[#212121]" : "aboutshadow"
            }`}
          >
            <div className="w-full flex flex-col justify-start items-start">
              <h3 className="text-[#0046AE] AmericanSign text-2xl font-medium">
                Value
              </h3>
              <h3
                className={` font-poppins text-2xl font-medium   ${
                  isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
                }`}
              >
                Core Values
              </h3>
            </div>
            <p
              className={`text-lg  font-poppins   ${
                isDarkMode ? "text-[#FFFFFFBA]" : "text-[#000000B5]"
              }`}
            >
              We are dedicated to delivering innovative solutions that empower
              our customers and drive meaningful change.
            </p>
            <ul className="flex flex-col justify-start items-start gap-4">
              <li className="flex justify-between items-center gap-2">
                <div className="rounded-full h-2 w-2 bg-[#0046AE]"></div>
                <p
                  className={` font-poppins font-medium  ${
                    isDarkMode ? "text-[#FFFFFF]" : "text-[#0046AE]"
                  }`}
                >
                  Community Responsiveness
                </p>
              </li>
              <li className="flex justify-between items-center gap-2">
                <div className="rounded-full h-2 w-2 bg-[#0046AE]"></div>
                <p
                  className={` font-poppins font-medium  ${
                    isDarkMode ? "text-[#FFFFFF]" : "text-[#0046AE]"
                  }`}
                >
                  Integrity
                </p>
              </li>
              <li className="flex justify-between items-center gap-2">
                <div className="rounded-full h-2 w-2 bg-[#0046AE]"></div>
                <p
                  className={` font-poppins font-medium  ${
                    isDarkMode ? "text-[#FFFFFF]" : "text-[#0046AE]"
                  }`}
                >
                  Team Work
                </p>
              </li>
              <li className="flex justify-between items-center gap-2">
                <div className="rounded-full h-2 w-2 bg-[#0046AE]"></div>
                <p
                  className={` font-poppins font-medium  ${
                    isDarkMode ? "text-[#FFFFFF]" : "text-[#0046AE]"
                  }`}
                >
                  Effort
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Background Element */}
      <div className="w-[50%] bg-[#0046AE36] h-[8rem] relative top-[-11rem] -z-20 rounded-r-xl hidden lg:block"></div>

      <div className=" 2xl:w-[60%] w-[90%]  mt-[-2rem]    mx-auto h-auto">
        <Version />
      </div>
      <div className=" 2xl:w-[60%] w-[90%]  mt-[5rem]  mx-auto h-auto ">
        <Section3 />
      </div>
    </div>
  );
}

export default AboutComponet;
