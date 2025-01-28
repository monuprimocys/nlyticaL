import { useAppSelector } from "@/app/hooks/hooks";
import { hideModal } from "@/app/store/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { RWebShare } from "react-web-share";
import "./style.css";
function ShareAppModal() {
  const dispatch = useDispatch();
  const modalData = useAppSelector((state) => state.modals.ShareAppModal);
  const close = () => {
    dispatch(hideModal("ShareAppModal"));
  };

  return (
    <Dialog open={modalData} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center">
          <DialogPanel className="mx-auto h-[12rem] w-[90%] rounded-2xl bg-white shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%] 2xl:w-[20%]">
            {/* Top Heading */}
            <div className="deleteac flex w-full items-center justify-center rounded-xl p-4">
              <h3 className="font-poppins text-lg font-medium text-black">
                Share
              </h3>
            </div>
            <RWebShare
              data={{
                text: "nlytical",
                url: "http://192.168.0.28:3000/",
                title: "Flamingos",
              }}
              // onClick={() => console.log("shared successfully!")}
            >
              <button className="font-poppins flex h-full w-full items-center justify-center pb-10 text-[#0046AE]">
                Share 🔗
              </button>
            </RWebShare>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ShareAppModal;
