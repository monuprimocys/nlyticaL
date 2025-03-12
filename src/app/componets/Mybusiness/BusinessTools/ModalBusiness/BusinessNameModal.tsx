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
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice"; // Import updateServiceField from slice

function BusinessNameModal() {
  const modalOpen = useAppSelector((state) => state.modals.BusinessNameModal);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const storevalues = useAppSelector((state) => state.service.service);

  // Form state for business name and description
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  useEffect(() => {
    if (vendor_id && service_id) {
      const fetchData = async () => {
        try {
          const response = await updateService({
            vendor_id,
            service_id,
          }).unwrap();
          if (response?.status) {
            setServiceName(response?.service?.service_name || "");
            setServiceDescription(response?.service?.service_description || "");
          }
        } catch (err) {
          console.error("API Error:", err);
        }
      };

      fetchData();
    }
  }, [vendor_id, service_id, updateService]);

  // Inside your BusinessNameModal component:
  const dispatch = useAppDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      vendor_id,
      service_id,
      service_name: serviceName,
      service_description: serviceDescription,
    };

    try {
      const response = await updateService(updatedData).unwrap();

      if (response?.status) {
        console.log("Service updated successfully:", response);

        // Dispatch action to update the Redux store with the updated service name and description
        dispatch(
          updateServiceField({
            service_name: serviceName,
            service_description: serviceDescription,
          })
        );

        // Dispatch action to hide the modal
        dispatch(hideModal("BusinessNameModal"));
      } else {
        console.log("Failed to update service:", response?.message);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  return (
    <Dialog
      open={modalOpen}
      onClose={() => dispatch(hideModal("BusinessNameModal"))}
      as="div"
      className="z-50"
    >
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]  ${
              isDarkMode ? " bg-[#212121] text-white" : "bg-white  text-black"
            }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg  ${
                isDarkMode ? " bg-[#FFFFFF0A]" : " modalbordercolor"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                Business Name
              </h3>

              <div
                className="cursor-pointer"
                onClick={() => dispatch(hideModal("BusinessNameModal"))}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8  ${isDarkMode ? " invert" : ""}`}
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
                className={`text-[15px] font-normal text-center font-poppins   ${
                  isDarkMode ? "text-white" : "text-[#0046AE] "
                }`}
              >
                Enter your business name exactly how you would like it to look
                to all users.
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto">
              <form
                onSubmit={handleSubmit}
                className="w-full grid grid-cols-1 gap-4"
              >
                <div className="mb-4 w-full">
                  <label
                    className="text-sm font-medium "
                    htmlFor="service_name"
                  >
                    Business Name
                    <span className="text-[#F21818] pl-[1px]">*</span>
                  </label>
                  <div className="relative mt-2">
                    <TextField
                      id="service_name"
                      name="service_name"
                      placeholder="Business Name"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      className={` border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm  ${
                        isDarkMode
                          ? "text-white  bg-[#FFFFFF0A]"
                          : "text-[#0046AE] border-solid"
                      }`}
                      fullWidth
                      required
                      style={{ minHeight: "3rem" }}
                    />
                  </div>
                </div>

                <div className="h-fit mb-4 w-full">
                  <label
                    className="font-poppins text-sm font-medium "
                    htmlFor="service_description"
                  >
                    Business Description
                  </label>
                  <div className="relative mt-2">
                    <TextField
                      id="service_description"
                      name="service_description"
                      placeholder="Enter Business Description"
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      className={`!border-[#6565657a] border-[1px] rounded-md ${
                        isDarkMode
                          ? "!text-white  bg-[#FFFFFF0A]"
                          : "text-[#0046AE] border-solid"
                      }
                      }`}
                      variant="outlined"
                      fullWidth
                      multiline
                      rows={4}
                      required
                      style={{ minHeight: "4rem" }}
                    />
                  </div>
                </div>

                <div className="w-full justify-center items-center flex">
                  <button
                    type="submit"
                    className="w-fit px-[5rem] py-3 bg-[#0046AE] rounded-lg font-poppins text-white"
                  >
                    Save
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

export default BusinessNameModal;
