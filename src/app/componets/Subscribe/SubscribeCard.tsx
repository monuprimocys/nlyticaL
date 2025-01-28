import bgvectoreimage from "../../../../public/assets/Image/Section9Vector.png";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
function SubscribeCard() {
  return (
    <div
      className="relative h-[27.5rem] w-full cursor-pointer -z-20"
      style={{
        position: "relative",
      }}
    >
      {/* Background Image with opacity 0.1 */}
      <div
        className="h-full w-full rounded-xl"
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
      <div className=" h-full w-full rounded-xl bg-white shadow">
        <div className="flex w-full flex-col items-start justify-start gap-4 p-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-poppins text-2xl font-medium text-[#0046AE]">
              Business Plan
            </h2>
            <p className="font-poppins text-lg text-[#000000]">
              Hold in these matters this principle
            </p>
          </div>
          {/* price detail */}

          <div className="flex">
            <div>
              <h2 className="font-poppins text-xl font-medium text-[#000000]">
                ${" "}
                <span className="font-poppins relative bottom-[1px] text-3xl font-semibold">
                  46.00
                </span>
                <span className="font-poppins text-[16px] font-semibold text-[#0046AE]">
                  / PER MONTH
                </span>
              </h2>
            </div>
          </div>

          {/* listing */}
          <div className="flex flex-col gap-2">
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-2">
                <div className="h-5 w-5">
                  <FaCheckCircle className="h-full w-full text-[#0046AE]" />
                </div>
                <p className="font-poppins text-[16px] text-[#000000]">
                  24/7 Consultant Service
                </p>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5">
                  <FaCheckCircle className="h-full w-full text-[#0046AE]" />
                </div>
                <p className="font-poppins text-[16px] text-[#000000]">
                  24/7 Consultant Service
                </p>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5">
                  <FaRegCircleCheck className="h-full w-full" />
                </div>
                <p className="font-poppins text-[16px] text-[#000000]">
                  24/7 Consultant Service
                </p>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-5 w-5">
                  <FaRegCircleCheck className="h-full w-full" />
                </div>
                <p className="font-poppins text-[16px] text-[#000000]">
                  24/7 Consultant Service
                </p>
              </li>
            </ul>
          </div>
        </div>
        {/* btn */}
        <div className="w-full p-4  ">
          <button className="font-poppins w-full rounded-lg bg-[#0046AE] py-3 text-center text-lg font-semibold text-white">
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubscribeCard;
