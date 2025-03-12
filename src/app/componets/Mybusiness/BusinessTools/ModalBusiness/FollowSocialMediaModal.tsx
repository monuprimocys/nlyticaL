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
import addbtn from "../../../../../../public/assets/Image/add.png";

function FollowSocialMediaModal() {
  const modalOpen = useAppSelector(
    (state) => state.modals.FollowSocialMediaModal
  );
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const facebook_link = useAppSelector(
    (state) => state.service.service.facebook_link
  );
  const instagram_link = useAppSelector(
    (state) => state.service.service.instagram_link
  );
  const twitter_link = useAppSelector(
    (state) => state.service.service.twitter_link
  );
  const whatsapp_link = useAppSelector(
    (state) => state.service.service.whatsapp_link
  );

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const dispatch = useAppDispatch();

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("FollowSocialMediaModal"));
  const handalfacebook_link = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateServiceField({ facebook_link: e.target.value }));
  };
  const handalinstagram_link = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateServiceField({ instagram_link: e.target.value }));
  };
  const handaltwitter_link = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateServiceField({ twitter_link: e.target.value }));
  };
  const handlewhatshop_link = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateServiceField({ whatsapp_link: e.target.value }));
  };

  const handleSave = async () => {
    try {
      // Call the update API with updated
      const updateData = {
        vendor_id,
        service_id,
        facebook_link,
        instagram_link,
        twitter_link,
        whatsapp_link,
      };
      await updateService(updateData).unwrap();

      // Optionally dispatch additional actions to update state (if needed)
      dispatch(updateServiceField({ facebook_link }));

      // Close modal after successful update
      close();
    } catch (error) {
      console.error("Error updating service website:", error);
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]  ${
              isDarkMode ? "bg-[#212121] text-white" : "bg-white text-black"
            }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg  ${
                isDarkMode ? " bg-[#FFFFFF0A]" : " modalbordercolor"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                Follow on Social Media{" "}
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
                className={`1text-[15px] font-normal  text-center font-poppins  ${
                  isDarkMode ? " text-white" : " text-[#0046AE]"
                }`}
              >
                Enter the address details that would be used by customers to
                locate your workplace
              </p>
            </div>

            <div className="mx-auto w-[80%] flex justify-center items-center h-auto  flex-col   gap-6">
              <div className=" w-full">
                <label
                  className={`text-sm font-medium  ${
                    isDarkMode ? " text-white" : "text-[#000000]"
                  }`}
                  htmlFor="facebook_link"
                >
                  facebook_link
                </label>
                <div className="relative mt-2 flex items-center">
                  <input
                    type="text"
                    id="facebook_link"
                    name="facebook_link"
                    className={`font-poppins inputboxborder w-full font-poppins rounded-md border  py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]  ${
                      isDarkMode
                        ? "text-white  bg-[#FFFFFF0A]"
                        : "text-[#000000] bg-white"
                    }`}
                    placeholder="facebook_link"
                    value={facebook_link}
                    onChange={handalfacebook_link}
                  />
                </div>
              </div>
              <div className=" w-full">
                <label
                  className={`text-sm font-medium  ${
                    isDarkMode ? " text-white" : "text-[#000000]"
                  }`}
                  htmlFor="instagram_link"
                >
                  instagram_link
                </label>
                <div className="relative mt-2 flex items-center">
                  <input
                    type="text"
                    id="instagram_link"
                    name="instagram_link"
                    className={`font-poppins inputboxborder w-full font-poppins rounded-md border  py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]  ${
                      isDarkMode
                        ? "text-white  bg-[#FFFFFF0A]"
                        : "text-[#000000] bg-white"
                    }`}
                    placeholder="instagram_link"
                    value={instagram_link}
                    onChange={handalinstagram_link}
                  />
                </div>
              </div>
              <div className=" w-full">
                <label
                  className={`text-sm font-medium  ${
                    isDarkMode ? " text-white" : "text-[#000000]"
                  }`}
                  htmlFor="whatsapp_link"
                >
                  whatsapp_link
                </label>
                <div className="relative mt-2 flex items-center">
                  <input
                    type="text"
                    id="whatsapp_link"
                    name="whatsapp_link"
                    className={`font-poppins inputboxborder w-full font-poppins rounded-md border  py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]  ${
                      isDarkMode
                       ? "text-white  bg-[#FFFFFF0A]"
                        : "text-[#000000] bg-white"
                    }`}
                    placeholder="whatsapp_link"
                    value={whatsapp_link}
                    onChange={handlewhatshop_link}
                  />
                </div>
              </div>
              <div className=" w-full">
                <label
                  className={`text-sm font-medium  ${
                    isDarkMode ? " text-white" : "text-[#000000]"
                  }`}
                  htmlFor="twitter_link"
                >
                  twitter_link
                </label>
                <div className="relative mt-2 flex items-center">
                  <input
                    type="text"
                    id="twitter_link"
                    name="twitter_link"
                    className={`font-poppins inputboxborder w-full font-poppins rounded-md border  py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]  ${
                      isDarkMode
                       ? "text-white  bg-[#FFFFFF0A]"
                        : "text-[#000000] bg-white"
                    }`}
                    placeholder="twitter_link"
                    value={twitter_link}
                    onChange={handaltwitter_link}
                  />
                </div>
              </div>

              <div
                className="flex w-full justify-center items-center mt-6"
                onClick={handleSave}
              >
                <button
                  type="submit"
                  className="w-[150px] h-[45px] font-poppins   rounded-md bg-[#0046AE] text-white font-medium text-sm hover:bg-[#0046AE] focus:outline-none focus:ring-[#0046AE]"
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

export default FollowSocialMediaModal;
