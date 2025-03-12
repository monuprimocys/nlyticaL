"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../businesscss.css";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import { TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useEffect, useState } from "react";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice"; // Import the action
import YearEstablishmentModalInputBox from "./YearEstablishmentModalInputBox";

function YearEstablishmentModal() {
  const modalOpen = useAppSelector(
    (state) => state.modals.YearEstablishmentModal
  );
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  // Form state for business address
  const [address, setAddress] = useState("");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (vendor_id && service_id) {
      const fetchData = async () => {
        try {
          const response = await updateService({
            vendor_id,
            service_id,
          }).unwrap();
          if (response?.status) {
            setAddress(response?.service?.address || "");
          }
        } catch (err) {
          console.error("API Error:", err);
        }
      };

      fetchData();
    }
  }, [vendor_id, service_id, updateService]);

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("YearEstablishmentModal"));

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]  ${
              isDarkMode
                ? "text-[#FFFFFF] bg-[#212121]"
                : "text-[#212121] border-[#F8F9FC] bg-[#F8F9FC]"
            }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg   ${
                isDarkMode
                  ? "bg-[#FFFFFF0A]"
                  : "text-[#212121] modalbordercolor"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                Year of Establishment
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8   ${isDarkMode ? " invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            <div className="h-auto flex justify-center items-center mx-auto py-6 w-[80%]">
              <div className="flex items-center relative -top-[0.7rem] justify-center h-12 w-12">
                <Image
                  src={infocircle}
                  className="h-4 w-4"
                  alt="Information icon"
                />
              </div>
              <p
                className={`text-[15px] font-normal  text-center font-poppins  ${
                  isDarkMode ? "text-[#FFFFFF]" : "text-[#0046AE]"
                }`}
              >
                Please note that any changes to the details below can go for
                verification and take upto 2 working days to go live.
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto">
              <YearEstablishmentModalInputBox />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default YearEstablishmentModal;
