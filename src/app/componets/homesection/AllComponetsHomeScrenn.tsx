"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";
import React, { useEffect } from "react";
import HomeHeroSection from "./HomeHeroSection";
import HomeSectionSerachBox from "./HomeSectionSerachBox";
import Services from "./ServicesSection3/Services";
import Section4 from "./Section4";
import SponsorStores from "./SponsorStores/SponsorStores";
import NewCities from "./NewCities/NewCities";
import Section6 from "./Section6";
import Section7 from "./Section7";
import Section8 from "./Section8/Section8";
import Section9 from "./Section9/Section9";
import { useHomeScreenApi } from "@/app/storeApp/api/useHomeScreenApi";
import AvatarWithSpinner from "../Loading/AvatarWithSpinner";

function AllComponetsHomeScrenn() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const dispatch = useAppDispatch();

  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  const { isLoading } = useHomeScreenApi();

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <AvatarWithSpinner />
      </div>
    );
  }

  return (
    <div
      className={` h-auto w-full    ${
        isDarkMode ? " bg-[#181818]" : "  bg-white"
      }  `}
    >
      <HomeHeroSection />
      <HomeSectionSerachBox />
      <Services />
      <Section4 />
      <SponsorStores />
      <NewCities />
      <Section6 />
      <Section7 />
      <Section8 />
      <Section9 />
    </div>
  );
}

export default AllComponetsHomeScrenn;
