"use client";
import Image from "next/image";
import logo from "../../../public/assets/Image/logo.png";
import call from "../../../public/assets/Image/callfotter.png";
import sms from "../../../public/assets/Image/emailfooter.png";
import location from "../../../public/assets/Image/location.png";
import fb from "../../../public/assets/Image/fbfotter.png";
import insta from "../../../public/assets/Image/instafotter.png";
import line from "../../../public/assets/Image/line.png";
import bgimage from  "../../../public/assets/Image/fottertopimagerightside.png"

import emailicon from "../../../public/assets/Image/emailfooter.png";

function Fotter() {
  return (
    <div className="relative w-full pt-10 pb-4  ">
      {/* fotter top content */}

      <div className="gap-8 w-[90%] backgroundImage md:w-[80%]  xl:w-[65%] 2xl:w-[50%] mx-auto flex justify-between pb-3 lg:pb-2 2xl:pb-0 md:pb-[0.4rem] pt-10 md:pt-0  items-center h-full rounded-[1.5rem] relative bottom-[-5rem] md:flex-row flex-col overflow-hidden">
        {/* content  */}

        <div className="flex flex-col xl:w-[60%] w-full md:pl-10 gap-6 px-3 md:px-0 ">
          <div className="w-full">
            <h2 className="text-xl font-semibold text-white md:text-2xl font-poppins">
              Stay connected with us for the latest updates and exciting news!
            </h2>
          </div>
          <div className="flex items-center justify-between px-5 py-2 bg-white rounded-lg w-full max-w-[400px] font-poppins text-[#0046AE] font-[600] cursor-pointer">
            <div className="w-10 h-5 xl:w-9 ">
              <Image
                src={emailicon}
                alt="Call"
                className="object-cover w-full h-full font-medium text-black"
              />
            </div>
            <input
              type="email"
              name=""
              id=""
              placeholder="Your Email Address"
              className="w-full px-3 py-2 mr-2 text-black rounded-lg focus:outline-none focus:ring-0 font-[400]"
            />
            <button
              type="submit"
              className="bg-[#0046AE] text-white px-3 py-2 rounded-lg font-poppins"
            >
              Submit
            </button>
          </div>
        </div>

        {/* image */}

        <div
          className="xl:w-[40%] w-[90%]    overflow-hidden md:rounded-br-[1rem] h-[14rem] lg:h-[18rem] md:h-[15rem] bg-contain  xl:bg-transparent md:bg-right-bottom 2xl:bg-center  bg-bottom  2xl:bg-cover"
          style={{
            backgroundImage: `url(${bgimage.src})`,
           
          }}
        ></div>
      </div>

      {/* fotter content  */}
      <div className="w-full h-auto py-[8rem]  bg-center bg-cover flex  justify-center   items-center  backgroundImage2">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[90%] md:w-[80%] mx-auto my-auto xl:grid-cols-4 ">
          {/* First Column */}
          <div className="flex flex-col items-center w-full space-y-6 text-center md:items-start md:text-left">
            <div className="h-[3rem] w-[10rem] cursor-pointer">
              <Image
                src={logo}
                alt="Logo"
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <p className="font-normal font-poppins">
                Nlytical: Your one-stop solution for finding businesses,
                services, and reviews at your fingertips!
              </p>
            </div>

            <div className="flex mt-4 space-x-4 ">
              <a href="https://www.instagram.com/primocys/" target="_blank">
                <Image
                  src={insta}
                  alt="Instagram"
                  className="w-8 h-8 cursor-pointer"
                />
              </a>
              <a href="https://www.facebook.com/primocys/" target="_blank">
                <Image
                  src={fb}
                  alt="Facebook"
                  className="w-8 h-8 cursor-pointer"
                />
              </a>
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col items-center w-full space-y-6 md:items-start">
            <div className="flex flex-col items-center md:items-start gap-y-3">
              <h3 className="text-2xl font-bold text-[#0046AE] font-poppins">
                Categories
              </h3>
              <Image src={line} alt="Line" className="w-16" />
            </div>

            <div className="flex flex-col space-y-4 text-sm font-medium ">
              <p className="cursor-pointer font-poppins">Electrical</p>
              <p className="cursor-pointer font-poppins">Remodeling</p>
              <p className="cursor-pointer font-poppins">Plumber</p>
              <p className="cursor-pointer font-poppins">Ac Repairing</p>
            </div>
          </div>

          {/* Third Column */}
          <div className="flex flex-col items-center w-full space-y-6 md:items-start">
            <div className="flex flex-col items-center md:items-start gap-y-3">
              <h3 className="text-2xl font-bold text-[#0046AE] font-poppins">
                Use Links
              </h3>
              <Image src={line} alt="Line" className="w-16" />
            </div>

            <div className="flex flex-col items-center space-y-4 text-sm font-medium md:items-start">
              <p className="cursor-pointer font-poppins">About Us</p>
              <p className="cursor-pointer font-poppins">Privacy Policy</p>
              <p className="cursor-pointer font-poppins">Terms & Conditions</p>
            </div>
          </div>

          {/* 4th Column */}
          <div className="flex flex-col items-center w-full space-y-6 md:items-start">
            <div className="flex flex-col items-center md:items-start gap-y-3">
              <h3 className="text-2xl font-bold text-[#0046AE] font-poppins">
                Contact Us
              </h3>
              <Image src={line} alt="Line" className="w-16" />
            </div>

            <div className="flex flex-col space-y-4 text-sm font-medium">
              <div className="flex items-center space-x-3 cursor-pointer">
                <Image src={call} alt="Call" className="w-6 h-6" />
                <p className="text-sm font-semibold font-poppins">
                  <a href="tel:+355695509143">+355 69 550 9143</a>
                </p>
              </div>

              <div className="flex items-center space-x-3 cursor-pointer">
                <Image src={sms} alt="Email" className="w-6 h-6" />
                <p className="text-sm font-medium font-poppins">
                  <a href="mailto:info.Handyman @gmail.com">
                    info.Handyman @gmail.com
                  </a>
                </p>
              </div>

              <div className="flex items-center space-x-3 cursor-pointer">
                <Image src={location} alt="Location" className="w-6 h-6" />
                <p className="text-sm font-medium font-poppins">
                  Rruga e Detit, Golem
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex items-center justify-center  bottom-10 w-[90%] md:w-[80%] mx-auto my-auto ">
          <p className="text-black font-poppins">
            Copyright © 2000-2024{" "}
            <a
              href="https://primocys.com/"
              className="text-[#000000] font-poppins font-semibold"
            >
              Nlytical
            </a>{" "}
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Fotter;
