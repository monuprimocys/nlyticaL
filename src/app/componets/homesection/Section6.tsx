"use client";

import React from "react";
import bgimage from "../../../../public/assets/Image/section6bgimage.png";
import rightside from "../../../../public/assets/Image/section6rightsideimage.png";
import Image from "next/image";
import section5vectorline from "../../../../public/assets/Image/section5vectorline.png";
import phone from "../../../../public/assets/Image/phone.png";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import { useHomeScreenSettingApi } from "@/app/storeApp/api/useHomeScreenSettingApi";

function Section6() {
  const { data, isLoading, refetch } = useHomeScreenApi();
  const { data: settingHome } = useHomeScreenSettingApi();
  
    if (settingHome?.data[5].status == 0) {
      return null;
    }
  return (
    <div className="w-full h-auto mt-[6rem] ">
      <div
        className="mx-auto 2xl:w-[65%]  h-[55rem] w-[90%] md:h-[24rem] flex flex-col md:flex-row justify-between items-center bg-cover gap-6 py-6 md:py-0 overflow-hidden rounded-lg"
        style={{ backgroundImage: `url(${bgimage.src})` }}
      >
        {/* Left Side */}
        <div className="w-full md:w-[50%] h-full flex flex-col items-center justify-center gap-4 text-center md:text-left px-4 md:px-3  ">
          <div className="w-full xl:w-[80%] mx-auto gap-2">
            <h2 className="text-3xl xl:text-4xl font-bold font-poppins 2xl:line-clamp-1">
              Download Our Mobile APP
            </h2>
            <p className="text-lg md:text-xl font-normal font-poppins line-clamp-2">
              Download the ultimate{" "}
              <a href="#" className="text-[#0046AE] font-semibold font-poppins">
                Nlytical
              </a>{" "}
              for seamless property search and deals!
            </p>
          </div>

          {/* Center image line */}
          <div className="w-full flex items-center justify-center">
            <Image
              src={section5vectorline}
              alt="Vector Line"
              className="w-[10rem] h-[6rem] object-cover   rotate-12  xl:rotate-0"
            />
          </div>

          {/* Center buttons */}
          <div className="flex flex-col items-center justify-center gap-4 md:w-full md:flex-row">
            {/* Google Play Button */}
            <a
              href={data?.banners[0].app_store_url}
              target="_blanck"
              className=""
            >
              <button
                type="button"
                className="flex items-center justify-between w-full px-3 py-2 md:py-3 text-white bg-black rounded-lg md:w-44 md:h-16"
              >
                <div className="mr-3">
                  <svg viewBox="30 336.7 120.9 129.2" width="30">
                    <path
                      fill="#FFD400"
                      d="M119.2,421.2c15.3-8.4,27-14.8,28-15.3c3.2-1.7,6.5-6.2,0-9.7c-2.1-1.1-13.4-7.3-28-15.3l-20.1,20.2L119.2,421.2z"
                    ></path>
                    <path
                      fill="#FF3333"
                      d="M99.1,401.1l-64.2,64.7c1.5,0.2,3.2-0.2,5.2-1.3c4.2-2.3,48.8-26.7,79.1-43.3L99.1,401.1L99.1,401.1z"
                    ></path>
                    <path
                      fill="#48FF48"
                      d="M99.1,401.1l20.1-20.2c0,0-74.6-40.7-79.1-43.1c-1.7-1-3.6-1.3-5.3-1L99.1,401.1z"
                    ></path>
                    <path
                      fill="#3BCCFF"
                      d="M99.1,401.1l-64.3-64.3c-2.6,0.6-4.8,2.9-4.8,7.6c0,7.5,0,107.5,0,113.8c0,4.3,1.7,7.4,4.9,7.7L99.1,401.1z"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-xs font-poppins">Android App On</div>
                  <div className="text-lg md:text-sm xl:text-lg font-semibold font-poppins">
                    Google Play
                  </div>
                </div>
              </button>
            </a>

            {/* App Store Button */}

            <a
              href={data?.banners[0].play_store_url}
              target="_blanck"
              className=""
            >
              <button
                type="button"
                className="flex items-center justify-between w-full px-3 py-2 md:py-3 mt-4 text-white bg-black rounded-lg md:w-44 md:h-16 md:mt-0"
              >
                <div className="w-[30%] py-2">
                  <Image
                    src={phone}
                    alt="Phone"
                    className="w-full h-[2.5rem]"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <div className="text-xs font-poppins">Available on the</div>
                  <div className="text-lg md:text-sm xl:text-lg font-semibold font-poppins">
                    App Store
                  </div>
                </div>
              </button>
            </a>
          </div>
        </div>

        {/* Right Side Image */}
        <div
          className="w-[90%] md:w-[40%] h-full xl:bg-cover bg-contain bg-no-repeat bg-center md:bg-bottom xl:bg-center  md:mr-3"
          style={{ backgroundImage: `url(${rightside.src})` }}
        ></div>
      </div>
    </div>
  );
}

export default Section6;
