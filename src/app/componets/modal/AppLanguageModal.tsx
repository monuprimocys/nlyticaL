import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import "./style.css";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";

function AppLanguageModal() {
  const modalData = useAppSelector((state) => state.modals.AppLanguage);
  const user_id = Cookies.get("user_id"); // Assuming the user ID is stored in cookies
  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(hideModal("AppLanguage"));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      {/* Modal Content */}
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel
            className={`mx-auto h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%] 2xl:w-[25%]    ${
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

            {/* AppLanguage Section */}
            <div className="flex h-auto w-full flex-col gap-6 p-8">
              <div className="flex w-full cursor-pointer items-start justify-start gap-3">
                {/* circle */}
                <div className="applanguagebordercolor mt-1 flex h-5 w-5 items-center justify-center rounded-full">
                  {/* innecr circle  */}
                  <div className="h-[50%] w-[50%] rounded-full bg-[#0046AE]"></div>
                </div>
                {/* language name */}
                <div
                  className={`font-poppins flex items-center justify-center text-lg  ${
                    isDarkMode ? "text-[#FFFFFF]    " : "text-[#000000] "
                  }`}
                >
                  English
                </div>
              </div>
              <div className="flex w-full cursor-pointer items-start justify-start gap-3">
                {/* circle */}
                <div className="applanguagebordercolor mt-1 flex h-5 w-5 items-center justify-center rounded-full">
                  {/* innecr circle  */}
                  {/* <div className="h-[50%] w-[50%] rounded-full bg-[#0046AE]"></div> */}
                </div>
                {/* language name */}
                <div
                  className={`font-poppins flex items-center justify-center text-lg  ${
                    isDarkMode ? "text-[#FFFFFF]    " : "text-[#000000] "
                  }`}
                >
                  Hindi
                </div>
              </div>

              {/* btn */}
              <div className="flex w-full items-center justify-center gap-3">
                <button
                  className={` font-poppins w-full rounded-xl py-3   ${
                    isDarkMode
                      ? "text-[#FFFFFF]   applanguagebordercolor11  "
                      : "text-[#000000] applanguagebordercolor "
                  }`}
                  onClick={() => dispatch(hideModal("AppLanguage"))}
                >
                  Cancel
                </button>
                <button className="font-poppins w-full rounded-xl bg-[#0046AE] py-3 text-white">
                  Apply
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default AppLanguageModal;
