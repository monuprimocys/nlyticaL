"use client";

import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";
import LeftSide from "./Leftsidesponsor/LeftSide";
import Rightside from "./RightsideSponser/Rightside";

function CombineLeftSideAndRightSide() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
 
  return (
    <div
      className={`mx-auto 2xl:w-[55%] xl:w-[80%] w-[90%] mt-[3rem]     gap-6    flex  lg:flex-row  flex-col ${
        isDarkMode ? "bg-[#212121] text-[#ffffff]" : " bg-white "
      } `}
    >
      <LeftSide />
      <Rightside />
    </div>
  );
}

export default CombineLeftSideAndRightSide;
