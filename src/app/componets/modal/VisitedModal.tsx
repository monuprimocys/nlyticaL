"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // For handling cookies
import locationicon from "../../../../public/assets/Image/locationcontact.png";
import Image from "next/image";
import "./style.css";
import { MdMyLocation } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/store/Slice/modalSlice";
const VisitedModal = () => {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasVisited = Cookies.get("hasVisited");

    if (!hasVisited) {
      setIsVisible(true);
      Cookies.set("hasVisited", "true", { expires: 365 });
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0    bg-black bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-[#1D2537] mt-12 ml-12 p-6 isvistedvbordercolor    rounded-lg shadow-lg    w-[27%]">
        {/*  location icon and location desctiption */}

        <div className=" w-full   flex gap-2   ">
          <div className=" h-5 w-5 flex  justify-center  items-center">
            <Image
              src={locationicon}
              alt="Location icon"
              className=" w-full h-full object-contain"
            />
          </div>
          <div>
            <p className=" line-clamp-1  text-white  font-poppins">
              We Need Your Location to Enhance Your Experience.
            </p>
          </div>
        </div>

        {/* current location input box  and manual location */}

        <div className="w-full flex mt-5 justify-between items-center space-x-4">
          {/*  btn 1 */}
          <div className="relative mt-2 flex items-center bg-transparent group py-3  cursor-pointer  hover:bg-[#5465ff] rounded-lg border border-[#5465ff] ">
            <span className="absolute  flex h-[3rem] w-[3rem] items-center group-hover:text-white justify-center rounded-full   ">
              <MdMyLocation className=" text-[#5465ff]  text-lg  group-hover:text-white" />
            </span>
            <button className="font-poppins  w-full rounded-md  text-[#5465ff]  group-hover:text-white  bg-transparent  pr-3 pl-[3rem]  placeholder-[#5465ff] focus:border-[#5465ff] focus:outline-none focus:ring-[#5465ff]">
              {" "}
              Use Current Location
            </button>
          </div>
          <div className=" text-white font-poppins text-lg">OR</div>
          {/*  btn 2 */}

          <div
            className="flex justify-center items-center mt-2"
            onClick={() => {
              dispatch(showModal("SelectLocationVisite"));
            }}
          >
            <button
              type="button"
              className="px-6 py-3 bg-[#5465ff] font-poppins   text-white rounded-lg font-medium transition duration-300"
            >
              Select Manually
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitedModal;
