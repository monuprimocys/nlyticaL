import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import "../../style.css";
import { updateAddPostData } from "@/app/store/Slice/AddPostSlice"; // Action to update Redux slice
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";

function PhoneNumberInput() {
  const dispatch = useDispatch();

  // Retrieve service_phone and country_code from Redux state (useSelector)
  const servicePhone = useSelector((state) => state.AddPost.service_phone);
  const countryCode = useSelector((state) => state.AddPost.country_code);

  // Use state to manage the form inputs locally
  const [formData, setFormData] = useState({
    service_phone: servicePhone || "", // Use Redux state first
    country_code: countryCode || "", // Use Redux state first
    country: "",
    country_full_name: "",
  });


  console.log(" my slice values",servicePhone)

  useEffect(() => {
    // On mount, check cookies and set Redux state if cookies exist
    const mobileFromCookies = Cookies.get("mobile");
    const countryCodeFromCookies = Cookies.get("country_code");

    if (mobileFromCookies && countryCodeFromCookies) {
      // Dispatch action to update Redux state with values from cookies
      dispatch(
        updateAddPostData({
          service_phone: mobileFromCookies,
          country_code: countryCodeFromCookies,
        })
      );
    } else {
      // If no cookies, use the current Redux state
      setFormData({
        service_phone: servicePhone || "",
        country_code: countryCode || "",
        country: "",
        country_full_name: "",
      });
    }
  }, [dispatch, servicePhone, countryCode]);

  const handlePhoneChange = (value, data) => {
    // Update local state
    setFormData({
      ...formData,
      service_phone: value,
      country_code: `+${data.dialCode}`,
      country: data.countryCode,
      country_full_name: data.name,
    });

    // Dispatch to Redux store
    dispatch(
      updateAddPostData({
        service_phone: value,
        country_code: `+${data.dialCode}`,
      })
    );

    // Store in cookies after Redux update
    Cookies.set("mobile", value);
    Cookies.set("country_code", `+${data.dialCode}`);
  };

  return (
    <div className="">
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
          value={servicePhone} // Bind to local state value
          onChange={handlePhoneChange} // Handle phone number change
          country={formData.country || "us"} // Set the country dynamically
          enableSearch
        />
      </div>
    </div>
  );
}

export default PhoneNumberInput;
