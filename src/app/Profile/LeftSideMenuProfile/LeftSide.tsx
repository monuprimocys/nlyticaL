"use client";
import React, { useState, useEffect, useMemo } from "react";
import "../style.css";
import profileicon from "../../../../public/assets/Image/profile121212.png";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import policy from "../../../../public/assets/Image/policy.png";
import termcondition from "../../../../public/assets/Image/Terms&Condition.png";
import { CiDark, CiSun } from "react-icons/ci";
import language from "../../../../public/assets/Image/language-square.png";
import share from "../../../../public/assets/Image/share.png";
import feedback from "../../../../public/assets/Image/feednack.png";
import logouticon from "../../../../public/assets/Image/logout.png";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/store/Slice/modalSlice";
import { AiOutlineClose } from "react-icons/ai"; // Importing the close icon
import { CiUser } from "react-icons/ci";

interface LeftSideProps {
  setActiveComponent: (component: string) => void;
  activeComponent: string; // Add this to track active component in LeftSide
}

function LeftSide({ setActiveComponent, activeComponent }: LeftSideProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useMemo(() => {
    console.log("my active component is " + activeComponent);
  }, [activeComponent]);

  console.log("my active component ismonu " + activeComponent);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("darkMode", (!isDarkMode).toString());
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const dispatch = useDispatch();

  // current open state
  const handleProfileForm = () => {
    setActiveComponent("ProfileForm");
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <div className="flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#0046AE] p-4 xl:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          <span className="text-2xl">&#9776;</span> {/* Hamburger menu */}
        </button>
      </div>

      {/* Left Side Menu for Mobile and Desktop */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } scrollhide fixed left-0 top-[4rem] z-50 h-svh w-[18rem] overflow-y-auto rounded-r-lg bg-white px-4 transition-transform duration-300 ease-in-out md:top-[3.9rem] md:w-[24rem] xl:static xl:block xl:h-auto xl:w-auto xl:translate-x-0`}
      >
        {/* Close Icon */}
        <div className="absolute right-4 top-4 flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-[#0046AE] xl:hidden">
          <button onClick={() => setIsOpen(false)}>
            <AiOutlineClose className="text-xl text-white" />
          </button>
        </div>

        <div className="mt-10 grid h-auto w-full grid-cols-1 gap-6 pt-7 xl:pt-0">
          {/* Profile route */}
          <div
            className={`bordercolor flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg ${
              activeComponent === "ProfileForm"
                ? "bg-[#0046AE] text-white"
                : " text-black "
            }`}
            onClick={handleProfileForm}
          >
            <div
              className="flex items-center justify-center gap-2"
              id="bg-circle-icon"
            >
              <Image
                className={`h-6 w-6 object-cover ${
                  activeComponent === "ProfileForm" ? "bg-circle-icon" : "  "
                } `}
                src={profileicon}
                alt="Profile icon"
              />
              <div className="">
                <h5 className="font-poppins text-[18px] font-normal ">
                  Profile
                </h5>
              </div>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight className="text-xl " />
            </div>
          </div>

          {/* Favorites route */}
          <div
            className={`bordercolor flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg ${
              activeComponent === "MyFavorite"
                ? "bg-[#0046AE] text-white"
                : " text-black"
            }`}
            onClick={() => setActiveComponent("MyFavorite")}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center">
                <GoHeart className="font-poppins h-full w-full" />
              </div>
              <div className="">
                <h5 className="font-poppins text-[18px] font-normal ">
                  Favorites
                </h5>
              </div>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight className="text-xl " />
            </div>
          </div>

          {/* My review Route */}
          <div
            className={`bordercolor flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg ${
              activeComponent === "Myreview"
                ? "bg-[#0046AE]  text-white"
                : " text-black"
            }`}
            onClick={() => setActiveComponent("Myreview")}
          >
            <div className="flex items-center justify-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center">
                <FaRegStar className="font-poppins h-full w-full " />
              </div>
              <div className="">
                <h5 className="font-poppins text-[18px] font-normal ">
                  My review
                </h5>
              </div>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight className="text-xl" />
            </div>
          </div>

          {/* Privacy & Policy Route */}
          <div
            className={`bordercolor flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg ${
              activeComponent === "Privacypolicy"
                ? "bg-[#0046AE]  text-white"
                : " text-black"
            }`}
            onClick={() => setActiveComponent("Privacypolicy")}
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                className={`h-6 w-6 object-cover ${
                  activeComponent === "Privacypolicy" ? "bg-circle-icon" : "  "
                } `}
                src={policy}
                alt="Profile icon"
              />
              <div className="">
                <h5 className="font-poppins text-[18px] font-normal ">
                  Privacy & Policy
                </h5>
              </div>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight className="text-xl " />
            </div>
          </div>

          {/* Terms & Condition Route */}
          <div
            className={`bordercolor flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg ${
              activeComponent === "TermCondition"
                ? "bg-[#0046AE] text-white"
                : " text-black"
            }`}
            onClick={() => setActiveComponent("TermCondition")}
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                className={`h-6 w-6 object-cover ${
                  activeComponent === "TermCondition" ? "bg-circle-icon" : "  "
                } `}
                src={termcondition}
                alt="Profile icon"
              />
              <div className="">
                <h5 className="font-poppins text-[18px] font-normal ">
                  Terms & Condition
                </h5>
              </div>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight className="text-xl " />
            </div>
          </div>

          {/* Dark and light mode toggle */}
          <div className="bordercolor flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center">
                {/* Toggle icon based on the mode */}
                {isDarkMode ? (
                  <CiSun className="font-poppins h-full w-full text-yellow-500" />
                ) : (
                  <CiDark className="font-poppins h-full w-full text-black" />
                )}
              </div>
              <div>
                <h5 className="font-poppins text-[18px] font-normal text-black">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </h5>
              </div>
            </div>
            <div>
              <div className="toggle flex flex-row justify-between">
                <label className="flex cursor-pointer items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="dark-mode"
                      id="dark-toggle"
                      className="checkbox hidden"
                      checked={isDarkMode}
                      onChange={handleToggle}
                    />
                    <div className="block flex h-8 w-14 items-center justify-center rounded-full border-[2px] border-[#0046AE]"></div>
                    <div
                      className={`dot absolute left-1 top-1 h-6 w-6 rounded-full transition ${
                        isDarkMode
                          ? "translate-x-6 bg-yellow-500"
                          : "bg-[#0046AE]"
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Web language */}
          <div
            className="bordercolor flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg"
            onClick={() => dispatch(showModal("AppLanguage"))}
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                className="h-6 w-6 object-cover"
                src={language}
                alt="Profile icon"
              />
              <div className="">
                <h5 className="font-poppins text-[18px] font-normal text-black">
                  App Language
                </h5>
              </div>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight className="text-xl text-black" />
            </div>
          </div>

          {/* Share App */}
          <div
            className="bordercolor flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg"
            onClick={() => dispatch(showModal("ShareAppModal"))}
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                className="h-6 w-6 object-cover"
                src={share}
                alt="Profile icon"
              />
              <div className="">
                <h5 className="font-poppins text-[18px] font-normal text-black">
                  Share
                </h5>
              </div>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight className="text-xl text-black" />
            </div>
          </div>

          {/* App Feedback */}
          <div
            className="bordercolor flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg"
            onClick={() => dispatch(showModal("AppFeedback"))}
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                className="h-6 w-6 object-cover"
                src={feedback}
                alt="Profile icon"
              />
              <div className="">
                <h5 className="font-poppins text-[18px] font-normal text-black">
                  App Feedback
                </h5>
              </div>
            </div>
            <div>
              <MdOutlineKeyboardArrowRight className="text-xl text-black" />
            </div>
          </div>

          {/* Logout  btn */}
          <div
            className="bordercolor flex h-auto w-full cursor-pointer items-center justify-between rounded-xl p-4 shadow-lg"
            onClick={() => dispatch(showModal("LogoutModal"))}
          >
            <div className="flex items-center justify-center gap-2">
              <Image
                className="h-6 w-6 object-cover"
                src={logouticon}
                alt="Profile icon"
              />
              <div className="">
                <h5 className="font-poppins text-[18px] font-normal text-[#FF2525]">
                  Logout
                </h5>
              </div>
            </div>
          </div>

          {/* Delete Account Button */}
          <div
            className="bordercolor bordercolordeletebtn mx-auto flex h-auto w-[70%] cursor-pointer items-center justify-center rounded-xl p-3 shadow-lg xl:p-4"
            onClick={() => dispatch(showModal("DeleteAccount"))}
          >
            <div className="">
              <h5 className="font-poppins items-center text-[18px] font-normal text-[#0046AE]">
                Delete
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSide;
