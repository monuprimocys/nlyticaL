import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";
import CombinePaymentLeftSideAndRightSide from "./CombinePaymentLeftSideAndRightSide";

function Paymentdesing() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`mx-auto 2xl:w-[50%] xl:w-[80%] w-[90%] mt-[3rem]      gap-6    flex  ${
        isDarkMode ? "bg-[#212121] text-[#ffffff]" : " bg-white "
      } `}
    >
      <CombinePaymentLeftSideAndRightSide />
    </div>
  );
}

export default Paymentdesing;
