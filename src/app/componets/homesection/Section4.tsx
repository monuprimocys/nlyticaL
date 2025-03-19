"use client";

import arror from "../../../../public/assets/Image/section4arrorw.png";
import arrowright from "../../../../public/assets/Image/section4arrorw.png";
import Image from "next/image";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";

function Section4() {
  const { data, isLoading, refetch } = useHomeScreenApi();
  const { data: settingHome } = useHomeScreenSettingApi();

  if (settingHome?.data[2].status == 0) {
    return null;
  }
  return (
    <div className="w-full h-auto   mt-[4rem] md:mt-[6rem] ">
      <div className="w-[90%] sm:w-[85%] md:w-[90%] 2xl:w-[70%] mx-auto flex flex-wrap xl:flex-nowrap justify-between gap-4">
        {/* First Section (Left Box) */}
        <div
          className="w-full md:w-[48%] xl:w-[35%] h-[35rem] md:h-[35rem] rounded-[2rem] relative flex flex-col justify-end overflow-hidden items-center cursor-pointer"
          style={{
            backgroundImage: `url(${data?.cards[0].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Top Right Circle */}
          <div className="absolute top-[-0.5rem] right-[-0.5rem] w-[5rem] h-[5rem] rounded-full shadow-lg bg-white p-2 cursor-pointer">
            <div className="w-full h-full rounded-full bg-[#0046AE] flex justify-center items-center">
              <Image className="w-[2rem] h-[2rem]" src={arror} alt="arrow" />
            </div>
          </div>

          {/* Bottom Center */}
          <div className="w-full p-6 section4linearbgcolor h-[35%] flex flex-col gap-4 justify-center rounded-2xl">
            <div className=" flex flex-col gap-2">
              <h4 className="text-3xl font-semibold text-white font-poppins line-clamp-3">
                {data?.cards[0].title}
              </h4>
              <p className=" font-poppins text-white line-clamp-1 2xl:line-clamp-2">
                {data?.cards[0].subcategory_name}
              </p>
            </div>
          </div>
        </div>

        {/* Middle Section (2 right boxes) */}
        <div className="w-full md:w-[48%] xl:w-[30%] h-[35rem] flex flex-col justify-between gap-6 cursor-pointer">
          {/* First Box */}
          <div
            className="h-[50%] rounded-[3rem] mb-6 md:mb-0"
            style={{
              backgroundImage: `url(${data?.cards[1].image})`, // Fixed usage of secomdcolume.src
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
             <div className="w-full h-full section4linearbgcolor   rounded-[3rem] flex  relative">
              {/* Bottom Circle */}
              <div className="absolute top-[-1.5rem] right-[0%] w-[5rem] h-[5rem] rounded-full shadow-lg bg-white p-2 cursor-pointer">
                <div className="w-full h-full rounded-full bg-[#0046AE] flex justify-center items-center">
                  <Image
                    className="w-[2rem] h-[2rem]"
                    src={arrowright}
                    alt="arrow"
                  />
                </div>
              </div>

              <div className="  flex flex-col gap-2  justify-end p-6 w-full items-center px-2">
                <h4 className="text-lg font-medium text-white font-poppins  line-clamp-1">
                  {data?.cards[1].title}
                </h4>
                <p className=" font-poppins text-white line-clamp-1 ">
                  {" "}
                  {data?.cards[1].subcategory_name}
                </p>
              </div>
            </div>
          </div>

          {/* Second Box */}
          <div
            className="h-[50%] rounded-[3rem] mb-6 md:mb-0"
            style={{
              backgroundImage: `url(${data?.cards[2].image})`, // Fixed usage of secomdcolume.src
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="w-full h-full section4linearbgcolor   rounded-[3rem] flex  relative">
              {/* Bottom Circle */}
              <div className="absolute top-[-1.5rem] right-[0%] w-[5rem] h-[5rem] rounded-full shadow-lg bg-white p-2 cursor-pointer">
                <div className="w-full h-full rounded-full bg-[#0046AE] flex justify-center items-center">
                  <Image
                    className="w-[2rem] h-[2rem]"
                    src={arrowright}
                    alt="arrow"
                  />
                </div>
              </div>

              <div className="  flex flex-col gap-2  justify-end p-6 w-full items-center px-2">
                <h4 className="text-lg font-medium text-white font-poppins  line-clamp-1">
                  {data?.cards[2].title}
                </h4>
                <p className=" font-poppins text-white line-clamp-1 ">
                  {" "}
                  {data?.cards[2].subcategory_name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Third Section (Right Box) */}
        <div
          className="w-full md:w-[48%] xl:w-[35%] h-[35rem] rounded-[2rem] relative flex flex-col justify-end overflow-hidden items-center cursor-pointer"
          style={{
            backgroundImage: `url(${data?.cards[3].image})`, // Fixed usage of thirdcolume.src
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Top Right Circle */}
          <div className="absolute top-0 right-[-0.5rem] w-[5rem] h-[5rem] rounded-full shadow-lg bg-white p-2 cursor-pointer">
            <div className="w-full h-full rounded-full bg-[#0046AE] flex justify-center items-center">
              <Image
                className="w-[2rem] h-[2rem]"
                src={arrowright}
                alt="arrow"
              />
            </div>
          </div>

          {/* Bottom Center */}
          <div className="w-full p-6 section4linearbgcolor h-[35%] flex flex-col gap-4 justify-center rounded-2xl">
            <div className=" flex flex-col gap-2">
              <h4 className="text-3xl font-semibold text-white font-poppins">
                {data?.cards[3].title}
              </h4>
              <p className=" font-poppins text-white line-clamp-2">
                {data?.cards[3].subcategory_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section4;
