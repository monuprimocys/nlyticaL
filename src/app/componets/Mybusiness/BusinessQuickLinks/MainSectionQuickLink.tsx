import React from "react";
import "../businesscss.css";
import EditProfile from "./EditProfile";
import AddPhotos from "./AddPhotos";
import AddContact from "./AddContact";
import BusinessTimings from "./BusinessTimings";
import Reviews from "./Reviews";
import AddWebsite from "./AddWebsite";
import AddVideo from "./AddVideo";
import AddSocialLinks from "./AddSocialLinks";
import { useAppSelector } from "@/app/hooks/hooks";

function MainSectionQuickLink() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`mx-auto 2xl:w-[60%] xl:w-[80%] w-[90%] mt-[3rem]    gap-5 flex-col rounded-lg py-10 px-6 md:px-16 flex  justify-center   items-center    ${
        isDarkMode ? "bg-[#212121]  " : "bg-[#ffffff]   businesslable"
      }`}
    >
      {/*  heading */}

      <div className=" w-full flex justify-center  flex-col items-center  gap-1">
        <h3
          className={`   font-poppins  text-xl  font-medium   ${
            isDarkMode ? "text-[#ffffff]  " : "text-[#000000]  "
          }`}
        >
          Quick Links
        </h3>
        <p
          className={`font-normal  font-poppins   text-[16px]   ${
            isDarkMode ? "text-[#FFFFFF9E]  " : "text-[#848484]  "
          } `}
        >
          Quick Links: Your Gateway to Essential Resources
        </p>
      </div>

      {/*   all type of links  */}
      <div className=" w-full flex     gap-4  md:gap-7 flex-wrap justify-center     ">
        <EditProfile />
        <AddPhotos />
        <AddContact />
        <BusinessTimings />
        <Reviews />
        <AddWebsite />
        <AddVideo />
        <AddSocialLinks />
      </div>
    </div>
  );
}

export default MainSectionQuickLink;
