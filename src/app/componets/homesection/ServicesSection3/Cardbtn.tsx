import React from "react";
import "./cardStyle.css";
import homeimage from "../../../../../public/assets/Image/category.png";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/hooks/hooks";

function Cardbtn() {
  const router = useRouter();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className="w-[8rem] h-[11rem] flex flex-col gap-1 overflow-x-hidden justify-between items-center cursor-pointer"
      onClick={() => router.push("/category")}
    >
      {/* Card Image Section */}
      <div
        className={`w-full h-[70%] flex justify-center items-center bg-[#0046AE0F] rounded-lg   ${
          isDarkMode &&
          `bg-[#212121] text-white text-center transition duration-300 ease-in-out`
        }`}
      >
        <div
          className=" w-[50%]  h-[50%] bg-cover "
          style={{
            backgroundImage: `url(${homeimage.src})`,
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      {/* Card Content Section */}
      <div className="w-full h-[30%] flex justify-center items-center">
        <p className={`font-poppins text-black text-center line-clamp-2  ${
          isDarkMode &&
          `text-white transition duration-300 ease-in-out`
        }`}>
          Popular Categories
        </p>
      </div>
    </div>
  );
}

export default Cardbtn;
