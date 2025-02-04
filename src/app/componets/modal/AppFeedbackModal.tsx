import { useAppfeedbackMutation } from "@/app/store/api/appfeedback"; // Import the correct mutation hook
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/store/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import React, { useState } from "react";
import "./style.css";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

function AppFeedbackModal() {
  const modalData = useAppSelector((state) => state.modals.AppFeedback);
  const user_id = Cookies.get("user_id"); // Assuming the user ID is stored in cookies
  const dispatch = useAppDispatch();

  const [feedbackReview, setFeedbackReview] = useState<string>("");

  // Correct hook for mutation
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
      // console.log("Feedback", feedbackReview);

      await submitFeedback({
        user_id: user_id ?? "",
        feedback_review: feedbackReview,
      }).unwrap();
      toast.success("Your feedback has been added successfully.");
      close();
    } catch (error) {
      toast.error("Failed to submit feedback. Please try again later.");
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-auto w-[90%] rounded-2xl bg-white shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%] 2xl:w-[25%]    ${
              isDarkMode ? "bg-[#212121]" : "bg-[#FFFFFF]"
            }`}
          >
            {/* Modal Header */}
            <div
              className={` flex h-auto w-full items-center justify-center rounded-xl p-4  ${
                isDarkMode
                  ? "text-[#FFFFFF] shadow-lg  bg-[#FFFFFF0A] "
                  : "text-[#000000] deleteac"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium ">Language</h3>
            </div>

            {/* Feedback Section */}
            <div className="h-auto w-full p-8">
              <div className="flex h-auto w-full flex-col gap-4 bg-transparent">
                <h6
                  className={`font-poppins text-[18px] font-normal  ${
                    isDarkMode ? "text-[#FFFFFF] " : "text-[#000000] "
                  }`}
                >
                  Feel Free to share your feedback with Us
                </h6>

                <div
                  className={` h-auto w-full rounded-xl ${
                    isDarkMode
                      ? "bg-[#2121210A] text-[#FFFFFF] "
                      : "bg-[#FFFFFF0A] text-[#000000] "
                  }`}
                >
                  <textarea
                    id="feedback_review"
                    name="feedback_review"
                    className={`font-poppins h-full w-full text-nowrap rounded-xl px-4 py-2 text-sm font-normal text-[#000000] placeholder-[#909091] focus:outline-none   ${
                      isDarkMode
                        ? "bg-[#2121210A] text-[#FFFFFF]  feedbackbordercolor "
                        : "bg-[#FFFFFF0A] text-[#000000] feedbackbordercolor "
                    }`}
                    placeholder="Write Your Review..."
                    value={feedbackReview}
                    onChange={handleFeedbackChange}
                    required
                    rows={5}
                  ></textarea>
                </div>
              </div>

              <div className="mx-auto mt-4 w-[60%]">
                <button
                  className="font-poppins h-12 w-full rounded-xl bg-[#0046AE] px-8 font-medium text-white transition-all duration-300 ease-in-out"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send "}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default AppFeedbackModal;
