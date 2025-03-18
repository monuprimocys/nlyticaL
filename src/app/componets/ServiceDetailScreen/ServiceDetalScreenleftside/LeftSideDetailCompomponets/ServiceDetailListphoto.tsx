"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import ServiceDetailPhotoSectionModal from "./ServiceDetailPhotoSectionModal";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import image from "../../../../../../public/assets/Image/1.png";
const ServiceDetailListphoto: React.FC = () => {
  const ServiceDetailData = useAppSelector((state) => state.serviceDetail);
  const images = ServiceDetailData.serviceDetail.service_images;
  const imageCount = images.length;

  // State to track selected image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  // Handle image click to either open image modal or login modal
  const handleImageClick = (image: string) => {
    setSelectedImage(image); // Directly set the selected image
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`w-full  h-auto rounded-xl p-4 flex flex-col  ${
        isDarkMode
          ? "text-white   bg-[#212121]"
          : " text-black photoservicedetailborderandshado"
      }`}
    >
      {/* Heading */}
      <div className="text-lg font-medium items-start font-poppins">
        Photos{" "}
      </div>

      {/* Image grid */}
      <div className="w-full grid gap-4 px-2 md:px-4 md:grid-cols-3 grid-cols-2 xl:grid-cols-5 mt-3">
        {/* First 4 images */}
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="w-full h-32 bg-[#0046AE] rounded-xl cursor-pointer"
            style={{
              backgroundImage: `url(${image || "image"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => handleImageClick(image)} // Pass only the image to handle click
          ></div>
        ))}

        {imageCount > 5 && (
          <div
            className="relative w-full h-32 cursor-pointer bg-[#0046AE] rounded-xl"
            style={{
              backgroundImage: `url(${images[4] || "image"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => dispatch(showModal("ServiceDetailScreenModalImage"))}
          >
            <div className="absolute bottom-0 right-0 h-full rounded-xl bg-opacity-[70%] w-full text-4xl flex justify-center items-center bg-black font-medium text-white">
              +{imageCount - 4}
            </div>
          </div>
        )}
      </div>

      {/* Modal for viewing image */}
      <ServiceDetailPhotoSectionModal
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
    </div>
  );
};

export default ServiceDetailListphoto;
