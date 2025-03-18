import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import Heading from "../Heading/Heading";
import homeSectionMainCardData from "./Section5/data";
import Section5card from "./Section5card";
import Image from "next/image";
import btnicon from "../../../../public/assets/Image/btn.png";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";
import { useAppSelector } from "@/app/hooks/hooks";

function Section7() {
  const { data, isLoading, refetch } = useHomeScreenApi();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const carddata = data?.perfect_store.perfect_store;

  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[6].status == 0) {
    return null;
  }

  return (
    <div className="w-full h-auto mt-[6rem] ">
      <div className="w-[90%] sm:w-[85%] md:w-[90%]  2xl:w-[65%] mx-auto flex flex-wrap xl:flex-nowrap justify-between gap-4 items-center flex-col">
        {/* Center content */}

        <div className=" w-full xl:pt-[1.8rem]">
          <Heading
            title="Top Trending "
            highlightedTitle={data?.perfect_store.title}
          />
        </div>

        {/* Arrows and Cards in a row */}
        <div className=" items-center justify-between w-full  mt-10  grid grid-cols-1 md:grid-cols-2  gap-5  xl:grid-cols-3">
          {carddata?.map((item, index) => (
            <Section5card key={index} data={item} />
          ))}
        </div>

        <div className="w-full flex justify-center items-center mt-[3rem]">
          <div className="w-fit relative">
            <button
              className={` font-poppins w-[200px] h-[50px] px-[30px] py-[12px] rounded-xl  ${
                isDarkMode
                  ? " bg-[#212121] text-white"
                  : " bg-white text-[#0046AE]"
              }  border-2 border-[#0046AE] flex items-center justify-between transition duration-300 ease-in-out transform   focus:outline-none`}
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

export default Section7;
