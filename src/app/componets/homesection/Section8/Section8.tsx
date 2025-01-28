"use client";
import React from "react";
import bgimage from "../../../../../public/assets/Image/section8bgimage.png";
import rightsideimage from "../../../../../public/assets/Image/section8rightimage.png";

import CausalSection8 from "./Carusal";
import Heading from "../../Heading/Heading";

function Section8() {
  return (
    <div
      className="w-full h-auto mt-[5rem] bg-cover bg-no-repeat overflow-hidden  "
      style={{
        backgroundImage: `url(${bgimage.src})`,
      }}
    >
      <div className="w-[90%] sm:w-[85%] md:w-[90%] xl:w-[94%] 2xl:w-[74%] mx-auto relative xl:h-[35rem] rounded-[1rem] md:h-[55rem]  h-[50rem]   md:gap-10  flex flex-col xl:flex-row   ">
        {/* Left side */}
        <div className="w-full xl:w-[60%] h-full rounded-l-[1rem] flex flex-col  justify-end items-center gap-4  relative top-10 xl:top-0   xl:pb-2">
          {/* Top part */}
          <div className="md:w-[70%] mx-auto text-center ">
            <div className=" w-full">
              <Heading title="Top Trending" highlightedTitle="Clint Review" />
            </div>
            <p className="text-[#000000] font-poppins text-lg font-normal tracking-wide">
              Clint Eastwood delivers another masterclass in storytelling,
              blending grit, heart, and timeless themes with unparalleled
              precision.
            </p>
          </div>

          {/* Card section */}
          <div className="w-full flex  items-center justify-center ">
            <div className="w-full  ">
              <CausalSection8 />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div
          className="w-full xl:w-[40%] h-full bg-contain bg-no-repeat bg-bottom overflow-hidden  bg-transparent"
          style={{
            backgroundImage: `url(${rightsideimage.src})`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Section8;
