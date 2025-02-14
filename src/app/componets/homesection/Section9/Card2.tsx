import { useServicePlane } from "@/app/store/api/useserviceplane";
import bgvectoreimage from "../../../../../public/assets/Image/section9card2.png";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";

function Card2() {
  const { data, isLoading, refetch } = useServicePlane();
  return (
    <div className="w-full  min-h-fit relative cursor-pointer">
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

      {/* Content (with blue background color) */}
      <div className="w-full min-h-full bg-[#0046AE] z-10 shadow-lg rounded-xl">
        {/* Content Section */}
        <div className="w-full flex flex-col gap-4 p-6">
          {/* Title and Description */}
          <div className="flex flex-col gap-4">
            <h2 className="text-[#FFFFFF] font-medium font-poppins text-2xl">
              {data?.subscriptionDetail[1].plan_name}
            </h2>
            <p className="text-[#FFFFFF] font-poppins text-lg line-clamp-1">
              {data?.subscriptionDetail[1].description}
            </p>
          </div>

          {/* Price Detail */}
          <div className="flex">
            <div>
              <h2 className="text-[#FFFFFF] font-medium font-poppins text-xl">
                <span className="font-poppins font-semibold text-3xl relative bottom-[1px]">
                  {data?.subscriptionDetail[1].price}
                </span>
                <span className="text-[#FFFFFF] font-poppins font-semibold text-[16px]">
                  / PER MONTH
                </span>
              </h2>
            </div>
          </div>

          {/* Listing with icons */}

          <div className="flex flex-col gap-2">
            <ul className="flex flex-col gap-4">
              {data?.subscriptionDetail?.[1]?.plan_services?.map(
                (service, index) => (
                  <li className="flex gap-2 items-center" key={index}>
                    <div className="w-5 h-5">
                      {service.status === 1 ? (
                        <FaCheckCircle className="w-full h-full text-[#FFFFFF]" />
                      ) : (
                        <FaRegCircleCheck className="w-full h-full text-[#FFFFFF]" />
                      )}
                    </div>
                    <p className="text-[#FFFFFF] font-poppins text-[16px]">
                      {service.plan_services}
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Button to choose the plan */}
        <div className="w-full p-4">
          <button className="bg-[#FFFFFF]  text-[#0046AE] font-poppins font-semibold text-lg text-center py-3 rounded-lg w-full">
            Choose Plan
          </button>
        </div>

        {/* Top button */}
        <div className="relative top-[-28rem] left-[3rem]">
          <button className="border-color text-[#0046AE] px-3 bg-white py-2 rounded-lg font-poppins">
            Most Popular
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card2;
