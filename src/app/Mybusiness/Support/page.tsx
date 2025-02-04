import MybusinessBreadComeSupport from "@/app/componets/AllBreadCome/MybusinessBreadComeSupport";
import CustomreSupportFomr from "@/app/componets/Mybusiness/CustomreSupport/CustomreSupportFomr";
import FAQ from "@/app/componets/Mybusiness/CustomreSupport/FAQ";
import React from "react";

function Support() {
  return (
    <div className=" w-full h-auto flex flex-col gap-6">
      <MybusinessBreadComeSupport />
      <FAQ />
      <CustomreSupportFomr />
    </div>
  );
}

export default Support;
