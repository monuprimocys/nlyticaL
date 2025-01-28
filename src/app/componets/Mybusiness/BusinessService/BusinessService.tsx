import React from "react";
import "../businesscss.css";
import tollsimage from "../../../../../public/assets/Image/teamworkbusiness.png";
import Image from "next/image";
import Arrowleftside from "../../../../../public/assets/Image/arrow-left.png";

function BusinessService() {
  return (
    <div className="mx-auto 2xl:w-[55%] xl:w-[80%] w-[90%] mt-[3rem] businesslable gap-5 rounded-lg py-8 px-12 flex justify-between items-center cursor-pointer">
      {/* Left Side */}
      <div className="flex justify-start items-center gap-6">
        {/* Image */}
        <Image
          className="rounded-lg w-[6rem] h-[6rem] object-cover"
          src={tollsimage}
          alt="Tolls"
        />
        <div className=" w-full flex-col flex gap-2">
          <h3 className="text-lg font-medium font-poppins">Services</h3>
          <p className="text-[#848484] font-poppins font-normal">
            Add Services, List, and Edit it
          </p>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex justify-end items-center gap-4 cursor-pointer">
        {/* Arrow left */}
        <Image
          className="w-[2rem] h-[2rem] object-cover"
          src={Arrowleftside}
          alt="Arrow left"
        />
      </div>
    </div>
  );
}

export default BusinessService;
