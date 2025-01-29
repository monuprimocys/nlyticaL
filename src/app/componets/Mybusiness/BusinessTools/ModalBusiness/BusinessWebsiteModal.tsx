"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/store/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../businesscss.css";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import { TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/store/api/updateServiceApi";
import { updateServiceField } from "@/app/store/Slice/serviceSlice";

function BusinessWebsiteModal() {
  const modalOpen = useAppSelector((state) => state.modals.BusinessWebsiteModal);
  const service_website = useAppSelector((state) => state.service.service.service_website);
  const dispatch = useAppDispatch();
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data, isLoading, error }] = useUpdateServiceMutation();

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("BusinessWebsiteModal"));

  // Handle website change in input field
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateServiceField({ service_website: e.target.value }));
  };

  // Handle save action (dispatch action to update service website and call API)
  const handleSave = async () => {
    try {
      // Call the update API with updated service_website
      const updateData = {
        vendor_id,
        service_id,
        service_website,
      };
      await updateService(updateData).unwrap();

      // Optionally dispatch additional actions to update state (if needed)
      dispatch(updateServiceField({ service_website }));

      // Close modal after successful update
      close();
    } catch (error) {
      console.error("Error updating service website:", error);
    }
  };

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel className="mx-auto pb-6 h-auto w-[90%] rounded-2xl bg-white shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]">
            <div className="flex w-full items-center justify-between p-4 modalbordercolor font-poppins rounded-b-lg">
              <h3 className="font-poppins text-lg font-medium text-black text-center w-full">
                Business Website
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image src={crossicon} className="h-8 w-8" alt="Close icon" />
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
              <p className="text-[15px] font-normal text-[#0046AE] text-center font-poppins">
                Enter the address details that would be used by customers to
                locate your workplace
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto flex-col gap-6">
              <div className=" w-full">
                <label
                  className="text-sm font-medium text-[#000000]"
                  htmlFor="service_website"
                >
                  Add Business Website
                </label>
                <div className="relative mt-2 flex items-center">
                  <input
                    type="text"
                    id="service_website"
                    name="service_website"
                    value={service_website}
                    onChange={handleWebsiteChange}
                    className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
                    placeholder="Website"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="w-full justify-center items-center flex">
                <button
                  type="button" // Change to "button" to prevent form submission behavior
                  onClick={handleSave}
                  className="w-fit px-[5rem] py-3 bg-[#0046AE] rounded-lg font-poppins text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default BusinessWebsiteModal;
