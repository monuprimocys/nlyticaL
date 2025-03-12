import React, { useEffect, useState } from "react";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch and useSelector
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import { useUpdateService } from "@/app/storeApp/api/useUpdateService";

function PhoneNumberBusiness() {
  const dispatch = useDispatch();

  const { data: detaildata, refetch } = useUpdateService();

  const [phone, setPhone] = useState(
    ` ${detaildata?.service.service_country_code} ${detaildata?.service.service_phone} `
  );

  const handlePhoneChange = (value, countryData) => {
    setPhone(value);
    // The country code is available from the countryData object
    const countryCode = countryData.dialCode; // The dialing code (e.g. +1 for US)
    const countryNumber = value.replace(countryCode, "").trim(); // Removing the country code from the phone number

    console.log("Country Code:", countryCode);
    console.log("Country Number:", countryNumber);

    dispatch(
      updateServiceField({
        service_phone: countryNumber,
        service_country_code: `+${countryCode}`,
      })
    );
  };

  const servicedetail = useAppSelector((state) => {
    return state.service.service;
  });

  console.log(
    " my  service detail values ",
    servicedetail.service_country_code
  );

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="">
      <label
        className={` text-sm font-medium   ${
          isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]  "
        }`}
        htmlFor="mobile"
      >
        Mobile Number
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2 w-full">
        <PhoneInput
          placeholder="Enter phone number"
          value={phone}
          onChange={handlePhoneChange}
          enableSearch
          // Optional: Customize the styling
          inputStyle={{
            backgroundColor: isDarkMode ? "#212121" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#000000",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  );
}

export default PhoneNumberBusiness;
