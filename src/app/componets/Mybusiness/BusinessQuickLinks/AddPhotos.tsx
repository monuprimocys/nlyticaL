import React from "react";
import addprofile from "../../../../../public/assets/Image/addphotobusiness.png";
import Image from "next/image";

function AddPhotos() {
  return (
    <div className="  flex  flex-col gap-2 cursor-pointer ">
      <div className="w-[6.3rem]  h-[6.3rem] rounded-lg  flex justify-center items-center  bg-[#C5FFCD]  ">
        <Image
          src={addprofile}
          alt="edit profile"
          className="w-[60%] h-[60%] object-cover rounded-lg"
        />
      </div>
      {/*  lable  */}
      <div className=" flex flex-col  items-center   font-poppins text-black  text-[17px] font-medium">
        <p>Add </p>
        <p>Photos</p>
      </div>
    </div>
  );
}

export default AddPhotos;
