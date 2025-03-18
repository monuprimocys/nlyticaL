"use client"; // This is important for Next.js to handle client-side rendering

import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import staricon from "../../../../../../public/assets/Image/starindetailscreen.png";
import { useState } from "react";
import Cookies from "js-cookie";
import { useAddReviewScreenApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useAddReviewScreenApi";
import { toast } from "react-toastify";
import { useServiceDetailApi } from "@/app/storeApp/api/ServiceDetailScreenApi/useServiceDetailApi";

const ServiceDetailScreenRatingModal = () => {
  const modalData = useAppSelector(
    (state) => state.modals.ServiceDetailScreenRatingModal
  );
  const dispatch = useAppDispatch();
  const user_id = Cookies.get("user_id");
  const service_id = sessionStorage.getItem("serviceId");
  const { refetch } = useServiceDetailApi(service_id);

  // Use the mutate function from useMutation
  const { mutate, isLoading } = useAddReviewScreenApi();

  const close = () => {
    dispatch(hideModal("ServiceDetailScreenRatingModal"));
  };

  // State for selected stars and review message
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [reviewMessage, setReviewMessage] = useState<string>("");

  // Handle star click
  const handleStarClick = (index: number) => {
    setSelectedStars(index + 1);
  };

  // Handle review message input
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewMessage(e.target.value);
  };

  const handleSubmit = async () => {
    refetch();

    // Validation to ensure a rating and review message are provided
    if (!selectedStars || !reviewMessage.trim()) {
      toast.error("Please provide a rating and a review message.");
      return;
    }

    try {
      // Submit the review using the mutate function from the API hook
      await mutate(
        {
          service_id,
          user_id,
          review_star: String(selectedStars),
          review_message: reviewMessage,
        },
        {
          onSuccess: (data) => {
            console.log("API Success Response:", data);
            toast.success("Review submitted successfully!");
            refetch();
            close();
          },
          onError: (error) => {
            console.error(
              "API Error Response:",
              error?.response?.data || error
            );
            toast.error(
              error?.response?.data?.message ||
                "Something went wrong. Please try again."
            );
          },
        }
      );
    } catch (error) {
      console.error("Unexpected API Error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-auto w-[90%] rounded-2xl flex flex-col gap-6 shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[80%] xl:w-[70%] 2xl:w-[30%]   ${
              isDarkMode ? " bg-[#212121]" : "bg-white "
            } `}
          >
            {/* Modal Header */}
            <div
              className={`flex h-auto w-full items-center justify-center rounded-xl p-4  ${
                isDarkMode ? "  bg-[#FFFFFF0A]" : " borderxcolorwithshado  "
              }`}
            >
              <h3
                className={`font-poppins text-lg font-medium   ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Ratings
              </h3>
            </div>

            <button
              className="absolute top-1 right-1 bg-gray-300 rounded-full p-2 text-2xl text-[#0046AE]"
              onClick={close}
              aria-label="Close"
            >
              <IoClose />
            </button>

            {/* Modal Body */}
            <div className="w-full flex flex-col items-center gap-6 p-4">
              <h4
                className={`font-poppins  text-lg font-medium  ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Start Your Review
              </h4>

              <div className="w-full flex justify-center gap-4">
                {[...Array(5)].map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleStarClick(idx)}
                    className={`h-12 w-12 rounded-lg p-1 flex justify-center items-center cursor-pointer 
                    ${selectedStars > idx ? "bg-yellow-500" : "bg-[#E8E8E8]"}`}
                  >
                    <Image
                      src={staricon}
                      alt="star"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Message Box */}
              <textarea
                placeholder="Write your review..."
                value={reviewMessage}
                onChange={handleMessageChange}
                className={`w-[80%] mx-auto h-[10rem] p-4 mt-4  rounded-lg resize-none  ${
                  isDarkMode
                    ? "  bg-[#FFFFFF0A]  border-2 border-[#FFFFFF52] focus:[#FFFFFF52]"
                    : "  bg-white revirecardbnt"
                }`}
              />

              {/* Submit Button */}
              <button
                className="w-fit h-12 text-lg px-6 font-poppins font-medium text-white bg-[#0046AE] rounded-md hover:bg-[#003B89] transition-all duration-300 ease-in-out"
                type="button"
                onClick={handleSubmit}
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ServiceDetailScreenRatingModal;
