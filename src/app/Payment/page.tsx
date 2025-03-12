"use client";

import React from "react";
import PaymentBreadComeSub from "../componets/AllBreadCome/PaymentBreadComeSub";
import { useAppSelector } from "../hooks/hooks";
import PaymentCombineLeftSideAndRightSide from "../componets/Payment/PaymentCombineLeftSideAndRightSide";

function Payment() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className=" w-full h-auto flex flex-col">
      <div>
        <PaymentBreadComeSub />
      </div>

      <div
        className={`mx-auto 2xl:w-[50%] xl:w-[80%] w-[90%] mt-[3rem]      gap-6    flex  ${
          isDarkMode ? "bg-[#212121] text-[#ffffff]" : " bg-white "
        } `}
      >
        <PaymentCombineLeftSideAndRightSide />
      </div>
    </div>
  );
}

export default Payment;
