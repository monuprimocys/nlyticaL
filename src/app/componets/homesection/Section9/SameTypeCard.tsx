import bgvectoreimage from "../../../../../public/assets/Image/Section9Vector.png";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
function SameTypeCard() {
  return (
    <div
      className="w-full h-[27.5rem]  relative cursor-pointer"
      style={{
        position: "relative",
      }}
    >
      {/* Background Image with opacity 0.1 */}
      <div
        className="w-full h-full rounded-xl"
        style={{
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${bgvectoreimage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.1,
        }}
      ></div>

      {/* Content (with white background color) */}
      <div className="w-full h-full bg-white z-10 shadow rounded-xl">
        <div className=" w-full flex justify-start items-start  gap-4 flex-col p-6">
          <div className=" flex  flex-col gap-4">
            <h2 className=" text-[#0046AE] font-medium font-poppins text-2xl">
              Business Plan
            </h2>
            <p className=" text-[#000000]  font-poppins text-lg">
              Hold in these matters this principle
            </p>
          </div>
          {/* price detail */}

          <div className="flex">
            <div>
              <h2 className="text-[#000000] font-medium font-poppins text-xl">
                ${" "}
                <span className="font-poppins font-semibold text-3xl relative bottom-[1px]">
                  46.00
                </span>
                <span className="text-[#0046AE] font-poppins font-semibold  text-[16px] ">
                  / PER MONTH
                </span>
              </h2>
            </div>
          </div>

          {/* listing */}
          <div className=" flex  flex-col gap-2">
            <ul className=" flex flex-col gap-4">
              <li className=" flex gap-2  items-center ">
                <div className="w-5 h-5 ">
                  <FaCheckCircle className=" w-full h-full  text-[#0046AE]" />
                </div>
                <p className="text-[#000000] font-poppins  text-[16px]">
                  24/7 Consultant Service
                </p>
              </li>
              <li className=" flex gap-2  items-center ">
                <div className="w-5 h-5 ">
                  <FaCheckCircle className=" w-full h-full  text-[#0046AE]" />
                </div>
                <p className="text-[#000000] font-poppins  text-[16px]">
                  24/7 Consultant Service
                </p>
              </li>
              <li className=" flex gap-2  items-center ">
                <div className="w-5 h-5 ">
                  <FaRegCircleCheck className=" w-full h-full  " />
                </div>
                <p className="text-[#000000] font-poppins  text-[16px]">
                  24/7 Consultant Service
                </p>
              </li>
              <li className=" flex gap-2  items-center ">
                <div className="w-5 h-5 ">
                  <FaRegCircleCheck className=" w-full h-full  " />
                </div>
                <p className="text-[#000000] font-poppins  text-[16px]">
                  24/7 Consultant Service
                </p>
              </li>
            </ul>
          </div>
        </div>
        {/* btn */}
        <div className=" w-full p-4 ">
          <button className="bg-[#0046AE] text-white  font-semibold font-poppins text-lg text-center py-3 rounded-lg w-full">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default SameTypeCard;
