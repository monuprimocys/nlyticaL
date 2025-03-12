"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import loginbgimage from "../../../../public/assets/Image/loginbgimage.png";
import logo from "../../../../public/assets/Image/logo.png";
import RegistrationForm from "@/app/componets/Registration/RegistrationForm";
import RegisterWithMobilenumber from "@/app/componets/Registration/RegisterWithMobilenumber";

export default function RegisterWithMobailnumberModal() {
  const modalData = useAppSelector(
    (state) => state.modals.RegisterWithMobilenumber
  );
  const dispatch = useAppDispatch();
  // modal close
  const handleModalClose = () => {
    dispatch(hideModal("RegisterWithMobilenumber"));
  };

  return (
    <Dialog open={modalData} onClose={handleModalClose}>
      <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            style={{
              backgroundImage: `url(${loginbgimage.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full max-w-[30rem] rounded-xl bg-white p-6 shadow-[rgba(17,_17,_26,_0.3)_0px_0px_16px] backdrop-blur-md transition-all duration-300 ease-in-out"
          >
            <div className="mb-6 flex w-full flex-col items-center justify-center">
              <Image
                src={logo}
                alt="Logo"
                className="h-24 w-[11rem] object-contain"
              />
              <p className="font-poppins mx-auto mt-1 px-4 text-center text-sm text-[#717171] sm:px-6">
                Discover more about our app by registering or logging in. 
              </p>
            </div>

            <div className="w-full md:px-4">
              <RegisterWithMobilenumber />

              {/* Sign In Link */}
              <div
                className="mt-4 flex items-center justify-center"
                onClick={() => {
                  dispatch(showModal("loginModal"));
                  dispatch(hideModal("RegisterModal"));
                  handleModalClose();
                }}
              >
                <p className="text-sm text-[#717171]">
                  Do have an account?{" "}
                  <span className="cursor-pointer font-medium text-[#056CB2]">
                    Sign In
                  </span>
                </p>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
