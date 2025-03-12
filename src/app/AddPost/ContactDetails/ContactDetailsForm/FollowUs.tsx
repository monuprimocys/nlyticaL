import React from "react";
import "../../style.css";
import SocilMediaIcon from "./SocilMediaIcon";
import AddWhatsappinkInputBox from "./AddWhatsappinkInputBox";
import AddFacebookprofilelink from "./AddFacebookprofilelink";
import AddInstagramInput from "./AddInstagramInput";
import AddTwitterlink from "./AddTwitterlink";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import {  toast } from "react-toastify";

function FollowUs() {
  const dispatch = useAppDispatch();
  const addPostData = useAppSelector((state) => state.AddPost);

  // Validation function
  const validateFields = () => {
    // Check if required fields are empty and show the appropriate toast messages

    if (!addPostData.service_phone) {
      toast.error("Please select service_phone ");
      return false;
    }

    if (!addPostData.service_email) {
      toast.error("Please select service_email ");
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    // Validate before submitting
    const isValid = validateFields();
    if (!isValid) return; // If validation fails, stop form submissio

    // Increment add_new_post_steps by 1
    if ((addPostData.add_new_post_steps ?? 0) < 3) {
      dispatch(
        updateAddPostData({
          add_new_post_steps: ((addPostData.add_new_post_steps ?? 0) + 1) as
            | 1
            | 2
            | 3,
        })
      );
    }
  };

  const handlePreviousStep = () => {
    // Decrement add_new_post_steps by 1
    if ((addPostData.add_new_post_steps ?? 0) > 1) {
      dispatch(
        updateAddPostData({
          add_new_post_steps: ((addPostData.add_new_post_steps ?? 0) - 1) as
            | 1
            | 2
            | 3,
        })
      );
    }
  };

  return (
    <div className="h-auto w-full">
      {/* heading */}
      <div className="flex w-full items-start justify-start pb-3">
        <h2 className="font-poppins text-lg font-medium text-black">
          Follow Us on
        </h2>
      </div>

      {/* input box  */}
      <div className="step-container w-full rounded-lg p-6">
        <SocilMediaIcon />
        <div className="mt-8 grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <AddWhatsappinkInputBox />
          <AddFacebookprofilelink />
          <AddInstagramInput />
          <AddTwitterlink />
        </div>
      </div>

      {/* Previous btn and next btn */}
      <div className="mx-auto flex w-[90%] flex-col md:flex-row items-center justify-center gap-6 pt-10 xl:w-full">
        <div>
          <button
            onClick={handlePreviousStep}
            className="bordercoloricon font-poppins rounded-xl bg-transparent px-12 py-3 font-medium text-[#0046AE]"
          >
            Previous
          </button>
        </div>
        <div>
          <button
            onClick={handleNextStep}
            className="font-poppins rounded-xl bg-[#0046AE] px-12 py-3 font-medium text-white"
          >
            Next Step 
          </button>
        </div>
      </div>
    </div>
  );
}

export default FollowUs;
