import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import {
  addServiceImage,
  removeServiceImage,
} from "@/app/store/Slice/serviceSlice";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/add-circle.png";
import uploadicon from "../../../../../../public/assets/Image/uploadicon.png";
import Cookies from "js-cookie";
import useRemoveServiceImage from "@/app/store/api/useremoveservceimage";
import { useUpdateServiceMutation } from "@/app/store/api/updateServiceApi";

function ImageInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const dispatch = useDispatch();
  const [uploadedFiles, setUploadedFilesState] = useState<File[]>([]);

  const storesliceImage = useAppSelector(
    (state) => state.service.service_images
  );
  const { mutate: removeImage } = useRemoveServiceImage(vendor_id, service_id);

  console.log("My image slice###########", storesliceImage);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray: File[] = Array.from(files);
      setUploadedFilesState((prevFiles) => {
        const newFiles = [...prevFiles, ...fileArray];

        // Generate object URLs and store in Redux
        const fileUrls = newFiles.map((file) => file);

        // Dispatch to Redux to update state with the image URLs
        dispatch(addServiceImage(fileUrls));

        return newFiles;
      });
    }
  };

  const handleRemoveFile = (index: number) => {
    const imageToRemove = storesliceImage[index];

    // Remove from Redux (state update)
    dispatch(removeServiceImage(index));

    // Optionally remove from backend (via mutation)
    removeImage(imageToRemove); // Assuming image URL is used for removal
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full">
      <div className="w-full">
        <label
          className={`font-poppins text-sm font-medium  ${
            isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
          }`}
          htmlFor="service_image"
        >
          Service Image/Video
        </label>

        <div
          className="borderinputbox font-poppins mt-2 flex h-[6rem] w-full !border-[#6565657a] border-[1px] cursor-pointer items-center justify-center rounded-lg bg-transparent p-3 focus:border-[#0046AE] focus:outline-none"
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
              className={`h-6 w-6 object-cover   ${
                isDarkMode ? " invert" : ""
              }`}
            />
            <p
              className={`font-poppins  ${
                isDarkMode ? "text-[#ffffff]" : "text-[#B4B4B4]"
              }`}
            >
              Service Image/Video
            </p>
          </div>
        </div>

        {/* Display uploaded files from Redux */}
        <div className="w-full h-[11.8rem] md:h-[12rem] xl:h-[11.8rem] overflow-y-auto flex flex-wrap gap-6">
          {storesliceImage.map((imageData, index) => {
            return (
              <div
                key={index} // Use the index as the key
                className="relative mt-5 flex items-center justify-center"
              >
                <div className="relative">
                  <Image
                    src={imageData.service_images} // Use the URL for the image
                    alt={`Uploaded image ${index}`}
                    width={80}
                    height={80}
                    className="uploadimageborder rounded-md object-cover"
                  />
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
        {/* Save button */}
        <div className="w-full justify-center items-center flex pt-6">
          <button
            type="button"
            className="w-fit px-[5rem] py-3 bg-[#0046AE] rounded-lg font-poppins text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageInput;
