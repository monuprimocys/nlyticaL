import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";

function HeadingText({ text, text1 }: { text: string; text1: string }) {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <h3
        className={`AmericanSign text-3xl font-normal ${
          isDarkMode ? "text-[#ffffff]" : "text-[#0046AE]"
        }`}
      >
        {text}
      </h3>

      <h3
        className={`AmericanSign text-3xl font-normal ${
          isDarkMode ? "text-[#ffffff]" : "text-[#0046AE]"
        }`}
      >
        {text1}
      </h3>
    </div>
  );
}

export default HeadingText;
