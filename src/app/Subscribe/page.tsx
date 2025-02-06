"use client";

import React, { useEffect } from "react";
import Header from "../componets/Category/Header";
import SubscribeCard from "../componets/Subscribe/SubscribeCard";
import Heading from "../componets/Heading/Heading";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setDarkMode } from "../store/Slice/darkModeSlice";
import SameTypeCard from "../componets/homesection/Section9/SameTypeCard";
import Card3 from "../componets/homesection/Section9/Card3";
import Card2 from "../componets/homesection/Section9/Card2";

function Subscribe() {
  const dispatch = useAppDispatch();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  // Ensuring dark mode state is loaded from localStorage on initial load
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    if (savedMode !== isDarkMode) {
      dispatch(setDarkMode(savedMode));
    }
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch, isDarkMode]);

  console.log("My business is:!!!!!!!!!!!!!!!!!!!!!!!!!!!!", isDarkMode);
  return (
    <div
      className={`h-auto w-full  ${isDarkMode ? " bg-[#181818]" : " bg-white"}`}
    >
      {/* header  */}
      <div>
        <Header />
      </div>

      {/* heading */}

      <div className="mt-[3rem] w-full xl:mt-[5rem]">
        <Heading
          title="Our Pricing Plam "
          highlightedTitle="  Affordable price Packages"
        />
      </div>

      {/* card */}
      <div
        className={`mx-auto mt-[3rem] grid w-[90%] grid-cols-1 items-center justify-between gap-6 md:grid-cols-2 xl:mt-[5rem] xl:w-[80%] xl:grid-cols-3 2xl:w-[60%]   ${
          isDarkMode ? " " : ""
        }`}
      >
        <SameTypeCard />
        <Card2 />
        <Card3 />
      </div>
    </div>
  );
}

export default Subscribe;
