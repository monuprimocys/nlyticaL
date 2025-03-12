"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import loginbgimage from "../../../../public/assets/Image/loginbgimage.png";
import logo from "../../../../public/assets/Image/logo.png";
import { useAppSelector } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import { useDispatch } from "react-redux";
import FormValues from "./FormValues";
import { ToastContainer } from "react-toastify";

export default function RegisterWithMobailNumberOtpVerify() {
  const modalData = useAppSelector(
    (state) => state.modals.RegisterWithMobailNumberOtpVerify
  );
  const dispatch = useDispatch();

  const RegisterUseremail = useAppSelector((state) => state.registration);

  return (
    <Dialog open={modalData} onClose={() => {}}>
      <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-6  bg">
          <DialogPanel
            style={{
              backgroundImage: `url(${loginbgimage.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            className="w-full max-w-[30rem] rounded-xl  bg-white p-8 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={logo}
                alt="Logo"
                className="h-20 w-[11rem] object-contain"
              />
              <p className="text-center text-sm text-gray-600 sm:px-6 font-poppins">
                Discover more about our app by registering or logging in. 
              </p>
            </div>

            <div className="  mt-4">
              <FormValues />
            </div>
          </DialogPanel>
        </div>
        <ToastContainer position="top-right" autoClose={5000} />
      </div>

    </Dialog>
  );
}
