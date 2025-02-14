import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";

function Rightside() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`mx-auto w-full rounded-lg  p-4  ${
        isDarkMode ? "bg-[#212121] text-[#ffffff]" : " bg-white businesslable"
      } `}
    >
      Rightside
    </div>
  );
}

export default Rightside;
