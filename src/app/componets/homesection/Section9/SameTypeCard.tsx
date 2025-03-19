"use client";
import { useServicePlane } from "@/app/storeApp/api/useserviceplane";
import bgvectoreimage from "../../../../../public/assets/Image/bg-s.png";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { ToastContainer, toast } from "react-toastify";
import "./style.css";
import parse from "html-react-parser";

function SameTypeCard() {
  const { data, isLoading, refetch } = useServicePlane();
  const router = useRouter(); // Initialize the router
  const subscriber_user = Cookies.get("subscriber_user");

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const user_id = Cookies.get("user_id");

  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (subscriber_user === "1") {
      toast.error("You have already purchased a plan");
      return; // Do not proceed with navigation
    }
    // Ensure plan data is available before extracting
    if (data?.subscriptionDetail?.[0]) {
      const plan = data?.subscriptionDetail[0];

      // Extract the numeric value from the plan price by removing the ¥ symbol
      const numericPrice = plan.price;

      // Store the plan data in session storage
      sessionStorage.setItem("planName", plan.plan_name);
      sessionStorage.setItem("planPrice", numericPrice);

      // Navigate to the payment page
      if (user_id) {
        router.push("/Payment");
      } else {
        dispatch(showModal("loginModal"));
      }
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const [planeName, setPlaneName] = useState(null);

  // Fetch the cookie value on component mount
  useEffect(() => {
    const currentPlaneName = Cookies.get("plane_name") || null;
    setPlaneName(currentPlaneName);
    console.log("Initial plane_name:", currentPlaneName);
  }, []);

  // Listen for updates to the cookie value
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedPlaneName = Cookies.get("plane_name") || null;
      if (updatedPlaneName !== planeName) {
        setPlaneName(updatedPlaneName);
        console.log("Updated plane_name:", updatedPlaneName);
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [planeName]);

  console.log(
    " my  api responce  from geting subcription plan ",
    data?.subscriptionDetail[0]
  );

  return (
    <div className="w-full  h-fit relative   cursor-pointer">
      {/* Content (with white background color) */}
      <div
        className={`w-full  min-h-full   z-10 shadow rounded-xl  ${
          isDarkMode ? "bg-[#212121]  border-2 border-[#FFFFFF66]" : ""
        }
        
        `}
        style={{
          backgroundImage: `url(${bgvectoreimage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className={`w-full h-full  rounded-lg     ${
            subscriber_user === "1" &&
            planeName === "Startup" &&
            "linearcolor  "
          } `}
        >
          <div className="w-full flex flex-col gap-4 p-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-[#0046AE] font-medium font-poppins text-2xl">
                {data?.subscriptionDetail[0].plan_name}
              </h2>
            </div>
            {/* Price Detail */}
            <div className="flex">
              <h2
                className={`text-xl font-medium font-poppins ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                <span className="font-semibold text-3xl relative bottom-[1px]">
                  {data?.subscriptionDetail?.[0]?.price}
                </span>
                <span className="text-[#0046AE] font-semibold text-[16px]">
                  / PER MONTH
                </span>
              </h2>
            </div>

            {/* Separator Line */}
            <div className="w-full h-[1px] bg-black bg-opacity-15 rounded-xl"></div>

            {/* Subscription List */}
            <ul className="flex flex-col gap-4">
              {parse(data?.subscriptionDetail?.[0]?.description || "").map(
                (item, index) => (
                  <li className="flex gap-2 items-center" key={index}>
                    <div className="w-5 h-5">
                      <FaCheckCircle className="w-full h-full text-[#0046AE]" />
                    </div>
                    <p
                      className={`text-[16px] font-poppins ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {item}
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* btn */}
          <div className="w-full p-4">
            {/* subscriber_user values 1 and name values then bg colr black  */}
            <button
              onClick={handleClick} // Adding the onClick handler to the button
              className={` text-white   bg-[#0046AE] font-semibold font-poppins text-lg text-center py-3 rounded-lg w-full   ${
                subscriber_user === "1" &&
                planeName === "Startup" &&
                " bg-green-600"
              }  `}
            >
              {subscriber_user === "1" && planeName === "Startup"
                ? "Active Plan"
                : `Choose Plan  ${data?.subscriptionDetail[0].price}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SameTypeCard;
