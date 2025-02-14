import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";
import "./Sponsorleftside.css";
import { MdExpandLess } from "react-icons/md";
import CompaineName from "./CompaineName";
import SponserLocationFilter from "./SponserLocationFilter";
import GoogleMapInputBoxSponser from "./GoogleMapInputBoxSponser";
import AudienceDetails from "./AudienceDetails";
function LeftSide() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={` w-full  rounded-lg  ${
        isDarkMode ? "bg-[#212121] text-[#ffffff]" : " bg-white businesslable"
      } `}
    >
      {/*  btn  */}

      <div className=" w-full  leftsidesponsor  rounded-t-lg cursor-pointer bg-[#0046ae0a] flex justify-between p-4">
        <p className=" font-poppins  text-lg  font-normal">Add New Campaign</p>
        <MdExpandLess className=" text-3xl" />
      </div>

      {/*  when clikc on btn then opne  */}
      <div className=" w-full flex flex-col gap-4   h-auto   py-4 px-6">
        <CompaineName />
        <GoogleMapInputBoxSponser />
        <AudienceDetails />
      </div>
    </div>
  );
}

export default LeftSide;
