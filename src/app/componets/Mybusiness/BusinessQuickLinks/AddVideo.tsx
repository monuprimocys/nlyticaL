import React from "react";
import addprofile from "../../../../../public/assets/Image/videobusiness.png";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { hideModal, showModal } from "@/app/storeApp/Slice/modalSlice";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";

function AddVideo() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const dispatch = useAppDispatch();

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const is_store = Cookies.get("is_store");

  const handalmodalopne = () => {
    if (Number(is_store) === 0) {
      dispatch(showModal("CheackStoreAdd"));
      dispatch(hideModal("BusinessVideoModal"));
    } else {
      if (vendor_id && service_id) {
        updateService({ vendor_id, service_id }); // API call on button click
      }
      dispatch(showModal("BusinessVideoModal"));
    }
  };

  return (
    <div
      className="  flex  flex-col gap-2 cursor-pointer "
      onClick={handalmodalopne}
    >
      <div className="w-[6.3rem]  h-[6.3rem]  rounded-lg  flex justify-center items-center  bg-[#FFE1AA]  ">
        <Image
          src={addprofile}
          alt="edit profile"
          className="w-[60%] h-[60%] object-cover rounded-lg"
        />
      </div>
      {/*  lable  */}
      <div
        className={`flex flex-col  items-center   font-poppins   text-[17px] font-medium  ${
          isDarkMode ? "text-[#ffffff]" : "text-[#000000]"
        } `}
      >
        <p>Add </p>
        <p> Video</p>
      </div>
    </div>
  );
}

export default AddVideo;
