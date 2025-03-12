import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../businesscss.css";
import infocircle from "../../../../../../public/assets/Image/info-circle.png";
import { Button, TextField } from "@mui/material";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useEffect, useState } from "react";
import { updateServiceField } from "@/app/storeApp/Slice/serviceSlice"; // Import the action

function NumberofEmployeesModal() {
  const modalOpen = useAppSelector(
    (state) => state.modals.NumberofEmployeesModal
  );

  const employee_strength = useAppSelector(
    (state) => state.service.service.employee_strength
  );

  console.log(" employee#####", employee_strength);

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  // Mapping employee strength values to dropdown options
  const employeeStrengthMap = {
    "Less than 10": "1-5",
    "10-100": "10-100",
    "100-500": "100-500",
    "500-1000": "500-1000",
    "1000-2000": "1000-2000",
    "2000-5000": "2000-5000",
    "5000-10000": "5000-10000",
    "More than 10000": "10000+",
  };

  const [employees, setEmployees] = useState(
    employeeStrengthMap[employee_strength] || "1-5" // Default to "1-5" if no match
  );

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const dispatch = useAppDispatch();

  const close = () => {
    dispatch(hideModal("NumberofEmployeesModal"));
  };

  const handleSave = () => {
    // update the slice and api state
    updateService({
      vendor_id: vendor_id,
      service_id: service_id,
      employee_strength: employees,
    });

    // Update the service field using the field name and updated value
    dispatch(updateServiceField({ employee_strength: employees }));
    close();
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]   ${
              isDarkMode ? "bg-[#212121] text-white" : "bg-white"
            }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg   ${
                isDarkMode ? "bg-[#FFFFFF0A]" : "modalbordercolor"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                Business Address
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
                  isDarkMode ? "text-white" : "text-[#0046AE]"
                }`}
              >
                Please select the number of employees at your company
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto flex-col gap-6">
              {/* Employee Dropdown */}
              {[
                { value: "1-5", label: "Less than 10" },
                { value: "10-100", label: "10-100" },
                { value: "100-500", label: "100-500" },
                { value: "500-1000", label: "500-1000" },
                { value: "1000-2000", label: "1000-2000" },
                { value: "2000-5000", label: "2000-5000" },
                { value: "5000-10000", label: "5000-10000" },
                { value: "10000+", label: "More than 10000" },
              ].map((option) => (
                <div
                  key={option.value}
                  className={`w-full flex justify-start items-center p-4 rounded-lg shadow-md space-x-4  ${
                    isDarkMode
                      ? "bg-[#FFFFFF0A] hover:bg-[#FFFFFF1A] border-2 border-[#373737]   text-white"
                      : "hover:bg-[#F5F5F5]   text-black"
                  }`}
                >
                  <input
                    type="radio"
                    name="employees"
                    value={option.value}
                    checked={employees === option.value}
                    onChange={(e) => setEmployees(e.target.value)}
                    className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <p className="text-lg font-normal font-poppins">
                    {option.label}
                  </p>
                </div>
              ))}

              <div className="w-full justify-center items-center flex">
                <button
                  type="button"
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

export default NumberofEmployeesModal;
