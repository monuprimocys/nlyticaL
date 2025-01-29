import React from "react";
import image from "../.././../../../public/assets/Image/message-question.png";
import dropdwon from "../../../../../public/assets/Image/dropdwonicon.png";
import Image from "next/image";
function FAQ() {
  return (
    <div className="mx-auto 2xl:w-[55%] xl:w-[80%] w-[90%] mt-[3rem] businesslable gap-5 rounded-lg p-8 flex justify-between items-center cursor-pointer">
      <div className=" flex gap-4 items-center  ">
        <Image
          className="w-[2rem] h-[2rem] object-contain"
          src={image}
          alt="question"
        />
        <h5 className=" text-lg font-medium  font-poppins">FAQ</h5>
      </div>
      {/*  right side  */}
      <div className="flex gap-2">
        <Image
          className="w-[1.5rem] h-[1.5rem] object-contain"
          src={dropdwon}
          alt="dropdwon"
        />
      </div>
    </div>
  );
}

export default FAQ;
