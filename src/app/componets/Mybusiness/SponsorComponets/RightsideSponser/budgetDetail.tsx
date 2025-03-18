import { useAppSelector } from "@/app/hooks/hooks";
import React from "react";
import Startdatebudget from "./Startdatebudget";
import EndDateBudget from "./EndDateBudget";
import DailyBudget from "./DailyBudget";
import PriceDetailsSponcer from "./PriceDetailsSponcer";

function BudgetDetail() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className={`mx-auto w-full rounded-lg  flex flex-col gap-6 p-4  ${
        isDarkMode ? "bg-[#212121] text-[#ffffff]" : " bg-white businesslable"
      } `}
    >
      <div className=" w-full flex flex-col gap-4">
        <h3 className=" text-black  font-poppins  text-lg font-medium">
          What’s your ad budget?
        </h3>
        <p className=" text-sm font-poppins text-[#4E4E4E]">
          Excludes apple service fee and applicable taxes
        </p>
      </div>

      <div className=" w-full flex gap-2 flex-col  md:flex-row lg:justify-between items-center">
        <Startdatebudget />
        <EndDateBudget />
      </div>

      <div className=" w-full ">
        <DailyBudget />
      </div>
    </div>
  );
}

export default BudgetDetail;
