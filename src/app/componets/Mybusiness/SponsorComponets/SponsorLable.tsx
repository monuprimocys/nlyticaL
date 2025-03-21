"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import React from "react";
import SponsorLableicon from "../../../../../public/assets/Image/Sponsor.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetAllCompain } from "@/app/storeApp/api/useGetAllCompain";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
function SponsorLable() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const router = useRouter();

  const sponcer_id = Cookies.get("businesspaymentsuccess");
  const { data } = useGetAllCompain();

  console.log(
    " my  sponce id is sponcer_idsponcer_idsponcer_idsponcer_idsponcer_id ",
    sponcer_id
  );

  console.log(" my  api responce data is", data?.campaignData);

  const disptach = useAppDispatch();

  const is_store = Cookies.get("is_store");

  const subscriber_user = Cookies.get("subscriber_user");
  const handleCardClick = () => {
    if (Number(subscriber_user) === 0) {
      dispatch(showModal("CheackStoreAdd"));
      dispatch(hideModal("CheackStoreandPlaneModal"));
    } else if (Number(subscriber_user) === 1) {
      dispatch(showModal("CheackStoreandPlaneModal"));
    } else {
      router.push(`/business/Sponsor`);
    }
  };
  

  const dispatch = useAppDispatch();
  return (
    <div
      className={`mx-auto 2xl:w-[60%] xl:w-[80%] w-[90%] mt-[3rem]    rounded-lg gap-6   py-6 md:py-10 px-6 md:px-16  ${
        isDarkMode ? "bg-[#212121] text-[#ffffff]" : " bg-white businesslable"
      } `}
    >
      <div className=" w-full v flex flex-col md:flex-row gap-4 justify-between items-center h-auto">
        {/*  left side desing  */}

        <div className=" w-full flex gap-2">
          <h4
            className={` font-poppins text-xl   font-medium     ${
              isDarkMode ? "text-[#ffffff]" : "text-[#212121]"
            }`}
          >
            Grow Your{" "}
            <span className=" text-[#FF5249] ">Business By Boosting</span>{" "}
          </h4>
          <div>
            <Image
              src={SponsorLableicon}
              alt="Sponsor Lable"
              className="w-[25px] h-[25px] object-contain"
            />
          </div>
        </div>

        {sponcer_id === "1" ? (
          // Show "Sponsor Now" button if sponcer_id is 0

          <div
            className="md:w-[50%]  xl:w-[60%]  2xl:w-[50%] w-full cursor-pointer rounded-xl py-2 bg-[#ACD4F7] flex flex-col gap-2 md:justify-end justify-center items-end px-3"
            onClick={() => {
              dispatch(showModal("SponcerModalAfterAdd"));
            }}
          >
            <p className="font-poppins text-lg font-normal">
              Your Store has been sponsored
            </p>
            <p className="font-poppins text-lg font-semibold text-black">
              From: {data?.campaignData[0]?.goals[0]?.start_date} to{" "}
              {data?.campaignData[0]?.goals[0]?.end_date}
            </p>
          </div>
        ) : (
          // Show sponsored message if sponcer_id is NOT 0
          <div
            className="w-full flex md:justify-end justify-center items-center"
            onClick={handleCardClick}
          >
            <button className="py-3 px-6 text-white rounded-md font-poppins bg-[#0046AE]">
              Sponsor Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SponsorLable;
