"use client";

import React, { useEffect } from "react";
import SponsorStoresCard from "./SponsorStoresCard";
import Heading from "../../Heading/Heading";
import "./cardStyle.css";
import Image from "next/image";
import btnicon from "../../../../../public/assets/Image/btn.png";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";

function SponsorStores() {
  const { data, isLoading, refetch } = useHomeScreenApi();
  const router = useRouter();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const carddata = data?.sponser_store.services;

  console.log(" my card values ", carddata);

  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[3].status == 0) {
    return null;
  }

  return (
    <div className="w-full h-auto  mt-[4rem] md:mt-[6rem] ">
      <div className="w-[90%] sm:w-[85%] md:w-[90%] 2xl:w-[70%] mx-auto   ">
        <div className=" w-full xl:pt-[1.8rem]">
          <Heading
            title="Premium"
            highlightedTitle={data?.sponser_store.title}
          />
        </div>
        <div className=" grid-cols-1 grid xl:grid-cols-2   mt-[3rem] md:mt-[5rem]   gap-4 w-full">
          {carddata?.map((item, index) => (
            <SponsorStoresCard key={index} data={item} />
          ))}
        </div>
        {/*  btn  exprlore more btn  */}
        <div className="w-full flex justify-center items-center mt-[3rem]">
          <div
            className="w-fit relative"
            onClick={() => {
              router.push("/Sponser");
            }}
          >
            <button
              className={` font-poppins w-[200px] h-[50px] px-[30px] py-[12px] rounded-xl  border-2  flex items-center justify-between transition duration-300 ease-in-out transform   focus:outline-none  ${
                isDarkMode
                  ? "text-white   bg-[#212121] border-[#181818]"
                  : "text-[#0046AE] bg-white border-[#0046AE]"
              }`}
              id="bordercolorbtn"
            >
              Explore More
              <Image
                className="h-[12px] w-[14px] ml-[10px] transition-transform duration-300 ease-in-out"
                src={btnicon}
                alt="buttonicon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SponsorStores;
