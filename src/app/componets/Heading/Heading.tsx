import { HeadingcontentProps } from "@/app/types/Restypes";
import React from "react";

const Heading: React.FC<HeadingcontentProps> = ({
  title,
  highlightedTitle,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center">
      <h4 className="text-[#0046AE] AmericanSign text-3xl md:text-4xl font-medium">
        {title}
      </h4>
      <h4 className="text-[#000000] font-poppins text-4xl md:text-5xl font-bold tracking-wide">
        {highlightedTitle}
      </h4>
    </div>
  );
};

export default Heading;
