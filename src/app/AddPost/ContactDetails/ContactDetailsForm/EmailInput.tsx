import React, { useEffect, useState } from "react";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";

function EmailInput() {
  const dispatch = useDispatch();

  // Retrieve email from cookies initially
  const emailFromCookies = Cookies.get("email");
  const serviceEmail = useAppSelector((state) => state.AddPost.service_email);

  // Set local state based on Redux or cookies
  const [email, setEmail] = useState(serviceEmail || emailFromCookies || "");

  useEffect(() => {
    // If the email is in cookies and not set in Redux state, dispatch to Redux
    if (emailFromCookies && !serviceEmail) {
      dispatch(updateAddPostData({ service_email: emailFromCookies }));
    }
  }, [dispatch, emailFromCookies, serviceEmail]);

  // Handle email input change
  const handleChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail); // Update local state

    // Update Redux state
    dispatch(updateAddPostData({ service_email: newEmail }));

    // Save email to cookies
    Cookies.set("email", newEmail);
  };

  return (
    <div>
      <label
        className="text-sm font-medium text-[#000000]"
        htmlFor="service_email"
      >
        Email
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          type="email"
          id="service_email"
          name="service_email"
          className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
          placeholder="Enter your email"
          value={email} // Bind to local email state
          onChange={handleChange} // Handle email change
          required
        />
      </div>
    </div>
  );
}

export default EmailInput;
