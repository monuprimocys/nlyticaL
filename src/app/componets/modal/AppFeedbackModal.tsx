import { useAppfeedbackMutation } from "@/app/storeApp/api/appfeedback"; // Import the correct mutation hook
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import "./style.css";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure toast styles are loaded
import { setDarkMode } from "@/app/storeApp/Slice/darkModeSlice";

function AppFeedbackModal() {
  const modalData = useAppSelector((state) => state.modals.AppFeedback);
  const user_id = Cookies.get("user_id"); // Get user ID from cookies
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    dispatch(setDarkMode(savedMode));
    document.documentElement.classList.toggle("dark", savedMode);
  }, [dispatch]);

  const [feedbackReview, setFeedbackReview] = useState<string>("");

  // Correct mutation hook
  const [submitFeedback, { isLoading }] = useAppfeedbackMutation();

  const close = () => {
    dispatch(hideModal("AppFeedback"));
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackReview(e.target.value);
  };

  const handleSubmit = async () => {
    if (!feedbackReview) {
      toast.error("Please provide your feedback before submitting.");
      return;
    }

    try {
      const response = await submitFeedback({
        user_id: user_id ?? "",
        feedback_review: feedbackReview,
      }).unwrap(); // Use `.unwrap()` to directly get the response data

      console.log("Unwrapped Response:", response);

      if (response.status === true) {
        toast.success(
          response.message || "Your feedback has been submitted successfully!"
        );
        setTimeout(() => {
          close();
        }, 3000); // Close modal after 3 seconds
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Failed to submit feedback. Please try again later.");
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto  overflow-hidden bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-auto w-[90%] rounded-2xl shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%] 2xl:w-[25%] ${
              isDarkMode ? "bg-[#212121]" : "bg-[#FFFFFF]"
            }`}
          >
            {/* Modal Header */}
            <div
              className={`flex h-auto w-full items-center justify-center rounded-xl p-4 ${
                isDarkMode
                  ? "text-[#FFFFFF] shadow-lg bg-[#FFFFFF0A]"
                  : "text-[#000000] deleteac"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium">
                Nlytical App Feedback
              </h3>
            </div>

            {/* Feedback Section */}
            <div className="h-auto w-full p-8">
              <div className="flex h-auto w-full flex-col gap-4 bg-transparent">
                <h6
                  className={`font-poppins text-[18px] font-normal ${
                    isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
                  }`}
                >
                  Feel Free to share your feedback with Us
                </h6>

                <div
                  className={`h-auto w-full rounded-xl ${
                    isDarkMode
                      ? "bg-[#2121210A] text-[#FFFFFF]"
                      : "bg-[#FFFFFF0A] text-[#000000]"
                  }`}
                >
                  <textarea
                    id="feedback_review"
                    name="feedback_review"
                    className={`font-poppins h-full w-full text-nowrap rounded-xl px-4 py-2 text-sm font-normal text-[#000000] placeholder-[#909091] focus:outline-none ${
                      isDarkMode
                        ? "bg-[#2121210A] text-[#FFFFFF] feedbackbordercolor"
                        : "bg-[#FFFFFF0A] text-[#000000] feedbackbordercolor"
                    }`}
                    placeholder="Write Your Review..."
                    value={feedbackReview}
                    onChange={handleFeedbackChange}
                    required
                    rows={5}
                  ></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mx-auto mt-4 w-[60%]">
                <button
                  className="font-poppins h-12 w-full rounded-xl bg-[#0046AE] px-8 font-medium text-white transition-all duration-300 ease-in-out"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </div>

            {/* Toast Notifications */}
          </DialogPanel>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Dialog>
  );
}

export default AppFeedbackModal;
