"use client";
import React from "react";
import Image from "next/image";
import callicon from "../../../public/assets/Image/calliconcontact.png";
import location from "../../../public/assets/Image/locationcontact.png";
import sms from "../../../public/assets/Image/smscontact.png";
import { useAppSelector } from "../hooks/hooks";
import bgimage from "../../../public/assets/Image/bg-c.png";

function Contactpage() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  return (
    <div
      className={`w-full h-[40rem] md:h-[20rem] 2xl:h-[30rem] bg-bottom flex justify-center items-center rounded-xl bg-cover ${
        isDarkMode ? " " : "text-[#000000]  opacity-100"
      }`}
      // style={{
      //   backgroundImage: isDarkMode
      //     ? "linear-gradient(97.85deg, rgba(43, 69, 108, 0) -0.95%, #2A2A2A 90.59%), url(/assets/Image/contactus.png)"
      //     : "url(/assets/bg-c.png)", // Ensure correct file naming
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}

      style={{
        backgroundImage: `url(${bgimage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-wrap xl:flex-nowrap items-center justify-center xl:justify-between w-full gap-6 p-6 xl:p-12">
        {/* Call Us */}
        <div className="flex flex-col items-center justify-center cursor-pointer gap-y-4 xl:gap-y-6">
          <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-[#056CB2] rounded-xl">
            <Image
              src={callicon}
              alt="Call Icon"
              className="object-cover w-[50%] h-[50%]"
            />
          </div>
          <div className="text-center">
            <h2
              className={`text-2xl sm:text-xl md:text-2xl xl:text-2xl font-poppins font-[600]  ${
                isDarkMode ? "text-white" : "text-[#000000]"
              }`}
            >
              Call Us
            </h2>
            <p
              className={`text-lg sm:text-base md:text-lg xl:text-lg  font-poppins  ${
                isDarkMode ? "text-[#FFFFFFBA]" : "text-[#000000]"
              }`}
            >
              (123) 456-7890
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col items-center justify-center cursor-pointer gap-y-4 xl:gap-y-6">
          <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-[#056CB2] rounded-xl">
            <Image
              src={location}
              alt="Location Icon"
              className="object-cover w-[50%] h-[50%]"
            />
          </div>
          <div className="text-center">
            <h2
              className={`text-2xl sm:text-xl md:text-2xl xl:text-2xl font-poppins font-[600]  ${
                isDarkMode ? "text-white" : "text-[#000000]"
              }`}
            >
              Address
            </h2>
            <p
              className={`text-lg sm:text-base md:text-lg xl:text-lg  font-poppins  ${
                isDarkMode ? "text-[#FFFFFFBA]" : "text-[#000000]"
              }`}
            >
              Rruga e Detit, Golem
            </p>
          </div>
        </div>

        {/* Email Us */}
        <div className="flex flex-col items-center justify-center cursor-pointer gap-y-4 xl:gap-y-6">
          <div className="flex justify-center items-center h-[3.5rem] w-[3.5rem] bg-[#056CB2] rounded-xl">
            <Image
              src={sms}
              alt="Email Icon"
              className="object-cover w-[50%] h-[50%]"
            />
          </div>
          <div className="text-center">
            <h2
              className={`text-2xl sm:text-xl md:text-2xl xl:text-2xl font-poppins font-[600]  ${
                isDarkMode ? "text-white" : "text-[#000000]"
              }`}
            >
              Email Us
            </h2>
            <p
              className={`text-lg sm:text-base md:text-lg xl:text-lg  font-poppins  ${
                isDarkMode ? "text-[#FFFFFFBA]" : "text-[#000000]"
              }`}
            >
              Handyman@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactpage;
