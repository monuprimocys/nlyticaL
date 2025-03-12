"use client";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useAppSelector } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { useDispatch } from "react-redux";
import { useInnerChatList } from "@/app/storeApp/api/message/useInnerChatList";
import { VendorInfo } from "@/app/storeApp/api/message/VendorInfo";
import Cookies from "js-cookie";
import locationicon from "../../../../../public/assets/Image/location.png";
import call from "../../../../../public/assets/Image/call1.png";
import Image from "next/image";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";
import { useEffect, useState } from "react";
import crossicon from "../../../../../public/assets/Image/crossicon.png";

export default function VendorInfoModal() {
  const modalData = useAppSelector((state) => state.modals.VendorInfoModal);
  const dispatch = useDispatch();
  const userselected = useAppSelector((state) => state.selectedUser);

  console.log(" my selected user detail", userselected);

  // const to_user = sessionStorage.getItem("serviceId");

  const [to_user, setToUser] = useState<string | null>(
    sessionStorage.getItem("selecteduserid")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const newToUser = sessionStorage.getItem("selecteduserid");
      setToUser(newToUser);
    }, 1000); // Updates every second (adjust timing as needed)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  const from_user = Cookies.get("user_id");
  const { data, refetch } = useInnerChatList(from_user, to_user);

  const vendor_id = data?.to_user_details.id;
  const { data: vendorDetails, isLoading, error } = VendorInfo(vendor_id);

  console.log(" vendor details@@@@@@@@@@@", vendorDetails);

  const rating = parseFloat(vendorDetails?.Vendordetails.average_rating || "0");

  // Close modal
  const handleModalClose = () => {
    dispatch(hideModal("VendorInfoModal"));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalData} onClose={handleModalClose}>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-6  bg">
          <DialogPanel className="w-full max-w-[33rem] rounded-xl  relative bg-white p-8 shadow-lg backdrop-blur-md transition-all duration-300 ease-in-out">
            {/* close icon */}
            <div className=" w-full flex justify-end items-center  mt-[-1.2rem]">
              <div
                className="cursor-pointer"
                onClick={handleModalClose}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8 ${isDarkMode ? "invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 w-full  " >
              {/*  vendor image  */}
              <div className="w-[5rem] h-[4.5rem] rounded-full overflow-hidden flex justify-center items-center">
                <Image
                  src={
                    vendorDetails?.Vendordetails.image ||
                    "/path/to/default/image.png"
                  }
                  alt="vendor"
                  className="w-full h-full object-cover rounded-full"
                  width={80} // Adjust size as needed
                  height={80}
                />
              </div>

              {/*  vendor detail */}
              <div className=" w-[95%] flex flex-col gap-4">
                {/*  name  */}
                <h3 className="text-xl font-semibold font-poppins">
                  {vendorDetails?.Vendordetails.first_name}{" "}
                  <span>{vendorDetails?.Vendordetails.last_name}</span>
                </h3>

                {/*  star  */}
                <div className=" w-full flex gap-1">
                  {[...Array(Math.floor(rating))].map((_, index) => (
                    <MdOutlineStar
                      key={`full-${index}`}
                      className="text-[#FFA41C]"
                    />
                  ))}
                  {rating % 1 !== 0 && (
                    <IoIosStarHalf className="text-[#FFA41C]" />
                  )}
                  {[...Array(5 - Math.ceil(rating))].map((_, index) => (
                    <MdOutlineStar
                      key={`empty-${index}`}
                      className="text-[#D1D1D1]"
                    />
                  ))}
                </div>

                {/*  location */}
                <div className=" w-full  ">
                  <div className="flex items-center gap-2">
                    <div className=" h-[2rem]  w-[2rem] p-1  rounded-full  bg-slate-200 flex justify-center items-center">
                      <Image
                        src={locationicon}
                        width={20}
                        height={20}
                        alt="location icon"
                      />
                    </div>
                    <span className=" font-poppins">
                      {vendorDetails?.Vendordetails.address}
                    </span>
                  </div>
                </div>

                {/*   phone number */}
                <div className=" w-full  ">
                  <div className="flex items-center gap-2">
                    <div className=" h-[2rem]  w-[2rem] p-1  rounded-full  bg-slate-200 flex justify-center items-center">
                      <Image
                        src={call}
                        width={20}
                        height={20}
                        alt="location icon"
                      />
                    </div>
                    <span className=" font-poppins">
                      {vendorDetails?.Vendordetails.mobile}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
