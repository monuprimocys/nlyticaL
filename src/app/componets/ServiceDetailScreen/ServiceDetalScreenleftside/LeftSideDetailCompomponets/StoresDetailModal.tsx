"use client"; // This is important for Next.js to handle client-side rendering

import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import hospital from "../../../../../../public/assets/Image/hospital.png";
import pdficon from "../../../../../../public/assets/Image/pdfdetail.png";
import Image from "next/image";
import ServiceDetailScreenFiltterModalDetailAnimationSlide from "./ServiceDetailScreenFiltterModalDetailAnimationSlide";

function StoresDetailModal() {
  const modalData = useAppSelector((state) => state.modals.StoresDetailModal);
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(hideModal("StoresDetailModal"));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const cardData = useAppSelector((state) => state.cards.cards);

  const store_image = cardData[0].store_images;
  console.log(" my   store image", cardData[0].store_attachments);

  const store_attachments = cardData[0].store_attachments;

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center py-4 px-2">
          <DialogPanel
            className={`mx-auto w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%] rounded-2xl shadow-lg backdrop-blur-2xl duration-300 ease-out ${
              isDarkMode ? "bg-[#212121] text-white" : "bg-white text-black"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`w-full p-4 rounded-xl ${
                isDarkMode ? "bg-[#FFFFFF0A]" : "border-b border-gray-200"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium text-center">
                {cardData[0].store_name}
              </h3>
            </div>

            {/* Close Button */}
            <button
              className="absolute top-2 right-2 bg-gray-300 rounded-full p-2 text-2xl text-[#0046AE]"
              onClick={close}
              aria-label="Close"
            >
              <IoClose />
            </button>

            {/*  doucment  */}

            <div className=" w-[90%] mx-auto flex flex-col py-6 gap-6">
              <ServiceDetailScreenFiltterModalDetailAnimationSlide />

              <div
                className="w-full flex  p-2 rounded-xl"
                style={{
                  border: "1px solid #0000001F",
                }}
              >
                <div className="flex flex-col md:flex-row gap-6 w-full   ">
                  <div className="w-full py-2 flex flex-col min-w-full justify-between gap-3">
                    <div className="flex  gap-2 w-full justify-between  items-center">
                      <div>
                        <p className="font-poppins text-lg text-black">
                          {cardData[0].store_name}
                        </p>
                      </div>
                      <p className="font-poppins text-xl font-medium text-black">
                        {cardData[0].price}
                      </p>
                    </div>

                    <div>
                      <p className="font-poppins text-sm text-[#535353] line-clamp-3">
                        {cardData[0].store_description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col  gap-6">
                <h4 className="w-full flex justify-start items-start font-medium font-poppins text-lg">
                  Documents
                </h4>

                <div className=" w-full flex justify-start items-start cursor-pointer">
                  <div className="flex items-center gap-2 flex-col">
                    {store_attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 flex-col"
                      >
                        {/* Wrap image with anchor tag to trigger download */}
                        <a href={attachment} target="_blanck" download>
                          <Image
                            src={pdficon}
                            alt="pdficon"
                            className="w-[3rem] h-[3rem]"
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default StoresDetailModal;
