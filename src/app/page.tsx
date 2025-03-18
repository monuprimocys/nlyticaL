"use client";

import HomeHeroSection from "./componets/homesection/HomeHeroSection";
import HomeSectionSerachBox from "./componets/homesection/HomeSectionSerachBox";
import Section4 from "./componets/homesection/Section4";
import Services from "./componets/homesection/ServicesSection3/Services";
import Section6 from "./componets/homesection/Section6";
import Section7 from "./componets/homesection/Section7";
import Section8 from "./componets/homesection/Section8/Section8";
import Section9 from "./componets/homesection/Section9/Section9";
import SponsorStores from "./componets/homesection/SponsorStores/SponsorStores";
import NewCities from "./componets/homesection/NewCities/NewCities";
import { setDarkMode } from "./storeApp/Slice/darkModeSlice";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { useEffect, useState } from "react";
import { fetchMetadata } from "./utils/fetchMetadata";

export default function Home() {
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

  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    async function loadMetadata() {
      const data = await fetchMetadata("https://www.youtube.com/results?search_query=how+to+add+live+++preview+in+website");
      setMetadata(data);
    }
    loadMetadata();
  }, []);

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
