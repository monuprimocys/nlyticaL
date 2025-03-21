"use client";

import React, { useEffect, useState } from "react";
import "../serviceDetailleftside.css";
import avatar from "../../../../../../public/assets/Image/avatar.png";
import { IoIosStarHalf } from "react-icons/io";
import { MdOutlineStar } from "react-icons/md";
import Image from "next/image";
import locationicon from "../../../../../../public/assets/Image/locationicon.png";
import msgicon from "../../../../../../public/assets/Image/message-text.png";
import whatshop from "../../../../../../public/assets/Image/whatshopdetail.png";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useUserChatList } from "@/app/storeApp/api/message/userChatList";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import Cookies from "js-cookie";
import { useServiceLead } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceLead";
import { toast } from "react-toastify";
import { decodeString } from "@/app/utils/enocodeAndDecode";
import { showModal } from "@/app/storeApp/Slice/modalSlice";

function SecondSection() {
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";

  const service_id = decodeString(lastSegment1);

  const { mutate } = useServiceLead();

  const handalcallapi = () => {
    // Call the API
    mutate(service_id, {
      onSuccess: (data) => {
        console.log("API success:", data);
      },
      onError: (error) => {
        console.error("API error:", error);
      },
    });
  };

  const ServiceDetailData = useAppSelector((state) => state.serviceDetail);

  const rating = ServiceDetailData.serviceDetail.totalAvgReview;
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const vendorDetails = ServiceDetailData.vendorDetails;
  console.log(" my  detail  scren notification", vendorDetails.mobile);
  const router = useRouter();

  const from_id = Cookies.get("detail_id");
  // when clikc on  message btn
  const { data: userdetail, error, isLoading } = useServiceDetailApi(from_id);

  const searchQuery = useSelector(
    (state: { search: { query: string } }) => state.search.query
  );

  const { refetch, data } = useUserChatList(searchQuery);

  console.log("my data @@@@@@@@@@@@@@", data);

  const service_id12 = Cookies.get("service_id");

  const dispatch = useDispatch();

  const handleAddChatList = async () => {
    if (!Cookies.get("user_id")) {
      dispatch(showModal("loginModal"));
      return;
    }

    const lastSegment = sessionStorage.getItem("serviceId");

    // Check if lastSegment and service_id are the same
    if (lastSegment === service_id12) {
      toast.error(" You can't connect to your own store.");
    } else {
      router.push("/message");
      Cookies.set("VendorDetailsId", vendorDetails.id.toString());
      handalcallapi();
    }
  };

  const [shopStatus, setShopStatus] = useState("");

  useEffect(() => {
    if (!ServiceDetailData) return;

    const { open_time, close_time, open_days, closed_days } =
      ServiceDetailData.serviceDetail;

    console.log("My Open Days:", open_days);
    console.log("My Closed Days:", closed_days);

    // Get today's day (e.g., "Mon", "Tue", "Wed")
    const today = new Date().toLocaleString("en-US", { weekday: "short" });

    console.log(" my current daya ", today);

    // Check if today is in the closed days list
    if (closed_days.includes(today)) {
      setShopStatus("Closed Today");
      return;
    }

    // Check if today is in the open days list
    if (!open_days.includes(today)) {
      setShopStatus("Closed Today");
      return;
    }

    // Convert open and close times to Date objects
    const currentTime = new Date();
    const openDate = new Date();
    const closeDate = new Date();

    // Function to parse time format (HH:MM AM/PM)
    const parseTime = (timeStr) => {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return { hours, minutes };
    };

    const openParsed = parseTime(open_time);
    const closeParsed = parseTime(close_time);

    openDate.setHours(openParsed.hours, openParsed.minutes, 0);
    closeDate.setHours(closeParsed.hours, closeParsed.minutes, 0);

    // Determine if shop is open or closed
    if (currentTime >= openDate && currentTime <= closeDate) {
      setShopStatus(`Open Until ${close_time}`);
    } else {
      setShopStatus("Closed");
    }
  }, [ServiceDetailData]);

  const openclosetime = ServiceDetailData.serviceDetail.close_time;

  console.log("  my shop opne close time ", openclosetime);

  return (
    <div
      className={`w-full h-full  p-4 flex flex-col rounded-2xl gap-2 md:gap-4 shadow-left-side    ${
        isDarkMode
          ? "text-[#ffffff] bg-[#212121]"
          : " bg-[#ffffff] photoservicedetailborderandshado"
      }`}
    >
      {/* Profile Section */}
      <div className="w-full h-auto flex justify-start items-center gap-4">
        {/* Avatar */}
        <div
          className="md:w-12 md:h-11 w-10 h-9 rounded-full bg-[#0046AE] flex justify-center items-center cursor-pointer bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${
              ServiceDetailData.vendorDetails.image || whatshop
            })`,
          }}
        ></div>
        {/* Name Section */}
        <div
          className={`w-full flex justify-start mt-1 items-center gap-2 line-clamp-1  font-poppins font-medium  ${
            isDarkMode ? "text-[#ffffff]" : "text-[#636363]"
          }`}
        >
          <h5>{ServiceDetailData.vendorDetails.first_name}</h5>
          <h5>{ServiceDetailData.vendorDetails.last_name}</h5>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full h-auto flex items-center justify-between">
        {/* Left Side */}
        <div className="w-full h-auto flex flex-col gap-2">
          <h5
            className={` font-poppins font-medium text-xl cursor-pointer line-clamp-1 ${
              isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
            }`}
          >
            {ServiceDetailData.serviceDetail.service_name}
          </h5>
          {/* Star Rating */}
          <div className="w-full flex justify-start items-center gap-4">
            <div className="flex gap-1 font-poppins">
              {[...Array(Math.floor(rating))].map((_, index) => (
                <MdOutlineStar
                  key={`full-${index}`}
                  className="text-[#FFA41C]"
                />
              ))}
              {rating % 1 !== 0 && <IoIosStarHalf className="text-[#FFA41C]" />}
              {[...Array(5 - Math.ceil(rating))].map((_, index) => (
                <MdOutlineStar
                  key={`empty-${index}`}
                  className="text-[#D1D1D1]"
                />
              ))}
            </div>
            <div className="flex justify-start items-center gap-1">
              <p
                className={` font-poppins font-normal text-sm cursor-pointer  ${
                  isDarkMode ? "text-[#ffffff]" : "text-[#5C5C5C]"
                }`}
              >
                ({ServiceDetailData.serviceDetail.totalReviewCount} Review)
              </p>
            </div>
          </div>
          {/* Location */}
          <div className="flex gap-2 w-full  cursor-pointer">
            <div className="flex-shrink-0">
              <div className="md:w-6 md:h-6 w-5 h-5">
                <Image
                  src={locationicon || whatshop}
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </div>
            <div>
              <p
                className={` font-poppins font-normal pt-[1.5px] text-sm line-clamp-2 ${
                  isDarkMode ? "text-[#ffffff]" : "text-[#636363]"
                }`}
              >
                {ServiceDetailData.serviceDetail.address}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full h-auto flex flex-col gap-2">
          <p
            className={` font-poppins text-sm w-full flex justify-end items-end  ${
              isDarkMode ? "text-[#ffffff]" : "text-[#636363]"
            }`}
          >
            {ServiceDetailData.serviceDetail.total_years_count} Years in
            Business
          </p>
          <div className="w-full justify-end flex items-end gap-2">
            <span className="font-poppins text-[#4CAF50] text-sm">
              {shopStatus.includes("Closed") ? (
                <span className="text-[#FF0000]">{shopStatus}</span>
              ) : (
                <>
                  Open{" "}
                  <span
                    className={`font-poppins ${
                      isDarkMode ? "text-[#ffffff]" : "text-[#636363]"
                    }`}
                  >
                    Until {ServiceDetailData.serviceDetail.close_time}
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Button Section */}
      <div className="w-full h-auto gap-6 flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* Price Button */}
        <div
          className={`border-2 md:w-[60%] w-full border-[#0046AE] px-4 py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer   ${
            isDarkMode ? " bg-[#0046AE2B]" : ""
          }`}
        >
          <button className="text-[#0046AE] font-medium font-poppins group-hover:text-white z-10 relative">
            From {ServiceDetailData.serviceDetail.price_range}
          </button>
          <div className="absolute top-0 left-0 w-full h-full bg-[#0046AE] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>

        {/* Message Button */}
        <div
          className="  md:w-[20%]  w-[40%] h-auto flex justify-center items-center gap-2 bg-[#0046AE] px-4 py-3 rounded-xl cursor-pointer"
          onClick={handleAddChatList}
        >
          <Image src={msgicon || whatshop} alt="" className="w-5 h-5" />
          <button className="text-white font-poppins">Message</button>
        </div>

        {/* WhatsApp Button */}
        <div
          className="md:w-[20%] w-[40%] h-auto flex justify-center items-center gap-2 bg-[#0046AE]  py-3 rounded-xl cursor-pointer"
          onClick={handalcallapi}
        >
          <a
            href={`https://wa.me/${ServiceDetailData.serviceDetail.service_phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex  gap-2 "
          >
            <Image
              src={whatshop || whatshop}
              alt="Whatsapp Icon"
              className="w-5 h-5"
            />
            <button className="text-white font-poppins">Whatsapp</button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SecondSection;
