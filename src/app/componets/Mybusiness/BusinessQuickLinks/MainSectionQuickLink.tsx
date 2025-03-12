import React, { useEffect } from "react";
import "../businesscss.css";
import EditProfile from "./EditProfile";
import AddPhotos from "./AddPhotos";
import AddContact from "./AddContact";
import BusinessTimings from "./BusinessTimings";
import Reviews from "./Reviews";
import AddWebsite from "./AddWebsite";
import AddVideo from "./AddVideo";
import AddSocialLinks from "./AddSocialLinks";
import { useAppSelector } from "@/app/hooks/hooks";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import {
  addServiceImage,
  updateServiceField,
} from "@/app/storeApp/Slice/serviceSlice";

function MainSectionQuickLink() {
  const dispatch = useDispatch();

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Trigger the mutation if vendor_id and service_id are present
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  // Handle the different states of the API call
  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    }

    if (error) {
      console.error("Error fetching service:", error);
    }

    if (data) {
      console.log("API Response:@@!!", data);

      dispatch(updateServiceField(data.service));
      dispatch(addServiceImage(data.service_images));
    }
  }, [data, isLoading, error]);
  return (
    <div
      className={`mx-auto 2xl:w-[60%] xl:w-[80%] w-[90%] mt-[3rem]    gap-5 flex-col rounded-lg py-10 px-6 md:px-16 flex  justify-center   items-center    ${
        isDarkMode ? "bg-[#212121]  " : "bg-[#ffffff]   businesslable"
      }`}
    >
      {/*  heading */}

      <div className=" w-full flex justify-center  flex-col items-center  gap-1">
        <h3
          className={`   font-poppins  text-xl  font-medium   ${
            isDarkMode ? "text-[#ffffff]  " : "text-[#000000]  "
          }`}
        >
          Quick Links
        </h3>
        <p
          className={`font-normal  font-poppins   text-[16px]   ${
            isDarkMode ? "text-[#FFFFFF9E]  " : "text-[#848484]  "
          } `}
        >
          Quick Links: Your Gateway to Essential Resources
        </p>
      </div>

      {/*   all type of links  */}
      <div className=" w-full  grid grid-cols-2  justify-items-center gap-6  xl:grid-cols-8   ">
        <EditProfile />
        <AddPhotos />
        <AddContact />
        <BusinessTimings />
        <Reviews />
        <AddWebsite />
        <AddVideo />
        <AddSocialLinks />
      </div>
    </div>
  );
}

export default MainSectionQuickLink;
