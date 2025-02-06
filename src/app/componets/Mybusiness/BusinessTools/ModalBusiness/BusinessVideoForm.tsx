"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import crossicon from "../../../../../../public/assets/Image/add-circle.png";
import uploadicon from "../../../../../../public/assets/Image/uploadicon.png";
import { useDispatch } from "react-redux";
import { updateServiceImages } from "@/app/store/Slice/AddPostSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/store/api/updateServiceApi";
import toast from "react-hot-toast";
import { hideModal } from "@/app/store/Slice/modalSlice";

function BusinessVideoForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFilesState] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const storesliceImage = useAppSelector(
    (state) => state.AddPost.service_image
  );

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [updateService, { data, isLoading }] = useUpdateServiceMutation();

  console.log(" my upload file   video", uploadedFiles);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray: File[] = Array.from(files);

      const validFiles = fileArray.filter((file) =>
        file.type.startsWith("video")
      );
      const invalidFiles = fileArray.filter(
        (file) => !file.type.startsWith("video")
      );

      if (invalidFiles.length > 0) {
        setError("Only video files are allowed.");
        return;
      }

      setError(null);

      setUploadedFilesState((prevFiles) => {
        const newFiles = [...prevFiles, ...validFiles];
        dispatch(updateServiceImages(newFiles));
        return newFiles;
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFilesState((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      dispatch(updateServiceImages(updatedFiles));
      return updatedFiles;
    });
  };

  const getFileType = (file: File) => {
    if (file.type.startsWith("image")) return "image";
    if (file.type.startsWith("video")) return "video";
    return "other";
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Function to handle fullscreen toggle
  const handleFullScreen = (event: React.MouseEvent<HTMLVideoElement>) => {
    const videoElement = event.currentTarget;

    // Check if the browser supports fullscreen
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      // Firefox
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      // Chrome, Safari
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      // IE/Edge
      videoElement.msRequestFullscreen();
    }
  };

  //    when clikc on btn the
  //    when clikc on btn the  call the api

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object to hold the data
    const formData = new FormData();

    // Append the existing data to the FormData object
    formData.append("vendor_id", vendor_id);
    formData.append("service_id", service_id);

    uploadedFiles.forEach((file) => {
      formData.append("video", file);
    });

    try {
      // Send the update request to the API with FormData
      const response = await updateService(formData).unwrap();
      toast.success(response.message);
      dispatch(hideModal("BusinessVideoModal"));

      if (response?.status) {
        // Dispatch the updateServiceField action to update Redux store
        // Assuming you have a Redux action you want to dispatch after successful update
      } else {
        console.log("Failed to update service:", response?.message);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <label
          className={`font-poppins text-sm font-medium ${
            isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
          }`}
          htmlFor="address"
        >
          Service Video
          <span className="text-[#F21818] pl-[1px]">*</span>
        </label>

        <div
          className={`font-poppins mt-2 flex h-[6rem] w-full !border-[#6565657a] border-[1px] cursor-pointer items-center justify-center rounded-lg p-3 focus:border-[#0046AE] focus:outline-none ${
            isDarkMode
              ? "text-[#FFFFFF] borde-2 border-[#373737] bg-[#FFFFFF0A]"
              : "borderinputbox"
          }`}
          onClick={handleFileClick}
        >
          <input
            type="file"
            accept="video/*"
            multiple
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="flex w-full flex-col items-center justify-center">
            <Image
              src={uploadicon}
              alt="upload icon"
              className="h-6 w-6 object-cover"
            />
            <p className="font-poppins text-[#B4B4B4]">Service Video </p>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <div className="w-full h-fit overflow-y-auto">
          {storesliceImage.length > 0 && (
            <div
              className={`uploadimageslide mt-2 flex flex-wrap items-start h-full justify-start gap-4 overflow-x-auto pt-4 overflow-y-auto`}
            >
              {storesliceImage.map((file, index) => {
                const fileType = getFileType(file);

                return (
                  <div
                    key={index}
                    className="relative mt-[-1rem] flex items-center justify-center"
                  >
                    <div className="relative">
                      {fileType === "video" && file && (
                        <div className=" w-[12rem]   h-[12rem]  flex  justify-center items-center">
                          <video
                            className="uploadimageborder rounded-md object-cover  h-[70%] w-[70%]  cursor-pointer   "
                            controls
                            onClick={handleFullScreen} // Trigger fullscreen on click
                          >
                            <source
                              src={URL.createObjectURL(file)}
                              type={file.type}
                            />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      )}

                      <button
                        className="absolute right-[-0.2rem] top-0 flex items-center justify-center text-sm text-gray-600"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#BABABA] text-sm text-gray-600">
                          <Image
                            src={crossicon}
                            alt="cross icon"
                            className="h-4 w-4 object-cover"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/*  submit btn */}

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
