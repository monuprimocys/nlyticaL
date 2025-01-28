"use client";

import React, { useState } from "react";
import "./contactstyle.css";
import Googlemap from "../componets/Googlemap/Googlemap";
import Contactpage from "./Contactpage";
import { useAppDispatch } from "../hooks/hooks";
import {
  addCustomerSupportRequest,
  addCustomerSupportSuccess,
  addCustomerSupportFailure,
} from "@/app/store/Slice/AddCustomerSupportSlice";
import { useAddCustomerSupportMutation } from "@/app/store/api/add-customersupport";
import toast from "react-hot-toast";

function ContactUs() {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
      await trigger(formData);

      // Call the API and await the response
      const apiResponse = await trigger(formData);

      // Log the API response to the console
      // console.log("API Response:", apiResponse.data?.message);

      dispatch(addCustomerSupportSuccess(formData));
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      }); // Reset form

      // Show success alert
      toast.success(apiResponse.data?.message);
    } catch {
      dispatch(addCustomerSupportFailure("Failed to submit support request"));
      // Show error alert
      if (error && "data" in error) {
        toast.error(error || "Failed to submit support request");
      } else {
        toast.error("Failed to submit support request");
      }
    }
  };

  return (
    <div className="w-full h-auto mt-[4rem]">
      {/* Contact Page */}
      <div className="mx-auto w-[90%] 2xl:w-[60%] xl:w-[80%] contactshadow h-auto rounded-lg grid xl:grid-cols-2 gap-8 items-center p-4 xl:p-10">
        {/* Contact Form */}
        <div className="w-full flex flex-col gap-6 pt-[2rem]">
          {/* Heading */}
          <div className="w-full items-center flex flex-col gap-6 justify-center text-center">
            <h2 className="AmericanSign text-[#0046AE] font-medium text-4xl">
              Contact Us
            </h2>
            <p className="font-poppins text-[#000000] font-normal text-xl">
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
                className="font-poppins text-[#000000] items-center font-normal text-lg"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="border-2 borderinputbox w-full p-3 rounded-lg focus:outline-none bg-transparent focus:border-[#0046AE] font-poppins"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="font-poppins text-[#000000] items-center font-normal text-lg"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="border-2 borderinputbox w-full p-3 rounded-lg focus:outline-none bg-transparent focus:border-[#0046AE] font-poppins"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="phone"
                className="font-poppins text-[#000000] items-center font-normal text-lg"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter Your Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="border-2 borderinputbox w-full p-3 rounded-lg focus:outline-none bg-transparent focus:border-[#0046AE] font-poppins"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-poppins text-[#000000] items-center font-normal text-lg"
              >
                Message
              </label>
              <textarea
                id="message"
                placeholder="Write message"
                value={formData.message}
                onChange={handleInputChange}
                className="border-2 borderinputbox w-full p-3 rounded-lg focus:outline-none bg-transparent focus:border-[#0046AE] font-poppins"
                rows={2}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className="px-14 py-[10px] rounded-lg text-white font-poppins text-lg bg-[#0046AE] hover:bg-[#003F88] focus:outline-none"
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
      <div className="mx-auto 2xl:w-[50%] w-[90%] xl:w-[65%] mt-[4rem]">
        <Contactpage />
      </div>
    </div>
  );
}

export default ContactUs;
