import Image from "next/image";
import React, { useState } from "react";
import profileImage from "../../../../public/assets/Image/profileicon.png";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import callicon from "../../../../public/assets/Image/callSinup.png";
import { FiPlus } from "react-icons/fi";
import avatr from "../../../../public/assets/Image/Avatar_img_2.jpg";

interface PhoneNumberState {
  mobile: string;
  country_code: string;
  country: string;
}

function FormValues() {
  const [PhonenumberInputBox, setPhonenumberInputBox] =
    useState<PhoneNumberState>({
      mobile: "",
      country_code: "",
      country: "in", // Default to "in" for India
    });
  return (
    <div className=" flex flex-col gap-6 w-full h-auto">
      {/* profile Image */}
      <div className="relative  justify-center items-center w-full  flex">
        {/* Profile image section */}
        <div
          className="profileimageborderocolor h-[8rem] w-[8rem] cursor-pointer rounded-full" // Added cursor-pointer for click effect
        >
          <Image
            src={avatr || "/default-profile.jpg"}
            alt={"Profile Image"}
            className="profileimageborderocolor h-full w-full rounded-full object-cover"
            width={128}
            height={128}
          />
        </div>

        <div className="absolute  left-[57%] top-[5.5rem] h-10 w-10 cursor-pointer rounded-full bg-white p-[3px]">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0046AE]">
            <FiPlus className="font-poppins text-xl text-white" />
          </div>
        </div>

        {/* File input */}
        <input type="file" id="image" name="image" className="hidden" />
      </div>

      <div className="">
        <label
          className="text-sm font-medium text-[#000000]"
          htmlFor="username"
        >
          Username
        </label>
        <div className="relative mt-2 flex items-center">
          <input
            type="text"
            id="username"
            name="username"
            className="w-full rounded-md border font-poppins inputboxborder pr-[3rem] bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
            placeholder="Enter Username"
          />
          <span className="absolute right-2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
            <Image
              src={profileImage}
              alt="Email Icon"
              className="h-[1.3rem] w-[1.3rem] object-cover"
            />
          </span>
        </div>
      </div>

      <div className="">
        <label
          className="text-sm font-medium text-[#000000]"
          htmlFor="username"
        >
          First Name
        </label>
        <div className="relative mt-2 flex items-center">
          <input
            type="text"
            id="username"
            name="username"
            className="w-full rounded-md border font-poppins inputboxborder pr-[3rem] bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
            placeholder="Enter First Name"
          />
          <span className="absolute right-2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
            <Image
              src={profileImage}
              alt="Email Icon"
              className="h-[1.3rem] w-[1.3rem] object-cover"
            />
          </span>
        </div>
      </div>
      <div className="">
        <label
          className="text-sm font-medium text-[#000000]"
          htmlFor="username"
        >
          Last Name
        </label>
        <div className="relative mt-2 flex items-center">
          <input
            type="text"
            id="username"
            name="username"
            className="w-full rounded-md border font-poppins inputboxborder pr-[3rem] bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
            placeholder="Enter Last Name"
          />
          <span className="absolute right-2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
            <Image
              src={profileImage}
              alt="Email Icon"
              className="h-[1.3rem] w-[1.3rem] object-cover"
            />
          </span>
        </div>
      </div>

      <div className="relative ">
        <PhoneInput
          placeholder="Enter phone number"
          value={PhonenumberInputBox.mobile}
          onChange={(value: string, data: any) => {
            const updatedPhoneNumber: PhoneNumberState = {
              ...PhonenumberInputBox,
              country_code: data.dialCode,
              mobile: value,
              country: data.countryCode,
            };
            setPhonenumberInputBox(updatedPhoneNumber);
            console.log("Updated Phone Input:", updatedPhoneNumber);
          }}
          country={PhonenumberInputBox.country || "in"}
          enableSearch
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
          <Image
            src={callicon}
            alt="Phone Icon"
            className="h-[1.3rem] w-[1.3rem] object-cover"
          />
        </span>
      </div>
      <div className="">
        <label
          className="text-sm font-medium text-[#000000]"
          htmlFor="username"
        >
          Email
        </label>
        <div className="relative mt-2 flex items-center">
          <input
            type="text"
            id="username"
            name="username"
            className="w-full rounded-md border font-poppins inputboxborder pr-[3rem] bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
            placeholder="Enter Email Address"
          />
          <span className="absolute right-2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
            <Image
              src={profileImage}
              alt="Email Icon"
              className="h-[1.3rem] w-[1.3rem] object-cover"
            />
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <button
          type="submit"
          className="w-fit rounded-xl signinbox px-[5.5rem] py-3 text-white transition font-poppins duration-200 hover:bg-[#4481db] focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default FormValues;
