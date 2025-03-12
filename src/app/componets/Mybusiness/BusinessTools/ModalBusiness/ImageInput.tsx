import React, { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Image from "next/image";
import uploadicon from "../../../../../../public/assets/Image/uploadicon.png";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import Cookies from "js-cookie";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import useRemoveServiceImage from "@/app/storeApp/api/useremoveservceimage";
import crossicon from "../../../../../../public/assets/Image/add-circle.png";

function ImageInput() {
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const dispatch = useAppDispatch();

  const allFilesRef = useRef<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<
    { name: string; file: File; url: string }[]
  >([]);
  const [allImages, setAllImages] = useState<{ id: number; url: string }[]>([]);

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  // Load stored image count from localStorage on mount
  useEffect(() => {
    const storedImageCount = localStorage.getItem("service_image_length");
    if (storedImageCount) {
      console.log(`Stored service image count: ${storedImageCount}`);
    }
    updateService({ vendor_id, service_id });
  }, []);

  useEffect(() => {
    if (data?.service_images) {
      const formattedImages = data.service_images.map((img: any) => ({
        id: img.id,
        url: img.service_images,
      }));
      setAllImages(formattedImages);

      // Store image count in localStorage
      localStorage.setItem(
        "service_image_length",
        formattedImages.length.toString()
      );
    }
  }, [data]);

  const handleSave = async () => {
    if (!vendor_id || !service_id) {
      console.error("Missing vendor_id or service_id");
      return;
    }

    const formData = new FormData();
    formData.append("vendor_id", vendor_id);
    formData.append("service_id", service_id);

    allFilesRef.current.forEach((file) => {
      formData.append("service_images[]", file);
    });

    try {
      const response = await updateService(formData).unwrap();
      console.log("Update Success:", response);
      dispatch(hideModal("BusinessImagesModal"));

      // Update local storage image count
      const newCount = allImages.length + uploadedFiles.length;
      localStorage.setItem("service_image_length", newCount.toString());
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    allFilesRef.current = [...allFilesRef.current, ...Array.from(files)];

    setUploadedFiles((prevFiles) => {
      const updatedFiles = [
        ...prevFiles,
        ...Array.from(files).map((file) => ({
          name: file.name,
          file,
          url: URL.createObjectURL(file),
        })),
      ];

      // Update image count in localStorage
      const newImageCount = allImages.length + updatedFiles.length;
      localStorage.setItem("service_image_length", newImageCount.toString());

      return updatedFiles;
    });
  };

  // Handle Image Removal (API + Local)
  const { mutate: removeImage } = useRemoveServiceImage(vendor_id, service_id);

  const handleRemoveImage = (id: number) => {
    removeImage(id);
    const updatedImages = allImages.filter((img) => img.id !== id);
    setAllImages(updatedImages);

    // Update image count in localStorage
    localStorage.setItem(
      "service_image_length",
      updatedImages.length.toString()
    );
  };

  const handleRemoveUploadedFile = (index: number) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);

      // Update image count in localStorage
      const newImageCount = allImages.length + updatedFiles.length;
      localStorage.setItem("service_image_length", newImageCount.toString());

      return updatedFiles;
    });
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <label
          className={`font-poppins text-sm font-medium ${
            isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
          }`}
          htmlFor="service_image"
        >
          Service Image/Video
        </label>

        {/* File Input Container */}
        <div
          className="borderinputbox font-poppins mt-2 flex h-[6rem] w-full border-[#6565657a] border-[1px] cursor-pointer items-center justify-center rounded-lg bg-transparent p-3 focus:border-[#0046AE] focus:outline-none"
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
              className={`h-6 w-6 object-cover ${isDarkMode ? "invert" : ""}`}
            />
            <p
              className={`font-poppins ${
                isDarkMode ? "text-[#ffffff]" : "text-[#B4B4B4]"
              }`}
            >
              Click to upload
            </p>
          </div>
        </div>

        {/* Display All Images (API + Selected) */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {/* API Images */}
          {allImages.map((image) => (
            <div
              key={image.id}
              className="relative w-full h-24 rounded-lg overflow-hidden border"
            >
              <Image
                src={image.url}
                alt={`Service Image ${image.id}`}
                layout="fill"
                objectFit="cover"
              />
              {/* Remove Button */}
              <button
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                onClick={() => handleRemoveImage(image.id)}
              >
                <Image src={crossicon} alt="Remove" width={16} height={16} />
              </button>
            </div>
          ))}

          {/* Selected Images */}
          {uploadedFiles.map((file, index) => (
            <div
              key={`uploaded-${index}`}
              className="relative w-full h-24 rounded-lg overflow-hidden border"
            >
              <Image
                src={file.url}
                alt={file.name}
                layout="fill"
                objectFit="cover"
              />
              {/* Remove Button */}
              <button
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                onClick={() => handleRemoveUploadedFile(index)}
              >
                <Image src={crossicon} alt="Remove" width={16} height={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="w-full flex justify-center items-center pt-6">
          <button
            type="button"
            className="w-fit px-[5rem] py-3 bg-[#0046AE] rounded-lg font-poppins text-white"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageInput;
