"use client";
import React, { useEffect, useState } from "react";
import "./contactstyle.css";
import Googlemap from "../componets/Googlemap/Googlemap";
import Contactpage from "./Contactpage";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  addCustomerSupportRequest,
  addCustomerSupportSuccess,
  addCustomerSupportFailure,
} from "@/app/storeApp/Slice/AddCustomerSupportSlice";
import { useAddCustomerSupportMutation } from "@/app/storeApp/api/add-customersupport";
import { setDarkMode } from "../storeApp/Slice/darkModeSlice";
import Phonenumber from "./Phonenumber";
import { ToastContainer, toast } from 'react-toastify';

function ContacntComponets() {
  const code = sessionStorage.getItem("countryCode");
  const phone = sessionStorage.getItem("countryNumber");

  const Phonenumber12 = `+${code}${phone}`;
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: Phonenumber12,
    message: "",
  });

  const dispatch = useAppDispatch();

  // Mutation hook
  const [trigger, { isLoading, error }] = useAddCustomerSupportMutation();

  // Handle form data change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    try {
      dispatch(addCustomerSupportRequest());

      // Call the API and await the response
      const apiResponse = await trigger(formData);

      // Check if API call was successful
      if (apiResponse?.data) {
        dispatch(addCustomerSupportSuccess(formData));

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });

        // Show success alert
        toast.success(apiResponse.data?.message);

        // Clear session storage (Only if API call was successful)
        sessionStorage.removeItem("countryCode");
        sessionStorage.removeItem("countryNumber");
      } else {
        throw new Error("API call failed");
      }
    } catch (err) {
      dispatch(addCustomerSupportFailure("Failed to submit support request"));

      // Show error alert
      toast.error(error?.data || "Failed to submit support request");
    }
  };

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
      className={`w-full h-auto pt-[4rem]    ${
        isDarkMode ? "bg-[#181818]" : "bg-[#ffffff]"
      }`}
    >
      {/* Contact Page */}
      <div
        className={`mx-auto w-[90%] 2xl:w-[60%] xl:w-[80%] h-auto rounded-xl grid xl:grid-cols-2 gap-8 items-center p-4 xl:p-10   ${
          isDarkMode ? " bg-[#0046AE]" : "contactshadow "
        }`}
      >
        {/* Contact Form */}
        <div className="w-full flex flex-col gap-6 pt-[2rem]">
          {/* Heading */}
          <div className="w-full items-center flex flex-col gap-6 justify-center text-center">
            <h2
              className={`AmericanSign  font-medium text-4xl  ${
                isDarkMode ? "text-[#ffffff]" : "text-[#0046AE]"
              }`}
            >
              Contact Us
            </h2>
            <p
              className={`font-poppins  font-normal text-xl  ${
                isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
              }`}
            >
              Reach out to us with your questions or requests. We are here to
              assist you!
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-6 justify-start"
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className={`font-poppins  items-center font-normal text-lg  ${
                  isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className={`border-2  w-full p-3 rounded-lg focus:outline-none  font-poppins  ${
                  isDarkMode
                    ? "text-[#000000]  border-[#FFFFFF5C] focus:border-[#FFFFFF]  border-2    bg-[#FFFFFF1A]"
                    : "text-[#000000] borderinputbox   focus:border-[#0046AE] bg-transparent "
                }`}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className={`font-poppins  items-center font-normal text-lg  ${
                  isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`border-2  w-full p-3 rounded-lg focus:outline-none  font-poppins  ${
                  isDarkMode
                    ? "text-[#000000]  border-[#FFFFFF5C] focus:border-[#FFFFFF]  border-2    bg-[#FFFFFF1A]"
                    : "text-[#000000] borderinputbox   focus:border-[#0046AE] bg-transparent "
                }`}
                required
              />
            </div>

            <div className=" w-full">
              <Phonenumber />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className={`font-poppins  items-center font-normal text-lg  ${
                  isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
                }`}
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Write message"
                value={formData.message}
                onChange={handleInputChange}
                className={`border-2  w-full p-3 rounded-lg focus:outline-none  font-poppins  ${
                  isDarkMode
                    ? "text-[#000000]  border-[#FFFFFF5C] focus:border-[#FFFFFF]  border-2    bg-[#FFFFFF1A]"
                    : "text-[#000000] borderinputbox   focus:border-[#0046AE] bg-transparent "
                }`}
                rows={2}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className={`px-14 py-[10px] rounded-lg  font-poppins text-lg ] focus:outline-none  ${
                  isDarkMode
                    ? "text-[#0046AE]   bg-white"
                    : "text-white bg-[#0046AE] hover:bg-[#003F88] "
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>

        {/* Google Map */}
        <div className="w-full h-[400px] xl:h-[500px] rounded-lg bg-transparent border-2 border-[#0046AE] relative xl:right-[-5rem]">
          <Googlemap />
        </div>
      </div>

      {/* Contact Media */}
      <div className="mx-auto 2xl:w-[50%] w-[90%] xl:w-[65%] mt-[4rem] rounded-xl">
        <Contactpage />
      </div>
      <ToastContainer  
      position="top-right"
      autoClose={5000}
      />
    </div>
  );
}

export default ContacntComponets;
