"use client";

import React, { useState } from "react";
import emailicon from "../../../../public/assets/Image/loginemailicon.png";
import Image from "next/image";
import { useResendotpandForgetpwdMutation } from "@/app/storeApp/api/auth/ResendotpandForgetpwd";
import { toast } from "react-toastify";
import { setForgotpwd } from "@/app/storeApp/Slice/ForgotpwdSlice";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [SendOtpForForgotPassword, { isLoading, error }] =
    useResendotpandForgetpwdMutation();

  const dispatch = useDispatch();

  // Button click handler
  const handleSendOtpForgetPwd = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Email validation
    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      // Call the API with the email
      const response = await SendOtpForForgotPassword({ email });

      if (response?.data) {
        dispatch(setForgotpwd(response.data));
        dispatch(showModal("ForgotPasswordOtpVerfiyModal"));
        dispatch(hideModal("ForgotPasswordModal"));
        toast.success("OTP Sent Successfully");
      } else {
        toast.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("An error occurred while sending OTP");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSendOtpForgetPwd}>
          <div className="mb-5">
            <label
              className="text-sm font-medium text-[#000000]"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative mt-2 flex items-center">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border font-poppins inputboxborder pr-[3rem] bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
                placeholder="Enter your email"
              />
              <span className="absolute right-2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
                <Image
                  src={emailicon}
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
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Get OTP"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
