import React from "react";
import "./businesscss.css";

function MybusinessLable() {
  return (
    <div className="mx-auto 2xl:w-[60%] xl:w-[80%] w-[90%] mt-[3rem]  businesslable  rounded-lg  py-10 px-16 flex  justify-between  items-center  ">
      {/* left side circle with text */}
      <div className="  flex  w-full  justify-start items-center gap-5">
        <div className="rounded-full h-[5rem]  w-[5rem]  bg-white bordercolorbusiness flex justify-center items-center">
          <p className=" text-[#00AE5D]  font-medium  text-lg  font-poppins">
            {" "}
            40%
          </p>
        </div>
        {/* content  */}
        <div className=" flex gap-1 flex-col">
          <p className=" text-black font-poppins text-xl  font-medium">
            Increase Business Profile Score
          </p>
          <p className=" text-[#848484]   font-poppins text-lg">
            {" "}
            Reach out to more Customers
          </p>
        </div>
      </div>
      {/*  right side btn  */}
      <div className="  w-full   justify-end items-end flex  ">
        <button className="py-3 px-6 text-white rounded-md  font-poppins bg-[#0046AE] ">
          Increase Score
        </button>
      </div>
    </div>
  );
}

export default MybusinessLable;
