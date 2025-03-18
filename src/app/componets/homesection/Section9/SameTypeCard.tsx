"use client";
import { useServicePlane } from "@/app/storeApp/api/useserviceplane";
import bgvectoreimage from "../../../../../public/assets/Image/bg-s.png";
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { ToastContainer, toast } from "react-toastify";
import "./style.css";

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

  return (
    <div className="w-full   h-[28rem] relative   cursor-pointer">
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
          <div className="w-full flex justify-start items-start gap-4 flex-col p-6">
            <div className="flex flex-col gap-4">
              <h2 className="text-[#0046AE] font-medium font-poppins text-2xl">
                {data?.subscriptionDetail[0].plan_name}
              </h2>
              <p
                className={` font-poppins text-lg line-clamp-1   ${
                  isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
                }`}
              >
                {data?.subscriptionDetail[0].description}
              </p>
            </div>

            {/* price detail */}
            <div className="flex">
              <div>
                <h2
                  className={`text-[#000000] font-medium font-poppins text-xl   ${
                    isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
                  }`}
                >
                  <span className="font-poppins font-semibold text-3xl relative bottom-[1px]">
                    {data?.subscriptionDetail[0].price}
                  </span>
                  <span className="text-[#0046AE] font-poppins font-semibold text-[16px]">
                    / PER MONTH
                  </span>
                </h2>
              </div>
            </div>
            <div className=" w-full  h-[1px] bg-opacity-[15%] rounded-xl bg-black"></div>
            {/* listing */}
            <div className="flex flex-col gap-2">
              <ul className="flex flex-col gap-4">
                {data?.subscriptionDetail?.[0]?.plan_services?.map(
                  (service, index) => (
                    <li className="flex gap-2 items-center" key={index}>
                      <div className="w-5 h-5">
                        {service.status === 1 ? (
                          <FaCheckCircle className="w-full h-full text-[#0046AE]" />
                        ) : (
                          <FaRegCircleCheck
                            className={`w-full h-full  ${
                              isDarkMode ? " text-white" : ""
                            }`}
                          />
                        )}
                      </div>
                      <p
                        className={` font-poppins text-[16px]   ${
                          isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
                        }`}
                      >
                        {service.plan_services}
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>
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
