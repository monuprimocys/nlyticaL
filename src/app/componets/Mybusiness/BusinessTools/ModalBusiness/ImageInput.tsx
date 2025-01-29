"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import crossicon from "../../../../../../public/assets/Image/add-circle.png";
import uploadicon from "../../../../../../public/assets/Image/uploadicon.png";
import { useDispatch } from "react-redux";
import { updateServiceImages } from "@/app/store/Slice/AddPostSlice";
import { useAppSelector } from "@/app/hooks/hooks";

function ImageInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFilesState] = useState<File[]>([]);

  const storesliceImage = useAppSelector(
    (state) => state.AddPost.service_image
  );

  const defaultimages = useAppSelector((state) => state.service.service_images);

  console.log("my service image from slice", defaultimages);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  console.log("uploadedFiles: ", storesliceImage);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("my file upload: ", files);

    if (files && files.length > 0) {
      const fileArray: File[] = Array.from(files);

      setUploadedFilesState((prevFiles) => {
        const newFiles = [...prevFiles, ...fileArray];
        console.log("newFiles: ", newFiles);

        // Dispatch the entire FileList (File objects) to Redux
        dispatch(updateServiceImages(newFiles));

        return newFiles;
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFilesState((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);

      // Update Redux state when a file is removed
      dispatch(updateServiceImages(updatedFiles));

      return updatedFiles;
    });
  };

  const getFileType = (file: File | string) => {
    if (typeof file === "string") return "url"; // Handle URL case
    if (file.type.startsWith("image")) return "image";
    if (file.type.startsWith("video")) return "video";
    return "other";
  };

  return (
    <div>
      <div>
        <label
          className="font-poppins text-sm font-medium text-[#000000]"
          htmlFor="service_image"
        >
          Service Image/Video
        </label>

        <div
          className="borderinputbox font-poppins mt-2 flex h-[6rem] w-full !border-[#6565657a] border-[1px] cursor-pointer items-center justify-center rounded-lg  bg-transparent p-3 focus:border-[#0046AE] focus:outline-none"
          onClick={handleFileClick}
        >
          <input
            type="file"
            accept="image/*,video/*"
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
            <p className="font-poppins text-[#B4B4B4]">Service Image/Video</p>
          </div>
        </div>

        {/* Display uploaded files from Redux */}
        <div className="w-full h-[11.8rem] md:h-[12rem] xl:h-[11.8rem] overflow-y-auto">
          {defaultimages.length > 0 && (
            <div
              className={`uploadimageslide mt-2 flex flex-wrap items-start justify-start gap-4 overflow-x-auto pt-4 overflow-y-auto`}
            >
              {defaultimages.map((file, index) => {
                const fileType = getFileType(file); // Determine file type

                return (
                  <div
                    key={index}
                    className="relative mt-[-1rem] flex items-center justify-center"
                  >
                    <div className="relative">
                      {/* Handle image file preview */}
                      {fileType === "image" &&
                        typeof file !== "string" &&
                        file && (
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={`Uploaded image ${index}`}
                            width={80}
                            height={80}
                            className="uploadimageborder rounded-md object-cover"
                          />
                        )}

                      {/* Handle URL images */}
                      {fileType === "url" && typeof file === "string" && (
                        <img
                          src={file}
                          alt={`Service image ${index}`}
                          width={80}
                          height={80}
                          className="uploadimageborder rounded-md object-cover"
                        />
                      )}

                      {/* Handle video file preview */}
                      {fileType === "video" &&
                        typeof file !== "string" &&
                        file && (
                          <video
                            width={80}
                            height={80}
                            className="uploadimageborder rounded-md object-cover"
                            controls
                          >
                            <source
                              src={URL.createObjectURL(file)}
                              type={file.type}
                            />
                            Your browser does not support the video tag.
                          </video>
                        )}

                      {/* Remove file button */}
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
      </div>
    </div>
  );
}

export default ImageInput;
