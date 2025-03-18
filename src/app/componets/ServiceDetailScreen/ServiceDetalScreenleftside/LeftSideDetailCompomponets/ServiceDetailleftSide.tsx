"use client";

import React, { useState } from "react";
import Image from "next/image";
import arrowright from "../../../../../../public/assets/Image/arrow-right.png";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useDispatch } from "react-redux";
import video from "../../../../../../public/assets/lottie_search_anim/lottie_search_anim/Animation - 1736233762512.gif";
import { useAppSelector } from "@/app/hooks/hooks";
import { setCards } from "@/app/storeApp/Slice/cardsSlice"; // Import the setCards action
import { usePathname } from "next/navigation";
import { decodeString } from "@/app/utils/enocodeAndDecode";

function ServiceDetailleftSide() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const lastSegment1 = pathname.split("/").filter(Boolean).pop() || "";

  const lastSegment = decodeString(lastSegment1);
  const { data, error, isLoading, refetch } = useServiceDetailApi(lastSegment);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const cardData = useAppSelector((state) => state.cards.cards);

  const storedata = data?.stores;
  const [showAll, setShowAll] = useState(false); // State to control showing all cards

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Slice the data to show only the first 2 cards initially
  const displayedStores = showAll ? storedata : storedata?.slice(0, 2);

  const handleStoreDetail = (store) => {
    // Dispatching the clicked store's data to the Redux store
    dispatch(setCards([store])); // Only store the clicked card's data
    dispatch(showModal("StoresDetailModal"));
  };

  console.log(" my store detail##########", cardData);

  return (
    <div
      className={`w-full h-auto rounded-xl p-4 flex flex-col ${
        isDarkMode
          ? "text-white bg-[#212121]"
          : "text-black photoservicedetailborderandshado"
      }`}
    >
      <div className="text-lg font-medium items-start font-poppins">
        Services
      </div>

      {displayedStores?.map((store) => (
        <div
          key={store.id}
          className={`w-full h-32 rounded-xl cursor-pointer flex mt-3 ${
            isDarkMode
              ? "text-white bg-[#FFFFFF05]"
              : "text-black bordercolorcard"
          }`}
          onClick={() => handleStoreDetail(store)} // Pass the specific store to the handler
        >
          <div
            className="w-[25%] h-full flex items-center justify-center"
            style={{
              backgroundImage: `url(${store.store_images[0] || ""})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="w-full flex flex-col items-center p-4 gap-4">
            <div className="w-full flex justify-between items-center">
              <div
                className={`text-sm font-poppins font-medium ${
                  isDarkMode ? "text-white" : "text-[#0046AE]"
                }`}
              >
                {store.store_name}
              </div>
              <Image
                src={arrowright || ""}
                alt="right-arrow"
                className="w-4 h-4 object-center"
              />
            </div>

            <div className="w-full flex justify-start items-start">
              <p
                className={`font-poppins line-clamp-3 text-sm ${
                  isDarkMode ? "text-white" : "text-[#535353]"
                }`}
              >
                {store.store_description}
              </p>
            </div>
          </div>
        </div>
      ))}

      {displayedStores?.length === 0 && (
        <div className="flex h-auto min-h-[20rem] w-full flex-col items-center justify-center text-center">
          <div className="flex h-[8rem] w-[8rem] items-center justify-center">
            <Image
              src={video || ""}
              alt="Loading animation"
              width={100}
              height={100}
            />
          </div>
          <h2
            className={`font-poppins font-medium ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            No Data Found
          </h2>
        </div>
      )}

      {displayedStores && displayedStores.length >= 2 && (
        <div className="w-full flex justify-center items-center mt-4">
          <button
            onClick={() =>
              dispatch(showModal("ServiceDetailScreenFiltterModal"))
            } // Last image click
            className="text-[#0046AE] font-poppins font-medium btnbordercolor px-8 py-2 rounded-md"
          >
            {showAll ? "Close" : "All Services"} {/* Toggle button text */}
          </button>
        </div>
      )}
    </div>
  );
}

export default ServiceDetailleftSide;
