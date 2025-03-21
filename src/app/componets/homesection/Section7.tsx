"use client";

import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import Heading from "../Heading/Heading";
import homeSectionMainCardData from "./Section5/data";
import Section5card from "./Section5card";
import Image from "next/image";
import btnicon from "../../../../public/assets/Image/btn.png";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";
import { useAppSelector } from "@/app/hooks/hooks";
import { RotatingLines } from "react-loader-spinner"; // Import Loader
import { useState } from "react";
import { useRouter } from "next/navigation";

function Section7() {
  const { data, isLoading, refetch } = useHomeScreenApi();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const carddata = data?.perfect_store.perfect_store;

  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[6].status == 0) {
    return null;
  }

  

  const handleClick = () => {
    setLoading(true); // Set loading state to true
    router.push("/store").finally(() => setLoading(false)); // Reset loading after navigation
  };

  return (
    <div className="w-full h-auto mt-[6rem] ">
      <div className="w-[90%] sm:w-[85%] md:w-[90%]  2xl:w-[65%] mx-auto flex flex-wrap xl:flex-nowrap justify-between gap-4 items-center flex-col">
        {/* Center content */}

        <div className=" w-full xl:pt-[1.8rem]">
          <Heading
            title="Top Trending  "
            highlightedTitle={data?.perfect_store.title}
          />
        </div>

        {/* Arrows and Cards in a row */}
        <div className=" items-center justify-between w-full  mt-10  grid grid-cols-1 md:grid-cols-2  gap-5  xl:grid-cols-3">
          {carddata?.map((item, index) => (
            <Section5card key={index} data={item} />
          ))}
        </div>
        <div className="w-fit relative" onClick={handleClick}>
          <button
            className={`font-poppins w-[200px] h-[50px] px-[30px] py-[12px] rounded-xl border-2 flex items-center justify-center transition duration-300 ease-in-out transform focus:outline-none ${
              isDarkMode
                ? "text-white bg-[#212121] border-[#181818]"
                : "text-[#0046AE] bg-white border-[#0046AE]"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            id="bordercolorbtn"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <RotatingLines
                strokeColor={isDarkMode ? "#fff" : "#0046AE"}
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <>
                Explore More
                <Image
                  className="h-[12px] w-[14px] ml-[10px] transition-transform duration-300 ease-in-out"
                  src={btnicon}
                  alt="buttonicon"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Section7;
