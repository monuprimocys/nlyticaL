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

function BusinessNameModal() {
  const modalOpen = useAppSelector((state) => state.modals.BusinessNameModal);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  
  // Form state for business name and description
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  
  const [updateService, { data, isLoading, error }] = useUpdateServiceMutation();
  
  console.log("fsdjkifhsjkiufhsdfk@@121212######", data);
  
  useEffect(() => {
    if (vendor_id && service_id) {
      const fetchData = async () => {
        try {
          const response = await updateService({
            vendor_id,
            service_id,
          }).unwrap();
          console.log("API Response:", response);
  
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
  
    // Prepare the data to be sent for updating
    const updatedData = {
      vendor_id,
      service_id,
      service_name: serviceName,
      service_description: serviceDescription,
    };
  
    try {
      // Send update request to the API
      const response = await updateService(updatedData).unwrap();
  
      // Handle the API response
      if (response?.status) {
        console.log("Service updated successfully:", response);
        
        // Refetch data after form submission to reflect the updates
        const fetchData = async () => {
          try {
            const updatedResponse = await updateService({
              vendor_id,
              service_id,
            }).unwrap();
            console.log("Refetched API Response after update:", updatedResponse);
  
            if (updatedResponse?.status) {
              setServiceName(updatedResponse?.service?.service_name || "");
              setServiceDescription(updatedResponse?.service?.service_description || "");
            }
          } catch (err) {
            console.error("Refetch API Error:", err);
          }
        };
  
        // Call fetchData to get the updated information
        fetchData();
  
        // Dispatch action to hide the modal on successful update
        dispatch(hideModal("BusinessNameModal"));
      } else {
        console.log("Failed to update service:", response?.message);
        // Handle error or failed update here
      }
    } catch (err) {
      console.error("API Error:", err);
      // Handle error
    }
  };
  

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel className="mx-auto pb-6 h-auto w-[90%] rounded-2xl bg-white shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]">
            <div className="flex w-full items-center justify-between p-4 modalbordercolor font-poppins rounded-b-lg">
              <h3 className="font-poppins text-lg font-medium text-black text-center w-full">
                Business Name
              </h3>

              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className="h-8 w-8"
                  alt="Close icon"
                  onClick={() => {
                    dispatch(hideModal("BusinessNameModal"));
                  }}
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

              <p className="text-[15px] font-normal text-[#0046AE] text-center font-poppins">
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
                    className="text-sm font-medium text-[#000000]"
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
                      value={serviceName} // Bind the value to the state
                      onChange={(e) => setServiceName(e.target.value)} // Update the state on change
                      className="border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm"
                      fullWidth
                      required
                      style={{ minHeight: "3rem" }}
                    />
                  </div>
                </div>

                <div className="h-fit mb-4 w-full">
                  <label
                    className="font-poppins text-sm font-medium text-[#000000]"
                    htmlFor="service_description"
                  >
                    Business Description
                  </label>
                  <div className="relative mt-2">
                    <TextField
                      id="service_description"
                      name="service_description"
                      placeholder="Enter Business Description"
                      value={serviceDescription} // Bind the value to the state
                      onChange={(e) => setServiceDescription(e.target.value)} // Update the state on change
                      className="!border-[#6565657a] border-[1px] rounded-md"
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
