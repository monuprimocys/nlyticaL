import { useAppSelector } from "@/app/hooks/hooks";
import { HeadingcontentProps } from "@/app/types/Restypes";
import React from "react";

const Heading: React.FC<HeadingcontentProps> = ({
  title,
  highlightedTitle,
}) => {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  return (
    <div className="flex flex-col items-center justify-center w-full text-center">
      <h4
        className={` AmericanSign text-3xl md:text-4xl font-medium  ${
          isDarkMode ? "text-white" : "text-[#0046AE]"
        }`}
      >
        {title}
      </h4>
      <h4
        className={` font-poppins text-4xl md:text-5xl font-bold tracking-wide  ${
          isDarkMode ? "text-white" : " text-black"
        }`}
      >
        {highlightedTitle}
      </h4>
    </div>
  );
};

export default Heading;
