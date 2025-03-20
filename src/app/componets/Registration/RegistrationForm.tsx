"use client";

import Image from "next/image";
import profileImage from "../../../../public/assets/Image/profileicon.png";
import pwdicon from "../../../../public/assets/Image/lockicon.png";
import emailicon from "../../../../public/assets/Image/loginemailicon.png";
import { useEffect, useState } from "react";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import "./style.css";
import callicon from "../../../../public/assets/Image/callSinup.png";
import { useRegisterAccountMutation } from "../../storeApp/api/auth/newuser-registeraccount";
import { setUserRegistration } from "@/app/storeApp/Slice/RegistrationSlice";
import { useAppDispatch } from "@/app/hooks/hooks";
import { toast } from "react-toastify";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import Cookies from "js-cookie";
import { useCheackUserNameExit } from "@/app/storeApp/api/auth/useCheackUserNameExit";
import verifyCheckIcon from "../../../../public/assets/Image/verfiy.png";
// Define the types for phone input box state
interface PhoneNumberState {
  mobile: string;
  country_code: string;
  country: string;
}

function RegistrationForm() {
  // Define the state with the PhoneNumberState type
  const [PhonenumberInputBox, setPhonenumberInputBox] =
    useState<PhoneNumberState>({
      mobile: "",
      country_code: "",
      country: "in", // Default to "in" for India
    });

  const usernamesession = sessionStorage.getItem("username");

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    new_mobile: "",
    email: "",
    password: "",
    role: "user",
    country_code: "",
  });

  useEffect(() => {
    if (usernamesession) {
      setFormData((prevState) => ({
        ...prevState,
        username: usernamesession,
      }));
    }
  }, [usernamesession]);

  console.log(" my form values  from cheak all values filed", formData);

  // Dispatch for Redux
  const dispatch = useAppDispatch();

  // Mutation for registering the user
  const [registerAccount, { isLoading, isError, error, isSuccess }] =
    useRegisterAccountMutation();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all required fields are filled
    const requiredFields = [
      "username",
      "first_name",
      "last_name",
      "email",
      "password",
    ];

    // Check that all required fields are filled
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Please fill in the ${field}`);
        return;
      }
    }
    // Validate phone number
    if (!PhonenumberInputBox.mobile) {
      toast.error("Please fill in the mobile number");
      return;
    }

    // Password validation: at least one uppercase, one lowercase, one number, and one special character
    const password = formData.password;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must contain at least 8 characters, including an uppercase letter, a lowercase letter, a number, and a special character."
      );
      return;
    }

    const PhoneNumber = `+${PhonenumberInputBox.mobile}`;
    const code = `+${PhonenumberInputBox.country_code}`;

    const registrationData = {
      ...formData,
      new_mobile: PhoneNumber, // set phone number
      country_code: code,
      role: "user", // ensure role is always "user"
    };

    try {
      const response = await registerAccount(registrationData).unwrap();

      console.log(" my api responce values ", response);

      Cookies.set("login_type", response.login_type);

      // Dispatch user registration state
      dispatch(setUserRegistration(response));
      Cookies.set("user_id", response.user_id);

      // Display success message
      toast.success(
        response.message ? response.message : "Registration successful!"
      );

      console.log("Registration successful!", response);
      dispatch(showModal("RegisterWithMobilenumberVerifyOtpModal"));
      dispatch(hideModal("RegisterModal"));
      sessionStorage.removeItem("username");
    } catch (err) {
      toast.error(
        err?.message
          ? err.message
          : "You are already registered with this mobile number. and email "
      );
    }
  };

  //  cheak username exit on  chnage

  const [username, setUsername] = useState("");
  const [status, setStatus] = useState(null); // null (default), true (exists), false (available)
  const [message, setMessage] = useState("");
  const checkUsernameMutation = useCheackUserNameExit();

  const handleChangeusername = async (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);

    if (newUsername.trim() === "") {
      setStatus(null);
      setMessage("");
      return;
    }

    try {
      const response = await checkUsernameMutation.mutateAsync(newUsername);

      sessionStorage.setItem("username", response?.username);

      setStatus(response.status);
      setMessage(
        response.status ? "Username is available." : " Username already exists."
      );
    } catch (error) {
      console.error("Error checking username:", error);
      setStatus(null);
      setMessage("Something went wrong. Try again.");
    }
  };

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
    <div className="w-full h-auto monuy">
      <form onSubmit={handleFormSubmit}>
        {/* Username Input */}
        <div className="mb-5">
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
              value={username}
              onChange={handleChangeusername}
              autoComplete="new-password"
              className={`w-full rounded-md border input.autocomplete_off   font-poppins pr-[3rem] bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:outline-none 
            ${
              status === false
                ? "border-red-500 " // Username exists → Red border
                : status === true
                ? "border-green-500 " // Username available → Green border
                : "border-gray-300 " // Default (no input)
            }`}
              placeholder="Enter Username"
            />

            {/* Profile/Verification Icon */}
            <span className="absolute   font-poppins  right-2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={status === true ? verifyCheckIcon : profileImage}
                alt="Status Icon"
                className="h-[1.3rem] w-[1.3rem] object-cover"
              />
            </span>
          </div>

          {/* Show message below input */}
          {message && (
            <p
              className={`mt-1 text-sm  font-poppin ${
                status === false ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>

        {/* First Name */}
        <div className="mb-5">
          <label
            className="text-sm font-medium text-[#000000]"
            htmlFor="first_name"
          >
            First Name
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
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

        {/* Last Name */}
        <div className="mb-5">
          <label
            className="text-sm font-medium text-[#000000]"
            htmlFor="last_name"
          >
            Last Name
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
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

        {/* Mobile Number */}
        <div className="mb-5">
          <label
            className="text-sm font-medium text-[#000000]"
            htmlFor="new_mobile"
          >
            Mobile Number
          </label>
          <div className="relative mt-2">
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
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="text-sm font-medium text-[#000000]" htmlFor="email">
            Email
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border font-poppins inputboxborder pr-[3rem] bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
              placeholder="Enter Email Address"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 flex h-[3rem] w-[3rem] items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={emailicon}
                alt="Phone Icon"
                className="h-[1.3rem] w-[1.3rem] object-cover"
              />
            </span>
          </div>
        </div>

        {/* Password */}
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
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border pr-[3rem] font-poppins inputboxborder bg-white py-4 pl-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
              placeholder="Enter your password"
            />
            <span className="absolute right-2 flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={pwdicon}
                alt="Toggle Password Visibility"
                className="h-[1.3rem] w-[1.3rem] object-cover"
              />
            </span>
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            className="w-fit rounded-xl signinbox px-[5.5rem] py-3 text-white transition font-poppins duration-200 hover:bg-[#4481db] focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
