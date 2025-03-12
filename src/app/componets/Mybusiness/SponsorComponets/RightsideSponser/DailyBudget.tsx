import React from "react";
import "./RightSideSponceStyle.css";
import dollar from "../../../../../../public/assets/Image/dollar.png";
import Image from "next/image";
import RangedailyBudget from "./RangedailyBudget";
function DailyBudget() {
  return (
    <div className="bordercolordailybudget rounded-xl  p-4">
      <div className=" w-full flex gap-3 justify-start items-center">
        <Image className="h-6 w-6 object-cover " src={dollar} alt="dollar" />
        <h2 className="text-sm font-medium font-poppins">Daily Budget</h2>
      </div>

      {/*  daily buget price  */}
      <div className=" w-full">
        <RangedailyBudget />
      </div>
    </div>
  );
}

export default DailyBudget;
