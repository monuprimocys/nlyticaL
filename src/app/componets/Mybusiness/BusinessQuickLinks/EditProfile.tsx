import React from "react";
import addprofile from "../../../../../public/assets/Image/editprofilebusiness.png";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";

function EditProfile() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const dispatch = useDispatch();

  return (
    <div
      className="  flex  flex-col gap-2 cursor-pointer "
      onClick={() => {
        dispatch(showModal("BusinessPorfileUpdateModal"));
      }}
    >
      <div className=" w-[6.3rem]  h-[6.3rem]  rounded-lg  flex justify-center items-center  bg-[#FFDCDC]  ">
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
        <p>Edit </p>
        <p>Profile</p>
      </div>
    </div>
  );
}

export default EditProfile;
