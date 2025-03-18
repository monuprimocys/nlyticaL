"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import profileImage from "../../../../public/assets/Image/profileicon.png";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import callicon from "../../../../public/assets/Image/callSinup.png";
import { FiPlus } from "react-icons/fi";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useUpdateProfileMutation } from "@/app/storeApp/api/auth/ProfileUpdate";
import { toast } from "react-toastify";
import avatar from "../../../../public/assets/Image/Avatar_img_2.jpg";
import emailicon from "../../../../public/assets/Image/emailiconformailsendfooter.png";
import { useDispatch } from "react-redux";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";

function FormValues() {
  const slicevalues = useAppSelector((state) => state.registration);
  const login_type = Cookies.get("login_type");
  const user_id = Cookies.get("user_id");
  const [triggerUpdateProfile, { data, isLoading }] =
    useUpdateProfileMutation();
  const id = sessionStorage.getItem("serviceId");

  const { refetch } = useServiceDetailApi(id);

  const disptach = useDispatch();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Form states for input fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (data?.status) {
      const { image } = data.userdetails;

      setImagePreview(image);
    }
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (user_id) {
      triggerUpdateProfile({ user_id });
    }
  }, [user_id, triggerUpdateProfile]);

  console.log("  my updated profile  api returned", data?.message);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (data?.status === false) {
      toast.error(data?.message);
      return;
    }
    // All required fields must be filled, including the image
    if (!firstName || !lastName || !email || !username) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("mobile", slicevalues.mobile);
    formData.append("username", username);
    formData.append("user_id", user_id);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      // Assuming triggerUpdateProfile returns a Promise
      const response = await triggerUpdateProfile(formData);
      Cookies.set("loginuser", "user_login");
      refetch();
      // Log the response values
      Cookies.set("is_store", response.data?.is_store);
      Cookies.set("store_approval", response.data?.store_approval);

      // If there’s a status or any specific field to check, you can access it here
      if (response.success) {
      } else {
      }

      disptach(hideModal("RegisterWithMobailNumberOtpVerify"));
      refetch();
      // Optionally reload the page if the update was successful
      // window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-6 w-full h-auto">
      {/* Profile Image */}
      <div className="relative justify-center items-center w-full flex ">
        <div
          className="profileimageborderocolor h-[8rem] w-[8rem] cursor-pointer rounded-full "
          onClick={() => document.getElementById("image")?.click()}
        >
          <Image
            src={imagePreview || avatar}
            alt={"Profile Image"}
            className="profileimageborderocolor h-full w-full rounded-full object-cover"
            width={128}
            height={128}
          />
        </div>

        {/* File upload button */}
        <div
          className="absolute left-[57%] top-[5.5rem] h-10 w-10 cursor-pointer rounded-full bg-white p-[3px] "
          onClick={() => document.getElementById("image")?.click()}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0046AE]">
            <FiPlus className="font-poppins text-xl text-white" />
          </div>
        </div>

        {/* File input */}
        <input
          type="file"
          id="image"
          name="image"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      <form onSubmit={handleSubmit} className=" flex  flex-col  gap-6">
        <div>
          <label
            className="text-sm font-medium text-[#000000]"
            htmlFor="username"
          >
            UserName
            <span className="text-[#F21818] pl-[2px]">*</span>
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border font-poppins inputboxborder pr-[3rem] bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
              placeholder="Enter username"
            />
            <span className="absolute right-2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={profileImage || avatar}
                alt="Profile Icon"
                className="h-[1.3rem] w-[1.3rem] object-cover"
              />
            </span>
          </div>
        </div>
        <div>
          <label
            className="text-sm font-medium text-[#000000]"
            htmlFor="first_name"
          >
            First Name
            <span className="text-[#F21818] pl-[2px]">*</span>
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full rounded-md border font-poppins inputboxborder pr-[3rem] bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
              placeholder="Enter First Name"
            />
            <span className="absolute right-2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={profileImage || avatar}
                alt="Profile Icon"
                className="h-[1.3rem] w-[1.3rem] object-cover"
              />
            </span>
          </div>
        </div>

        <div>
          <label
            className="text-sm font-medium text-[#000000]"
            htmlFor="last_name"
          >
            Last Name
            <span className="text-[#F21818] pl-[2px]">*</span>
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full rounded-md border font-poppins inputboxborder pr-[3rem] bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
              placeholder="Enter Last Name"
            />
            <span className="absolute right-2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={profileImage || avatar}
                alt="Profile Icon"
                className="h-[1.3rem] w-[1.3rem] object-cover"
              />
            </span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-[#000000]" htmlFor="email">
            Email
            <span className="text-[#F21818] pl-[2px]">*</span>
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border font-poppins inputboxborder pr-[3rem] bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
              placeholder="Enter Email Address"
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

        <div className="relative">
          <PhoneInput
            placeholder="Enter phone number"
            value={slicevalues.mobile}
            enableSearch
            disabled={login_type === "mobile"}
          />
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
            <Image
              src={callicon}
              alt="Phone Icon"
              className="h-[1.3rem] w-[1.3rem] object-cover"
            />
          </span>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            className="w-fit rounded-xl signinbox px-[5.5rem] py-3 text-white transition font-poppins duration-200 hover:bg-[#4481db] focus:outline-none"
          >
            {isLoading ? "Updating..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormValues;
