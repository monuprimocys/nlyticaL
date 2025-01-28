"use client";

import React from "react";
import Image from "next/image";
import callicon from "../../../public/assets/Image/calliconcontact.png";
import location from "../../../public/assets/Image/locationcontact.png";
import sms from "../../../public/assets/Image/smscontact.png";

function Contactpage() {
  return (
    <div
      className="w-full h-[40rem] md:h-[20rem] 2xl:h-[30rem] bg-bottom bg-transparent flex justify-center items-center rounded-lg  bg-cover"
      style={{
        backgroundImage: "url(/assets/Image/contactus.png)",
        backgroundRepeat: "no-repeat",
      
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
            <h2 className="text-2xl sm:text-xl md:text-2xl xl:text-2xl text-[#000000] font-poppins font-[600]">
              Call Us
            </h2>
            <p className="text-lg sm:text-base md:text-lg xl:text-lg text-[#000000] font-poppins">
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
            <h2 className="text-2xl sm:text-xl md:text-2xl xl:text-2xl text-[#000000] font-poppins font-[600]">
              Address
            </h2>
            <p className="text-lg sm:text-base md:text-lg xl:text-lg text-[#000000] font-poppins">
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
            <h2 className="text-2xl sm:text-xl md:text-2xl xl:text-2xl text-[#000000] font-poppins font-[600]">
              Email Us
            </h2>
            <p className="text-lg sm:text-base md:text-lg xl:text-lg text-[#000000] font-poppins">
              Handyman@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactpage;
