"use client";

import React, { useState } from "react";
import Image from "next/image";
import questionImage from "../.././../../../public/assets/Image/24-support.png";
import dropdownImage from "../../../../../public/assets/Image/dropdwonicon.png";
import { TextField } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/high-res.css";
import { useAddCustomerSupportMutation } from "@/app/store/api/add-customersupport";
import { ToastContainer, toast } from "react-toastify";

function CustomreSupportFomr() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Destructure the mutation hook for adding customer support
  const [addCustomerSupport, { isLoading, isSuccess, isError, error }] =
    useAddCustomerSupportMutation();

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!name || !email || !phone || !message) {
      toast.error(" All fields must be provided ");
      return;
    }

    try {
      const response = await addCustomerSupport({
        name,
        email,
        phone,
        message,
      }).unwrap();

      toast.success(" Your message has been sent successfully! ");
      //    clear all fields
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      toast.error(" An error occurred while submitting your support request ");
    }
  };

  return (
    <div className="mx-auto 2xl:w-[55%] rounded-b-lg xl:w-[80%] shadow-xl w-[90%] mt-[3rem] gap-5 flex justify-center flex-col items-center cursor-pointer">
      <div
        className="w-full justify-between items-center businesslable flex h-auto p-8 rounded-xl"
        onClick={toggleAccordion}
      >
        <div className="flex gap-4 items-center">
          <Image
            className="w-[2rem] h-[2rem] object-contain"
            src={questionImage}
            alt="question"
          />
          <h5 className="text-lg font-medium font-poppins">Customer Support</h5>
        </div>
        <div className="flex gap-2">
          <Image
            className={`w-[1.5rem] h-[1.5rem] object-contain transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            src={dropdownImage}
            alt="dropdown"
          />
        </div>
      </div>

      {isOpen && (
        <div className="w-full flex flex-col p-4 md:p-6 justify-start items-start gap-6">
          <div className="mx-auto w-[90%] grid grid-cols-2 gap-6">
            <div className="w-full">
              <label
                className="text-sm font-medium text-[#000000]"
                htmlFor="name"
              >
                Name
                <span className="text-[#F21818] pl-[1px]">*</span>
              </label>
              <div className="relative mt-2">
                <TextField
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full">
              <label
                className="text-sm font-medium text-[#000000]"
                htmlFor="email"
              >
                Email
                <span className="text-[#F21818] pl-[1px]">*</span>
              </label>
              <div className="relative mt-2">
                <TextField
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div className="w-full">
              <label
                className="font-poppins text-sm font-medium text-[#000000]"
                htmlFor="mobile"
              >
                Mobile Number
                <span className="text-[#F21818] pl-[1px]">*</span>
              </label>
              <div className="relative mt-2 w-full">
                <PhoneInput
                  placeholder="Enter phone number"
                  enableSearch
                  value={phone}
                  onChange={setPhone}
                />
              </div>
            </div>

            <div className="h-fit w-full">
              <label
                className="font-poppins text-sm font-medium text-[#000000]"
                htmlFor="Message"
              >
                Message
                <span className="text-[#F21818] pl-[1px]">*</span>
              </label>
              <div className="relative mt-2">
                <TextField
                  id="Message"
                  name="Message"
                  placeholder="Enter Message"
                  className="!border-[#6565657a] border-[1px]"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="w-full justify-center items-center flex">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-fit px-[5rem] py-3 bg-[#0046AE] rounded-lg font-poppins text-white"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>

          <ToastContainer />
        </div>
      )}
    </div>
  );
}

export default CustomreSupportFomr;
