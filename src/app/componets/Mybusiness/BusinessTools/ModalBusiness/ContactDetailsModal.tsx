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
import { useEffect, useState } from "react";
import "react-phone-input-2/lib/high-res.css";
import PhoneInput from "react-phone-input-2";
import { updateServiceField } from "@/app/store/Slice/serviceSlice";
import { useDispatch } from "react-redux";

function ContactDetailsModal() {
  const modalOpen = useAppSelector((state) => state.modals.ContactDetailsModal);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const dispatch = useDispatch();

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  // Initialize form data
  const [formData, setFormData] = useState({
    service_phone: data?.service?.service_phone || "",
    country_code: data?.service?.service_country_code || "",
    email: data?.service?.service_email || "",
  });

  // Handle phone number change and log values
  const handlePhoneChange = (value, data) => {
    setFormData({
      ...formData,
      service_phone: value,
      country_code: `+${data.dialCode}`,
    });
  };

  useEffect(() => {
    if (vendor_id && service_id) {
      const fetchData = async () => {
        try {
          const response = await updateService({
            vendor_id,
            service_id,
          }).unwrap();
          if (response?.status) {
            setFormData({
              service_phone: response?.service?.service_phone || "",
              country_code: response?.service?.service_country_code || "",
              email: response?.service?.service_email || "",
            });
          }
        } catch (err) {
          console.error("API Error:", err);
        }
      };
      fetchData();
    }
  }, [vendor_id, service_id, updateService]);

  // Close modal logic
  const close = () => {
    dispatch(hideModal("ContactDetailsModal"));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the data to update
    const payload = {
      vendor_id,
      service_id,
      service_phone: formData.service_phone,
      country_code: formData.country_code,
      service_email: formData.email,
    };

    try {
      const response = await updateService(payload).unwrap();
      if (response?.status) {
        // Dispatch to update the Redux store with the new values
        dispatch(
          updateServiceField({
            service_phone: formData.service_phone,
            service_email: formData.email,
            service_country_code: formData.country_code,
          })
        );
        dispatch(hideModal("ContactDetailsModal"));
      } else {
        console.error("Failed to update service:", response?.message);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel className="mx-auto pb-6 h-auto w-[90%] rounded-2xl bg-white shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]">
            <div className="flex w-full items-center justify-between p-4 modalbordercolor font-poppins rounded-b-lg">
              <h3 className="font-poppins text-lg font-medium text-black text-center w-full">
                Contact Details
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
                Update your contact details to stay in touch with your customers
                in real time
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto">
              <form
                className="w-full grid grid-cols-1 gap-4"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    className="font-poppins text-sm font-medium text-[#000000]"
                    htmlFor="mobile"
                  >
                    Mobile Number
                    <span className="text-[#F21818] pl-[1px]">*</span>
                  </label>
                  <div className="relative mt-2 w-full">
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={formData.service_phone}
                      onChange={handlePhoneChange}
                      country={formData.country_code || "us"}
                      enableSearch
                    />
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label
                    className="text-sm font-medium text-[#000000]"
                    htmlFor="email"
                  >
                    Email
                    <span className="text-[#F21818] pl-[1px]">*</span>
                  </label>
                  <div className="relative mt-2">
                    <TextField
                      id="email"
                      name="email"
                      placeholder="email"
                      className="border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm"
                      fullWidth
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="w-full justify-center items-center flex">
                  <button
                    type="submit"
                    className="w-fit px-[5rem] py-3 bg-[#0046AE] rounded-lg font-poppins text-white"
                    disabled={isLoading} // Disable button while loading
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ContactDetailsModal;
