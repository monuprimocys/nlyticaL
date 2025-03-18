import React from "react";
import LeftSideBox from "./LeftSideBox";
import RightSideBox from "./RightSideBox";
import { useAppSelector } from "@/app/hooks/hooks";
import "./messageBoxstyle.css";

function Messagelist() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className=" w-full ">
      <div
        className={`mx-auto  w-full h-auto md:w-[95%] xl:w-[80%]   rounded-xl md:grid md:grid-cols-[40%_60%]   grid-cols-1 2xl:grid-cols-[25%_75%] shadow-xl   ${
          isDarkMode ? "" : "main-borderclor"
        }`}
      >
        <LeftSideBox />
        <RightSideBox />
      </div>
    </div>
  );
}

export default Messagelist;
