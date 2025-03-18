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
import "react-phone-input-2/lib/high-res.css";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice";
import { useDispatch } from "react-redux";
import PhoneNumberBusiness from "./PhoneNumberBusiness";
import { useUpdateService } from "@/app/storeApp/api/useUpdateService";

function ContactDetailsModal() {
  const modalOpen = useAppSelector((state) => state.modals.ContactDetailsModal);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const dispatch = useDispatch();
  const servicedetail = useAppSelector((state) => state.service.service);

  const [updateService, { isLoading, error }] = useUpdateServiceMutation();

  console.log(
    " my phone number and country code ~~~~ ",
    servicedetail.service_phone,
    servicedetail.service_country_code
  );

  // Initialize form data
  const [formData, setFormData] = useState({
    service_phone: servicedetail.service_phone,
    service_country_code: servicedetail.service_country_code,
    email: servicedetail.service_email,
  });

  useEffect(() => {
    setFormData({
      service_phone: servicedetail.service_phone || "",
      service_country_code: servicedetail.service_country_code || "",
      email: servicedetail.service_email || "",
    });
  }, [servicedetail]);

  // Close modal logic
  const close = () => {
    dispatch(hideModal("ContactDetailsModal"));
  };

  console.log(" my phone number and country code ~~~~ !!!!!!", formData);
  const { refetch } = useUpdateService();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior if inside a form

    if (!vendor_id || !service_id) {
      console.error("Missing vendor_id or service_id");
      return;
    }

    // Prepare the data to update
    const payload = {
      vendor_id,
      service_id,
      service_phone: formData.service_phone,
      service_country_code: formData.service_country_code,
      service_email: formData.email,
    };

    console.log(" my   payload values ", payload);

    try {
      const response = await updateService(payload).unwrap();
      if (response?.status) {
        // Dispatch to update the Redux store with the new values
        dispatch(
          updateServiceField({
            service_phone: formData.service_phone,
            service_email: formData.email,
            service_country_code: formData.service_country_code,
          })
        );
        refetch();
        dispatch(hideModal("ContactDetailsModal"));
      } else {
        console.error("Failed to update service:", response?.message);
      }
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
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
                Contact Details
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
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
                Update your contact details to stay in touch with your customers
                in real time
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto">
              <div className="w-full grid grid-cols-1 gap-4">
                <div className="relative mt-2 w-full">
                  <PhoneNumberBusiness />
                </div>
                <div className="mb-4 w-full">
                  <label className="text-sm font-medium " htmlFor="email">
                    Email
                    <span className="text-[#F21818] pl-[1px]">*</span>
                  </label>
                  <div className="relative mt-2">
                    <TextField
                      id="email"
                      name="email"
                      placeholder="email"
                      className={`font-poppins w-full rounded-md py-4 pl-3 pr-[3rem] placeholder-gray-500 focus:outline-none focus:ring-0 ${
                        isDarkMode
                          ? "text-white bg-[#373737] border-2 border-white focus:border-[#B5843F66]"
                          : "text-[#000000] bg-white focus:border-[#B5843F66]"
                      }`}
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
                    className="w-fit px-[5rem] py-3 bg-[#0046AE] rounded-lg font-poppins text-white"
                    onClick={handleSubmit} // Trigger handleSubmit when button is clicked
                    disabled={isLoading} // Disable button while loading
                  >
                    {isLoading ? "Saving..." : "Save "}
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default ContactDetailsModal;
