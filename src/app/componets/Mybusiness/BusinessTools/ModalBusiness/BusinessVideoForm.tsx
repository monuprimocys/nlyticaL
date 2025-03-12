"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

function BusinessVideoForm() {
  const dispatch = useDispatch();

  const [error, setError] = useState<string | null>(null);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { isLoading, data }] = useUpdateServiceMutation();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // State for video URL
  const [videoUrl, setVideoUrl] = useState<string>("");

  // useEffect(() => {
  //   sessionStorage.setItem("video_url", videoUrl);
  // });

  // Fetch data and update state when API response is received
  useEffect(() => {
    updateService({ vendor_id, service_id });
  }, []);

  useEffect(() => {
    if (data?.service?.video_url) {
      setVideoUrl(data.service.video_url);
    }
  }, [data]);

  console.log("My video_url:", data?.service?.video_url);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoUrl.trim()) {
      toast.error("Please enter a valid video URL.");

      return;
    }
    setError(null);

    const formData = new FormData();
    formData.append("vendor_id", vendor_id || "");
    formData.append("service_id", service_id || "");
    formData.append("video_url", videoUrl);

    try {
      const response = await updateService(formData).unwrap();

      if (response?.message) {
        toast.success(response.message);
      }

      console.log(
        " my api respoince values from business video",
        response.service.video_url
      );
      localStorage.setItem("video_url",   response.service.video_url || "")

      dispatch(hideModal("BusinessVideoModal"));
    } catch (err) {
      console.error("API Error:", err);
      toast.error("Failed to update service.");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-1">
        <label
          className={`font-poppins text-sm pb-1 font-medium ${
            isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
          }`}
        >
          Enter Video URL
          <span className="text-[#F21818] pl-[1px]">*</span>
        </label>

        <TextField
          id="video-url"
          name="video-url"
          placeholder="Enter your video URL"
          fullWidth
          required
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          InputProps={{
            className: `font-poppins rounded-md ${
              isDarkMode
                ? "text-white bg-[#373737] border-2 border-white"
                : "text-black bg-white"
            }`,
          }}
        />

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-center">
          <button
            type="submit"
            className="w-fit px-[5rem] py-3 bg-[#0046AE] rounded-lg font-poppins text-white"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusinessVideoForm;
