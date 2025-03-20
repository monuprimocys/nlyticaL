"use client";

import { useUpdateProfileMutation } from "@/app/storeApp/api/auth/ProfileUpdate";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import image from "../../../../public/assets/Image/Homesection8card.png";
import { useAppSelector } from "@/app/hooks/hooks";
import Link from "next/link";
import useTranslation from "@/app/hooks/useTranslation";

function HomeHeroSection() {
  const { data, isLoading } = useHomeScreenApi();

  // Ensure slides are available before applying logic

  const currentSlide = data?.slides[0];
  const title = currentSlide?.title;
  const words = title?.split(" "); // Split the title into words
  const filteredTitle = words?.slice(2).join(" "); // Remove the first two words and join the remaining

  const user_id = Cookies.get("user_id");

  const [triggerUpdateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    if (user_id) {
      triggerUpdateProfile({ user_id }).then((response) => {
        if (response?.data) {
          console.log(" my responce api ", response.data.is_store);
          Cookies.set("is_store", response.data?.is_store);
          Cookies.set("store_approval", response.data?.store_approval);
          Cookies.set("service_id", response.data?.service_id);
          Cookies.set("subscriber_user", response.data?.subscriber_user);
          Cookies.set("sponcer_id", response.data.campaign);
          Cookies.set("email", response.data.userdetails.email);
          Cookies.set("mobile", response.data.userdetails.mobile);
          Cookies.set(
            "plane_name",
            response.data.subscriptionDetails.plan_name
          );
          console.log(
            " my plane  name ",
            response.data.subscriptionDetails.plan_name
          );
          const name =
            response.data?.subscriptionDetails.plan_name.split(" ")[0];
          Cookies.set(
            "plane_name",
            response.data?.subscriptionDetails.plan_name.split(" ")[0]
          );
        }
      });
    }
  }, [user_id, triggerUpdateProfile]);

  const { getTranslation } = useTranslation();

  return (
    <div className=" w-full h-auto">
      <div
        className="w-full xl:h-[600px] 2xl:h-[650px] flex items-center xl:bg-cover bg-no-repeat xl:bg-bottom xl:rounded-b-[8rem] 2xl:rounded-b-none h-[30rem] bg-center bg-cover rounded-b-[3rem] md:rounded-b-[5rem]"
        style={{
          backgroundImage: `url('${currentSlide?.image || image}')`,
        }}
      >
        <div className="mx-auto md:px-4 2xl:w-[80%] py-8 md:w-[90%] h-full w-[95%]">
          <div className="md:w-[95%] xl:w-[70%] 2xl:w-[65%] flex flex-col gap-4 mt-12 h-full w-full">
            <div className="w-full">
              <h1 className="font-poppins text-[#E3EEFF] font-[500] md:leading-[3.8rem] text-3xl sm:text-4xl line-clamp-2 md:text-5xl 2xl:text-5xl 2xl:leading-[3.8rem]">
                {currentSlide?.title.split(" ")[0]}
                <span className="AmericanSign">
                  {currentSlide?.title?.split(" ")[1]}
                </span>{" "}
                {filteredTitle}
              </h1>
            </div>

            <div className="w-full h-[5rem] xl:h-[7rem] border-linecss rounded-l-2xl linear-color md:p-4 p-2 overflow-hidden">
              <div>
                <span className="text-[#E7E7E7] font-poppins text-[16px] text-wrap md:line-clamp-2 xl:line-clamp-3">
                  {currentSlide?.body}
                </span>
              </div>
            </div>

            <div className="mt-3">
              {data?.slides?.[0]?.link && (
                <Link href={data.slides[0].link} target="_blank">
                  <button
                    type="button"
                    className="px-4 py-3 bg-white rounded-lg w-fit font-poppins text-[#0046AE] font-[500] flex justify-center items-center hover:bg-slate-200"
                  >
                    {getTranslation("Explore More", "Explore More")}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHeroSection;
