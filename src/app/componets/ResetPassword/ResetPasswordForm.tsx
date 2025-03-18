"use client";

import React, { useState } from "react";
import pwdicon from "../../../../public/assets/Image/lockicon.png";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { useResetpasswordMutation } from "@/app/storeApp/api/auth/Resetpassword";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";

const ResetPasswordForm = () => {
  const [resetPassword, { isLoading }] = useResetpasswordMutation();
  const email = useAppSelector((state) => state.forgotpwd.email);

  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  // Handle password visibility toggle
  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setIsPasswordVisible(!isPasswordVisible);
    } else {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const payload = { email, password, confirm_password: confirmPassword };
      await resetPassword(payload).unwrap();
      dispatch(showModal("loginModal"));
      dispatch(hideModal("ResetPasswordModal"));
      toast.success("Password reset successfully.");
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            className="text-sm font-medium text-[#000000]"
            htmlFor="password"
          >
            New Password
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              className="w-full rounded-md border pr-[3rem] font-poppins inputboxborder bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-2 flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center rounded-full bg-[#B4B4B414]"
              onClick={() => togglePasswordVisibility("password")}
            >
              <Image
                src={pwdicon}
                alt="Toggle Password Visibility"
                className="h-[1.3rem] w-[1.3rem] object-cover"
              />
            </span>
          </div>
        </div>

        <div className="mb-5">
          <label
            className="text-sm font-medium text-[#000000]"
            htmlFor="confirm_password"
          >
            Confirm Password
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              className="w-full rounded-md border pr-[3rem] font-poppins inputboxborder bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute right-2 flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center rounded-full bg-[#B4B4B414]"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              <Image
                src={pwdicon}
                alt="Toggle Confirm Password Visibility"
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
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
