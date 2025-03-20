"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import loginbgimage from "../../../../public/assets/Image/loginbgimage.png";
import logo from "../../../../public/assets/Image/logo.png";
import emailicon from "../../../../public/assets/Image/loginemailicon.png";
import pwdicon from "../../../../public/assets/Image/lockicon.png";
import "./style.css";
import call from "../../../../public/assets/Image/calliconlogin.png";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import crossicon from "../../../../public/assets/Image/crossicon.png";

import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../storeApp/Slice/LoginSlice";
import { useLoginUserMutation } from "@/app/storeApp/api/auth/user-login";
import { useEffect, useState } from "react";
import AddSocilLoginGoogle from "@/app/componets/AddSocilLoginGoogle";

export default function LoginModal() {
  const modalData = useAppSelector((state) => state.modals.loginModal);
  const dispatch = useAppDispatch();

  const [loginuser, { isLoading }] = useLoginUserMutation();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation (make sure fields are not empty)
    if (!formData.email || !formData.password) {
      toast.error("Please fill in both fields.");
      return;
    }

    dispatch(loginStart());

    try {
      const userData = await loginuser(formData).unwrap();
      dispatch(loginSuccess(userData));
      Cookies.set("user_id", userData.user_id);

      Cookies.set("login_type", userData.login_type);
      Cookies.set("is_store", userData.is_store);
      Cookies.set("service_id", userData.service_id);
      Cookies.set("loginuser", "user_login");

      toast.success("Login successful!");
      // Optionally, hide the modal after successful login
      dispatch(hideModal("loginModal"));
      window.location.reload();
    } catch (error) {
      dispatch(loginFailure(error));
      toast.error("Login failed. Please try again.");
    }
  };

  // modal close

  const handleModalClose = () => {
    dispatch(hideModal("loginModal"));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode);

  useEffect(() => {
    const inputs = document.querySelectorAll("input");

    // Set readonly attribute initially
    inputs.forEach((input) => {
      input.setAttribute("readonly", true);
    });

    // Remove readonly attribute on click
    const handleClick = (event) => {
      event.target.removeAttribute("readonly");
    };

    inputs.forEach((input) => {
      input.addEventListener("click", handleClick);
    });

    // Cleanup event listeners when component unmounts
    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <Dialog open={modalData} onClose={handleModalClose}>
      <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            style={{
              backgroundImage: `url(${loginbgimage.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full max-w-[30rem] rounded-xl bg-white p-6 shadow-[rgba(17,_17,_26,_0.3)_0px_0px_16px] backdrop-blur-md transition-all duration-300 ease-in-out"
          >
            <div
              className="  w-full   relative    flex   items-center  justify-end    cursor-pointer"
              onClick={handleModalClose}
            >
              <div className=" w-8 h-8   absolute right-[-1rem]  rounded-full bg-slate-400 flex justify-center items-center">
                <Image
                  src={crossicon}
                  className={` w-full h-full  ${isDarkMode ? " invert" : ""}`}
                  alt="crossicon"
                />
              </div>
            </div>
            <div className="mb-6 flex w-full flex-col items-center justify-center">
              <Image
                src={logo}
                alt="Logo"
                className="h-24 w-[11rem] object-contain"
              />
              <p className="font-poppins mx-auto mt-1 px-4 text-center text-sm   text-[#717171] sm:px-6">
                Discover more about our app by registering or logging in.
              </p>
            </div>

            <div className="w-full">
              <form onSubmit={handleSubmit} className="md:px-4">
                {/* Email Input */}
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
                      className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
                      placeholder="Enter your email"
                      onChange={handleInputChange}
                      value={formData.email || ""}
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

                {/* Password Input */}
                <div className="mb-5">
                  <label
                    className="text-sm font-medium text-[#000000]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative mt-2 flex items-center">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
                      placeholder="Enter your password"
                      onChange={handleInputChange}
                      value={formData.password || ""}
                    />
                    <span className="absolute right-2 flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center rounded-full bg-[#B4B4B414]">
                      <Image
                        src={pwdicon}
                        alt="Toggle Password Visibility"
                        className="h-[1.3rem] w-[1.3rem] object-contain"
                      />
                    </span>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="mb-4 mt-4 flex cursor-pointer items-center justify-between">
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      className="cheackboxborder h-4 w-4 text-black"
                    />
                    <span className="font-poppins text-sm font-medium text-[#717171]">
                      Remember me
                    </span>
                  </div>

                  <button
                    className="font-poppins text-sm font-medium text-[#0046AE]"
                    onClick={() => {
                      dispatch(showModal("ForgotPasswordModal"));
                      handleModalClose();
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Sign In Button */}
                <div className="mt-6 flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="signinbox font-poppins w-fit rounded-xl px-[5.5rem] py-3 text-white transition duration-200 hover:bg-[#4481db] focus:outline-none"
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>
                </div>

                {/* Divider */}
                <div className="mt-4 flex w-full items-center justify-center gap-2">
                  <div className="my-2 flex h-[2px] w-full rounded-md bg-[#D0D0D0]" />
                  <p className="font-poppins text-[22px] text-[#3A3333]">or</p>
                  <div className="my-2 flex h-[2px] w-full rounded-md bg-[#D0D0D0]" />
                </div>

                {/* login with google and phone number */}
                <div className="mx-auto mt-4 flex w-full md:w-[80%] flex-col items-center justify-center gap-6">
                  <AddSocilLoginGoogle />
                  <div
                    className="flex w-full cursor-pointer items-center justify-center gap-6 rounded-lg border border-[#0046AE] py-3"
                    onClick={() => {
                      dispatch(showModal("RegisterWithMobilenumber"));
                      handleModalClose();
                    }}
                  >
                    <div className="h-6 w-6">
                      <Image
                        src={call}
                        alt="Phone Logo"
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <p className="font-poppins text-sm font-medium text-[#3A3333]">
                      Continue with Number
                    </p>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="mt-4 flex items-center justify-center">
                  <p className="text-sm text-[#717171]">
                    Don’t have an account?{" "}
                    <button
                      className="cursor-pointer font-medium text-[#056CB2]"
                      onClick={() => {
                        dispatch(showModal("RegisterModal"));
                        handleModalClose();
                      }}
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
