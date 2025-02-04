"use client";
import React, { useMemo } from "react";
import "../style.css";
import Profile from "@/app/componets/Profile/ProfileForm";
import Myreview from "../Myreview/page";
import TermCondition from "../TermCondition/page";
import Privacypolicy from "../Privacypolicy/page";
import Favorite from "../MyFavorite/Page";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";

function Rightside() {
  // Get active component from Redux store
  const activeComponent = useSelector(
    (state) => state.activeComponent.activeComponent
  );

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={` w-full h-auto rounded-xl xl:px-6 xl:py-10   ${
        isDarkMode
          ? "dark:bg-[#212121] dark:text-white"
          : "bg-white text-gray-800 rightsidebordershadow"
      }`}
    >
      {/* Render component based on active component from Redux */}
      {activeComponent === "Profile" && <Profile />}
      {activeComponent === "Favorite" && <Favorite />}
      {activeComponent === "My review" && <Myreview />}
      {activeComponent === "Privacy Policy" && <Privacypolicy />}
      {activeComponent === "Terms and Condition" && <TermCondition />}
    </div>
  );
}

export default Rightside;
