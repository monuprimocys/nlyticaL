"use client";
import Image from "next/image";
import { useState, FormEvent } from "react";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import "./style.css";
import callicon from "../../../../public/assets/Image/callSinup.png";
import { useRegisterAccountMutation } from "../../storeApp/api/auth/newuser-registeraccount";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { toast } from "react-toastify";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { setUserRegistration } from "@/app/storeApp/Slice/RegistrationSlice";
import Cookies from "js-cookie";

// Define the types for phone input box state
interface PhoneNumberState {
  mobile: string;
  country_code: string;
  country: string;
}

interface RegisterAccountResponse {
  success: boolean;
  data: any;
}

function RegisterWithMobilenumber() {
  // Define the state with the PhoneNumberState type
  const [PhonenumberInputBox, setPhonenumberInputBox] =
    useState<PhoneNumberState>({
      mobile: "",
      country_code: "",
      country: "in", // Default to "in" for India
    });

  const dispatch = useAppDispatch();

  // Mutation for registering the user
  const [registerAccount, { isLoading }] = useRegisterAccountMutation();

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate phone number input
    if (!PhonenumberInputBox.mobile || !PhonenumberInputBox.country_code) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    // Format the phone number by adding the "+" sign before the country code
    const PhoneNumber = `+${PhonenumberInputBox.mobile}`;
    const code = `+${PhonenumberInputBox.country_code}`;

    try {
      // Send data to the API with the phone number including the "+" sign
      const response: RegisterAccountResponse = await registerAccount({
        mobile: PhoneNumber, // Send the phone number with the "+" sign
        country_code: code, // Send the phone number
        role: "user", // Always set role to "user"
      }).unwrap(); // Using unwrap to get the raw response

      Cookies.set("login_type", response.login_type);

      // Dispatch user registration and handle response
      dispatch(setUserRegistration(response));
      console.log("API response:", response.is_store);

      toast.success("OTP sent successfully!");
      dispatch(showModal("RegisterWithMobilenumberVerifyOtpModal"));
      dispatch(hideModal("RegisterModal"));
      dispatch(hideModal("RegisterWithMobilenumber"));
    } catch (err) {
      // Handle error (e.g., show error message)
      toast.error("An error occurred. Please try again.");
      console.error("Registration Error:", err);
    }
  };

  const slicevalues = useAppSelector((state) => state.registration);

  console.log("slice values", slicevalues);

  return (
    <div className="h-auto w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            className="text-sm font-medium text-[#000000]"
            htmlFor="mobile"
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
                console.log("Updated Phone Input:", updatedPhoneNumber); // Log the updated input values
              }}
              country={PhonenumberInputBox.country || "in"}
              enableSearch
            />
            <span className="absolute right-2 top-1/2 flex h-[3rem] w-[3rem] -translate-y-1/2 transform items-center justify-center rounded-full bg-[#B4B4B414]">
              <Image
                src={callicon}
                alt="Phone Icon"
                className="h-[1.3rem] w-[1.3rem] object-cover"
              />
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            className="signinbox font-poppins w-fit rounded-xl px-[5.5rem] py-3 text-white transition duration-200 hover:bg-[#4481db] focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Get OTP..." : "Get OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterWithMobilenumber;
