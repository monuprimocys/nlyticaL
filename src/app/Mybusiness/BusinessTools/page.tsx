import Header from "@/app/componets/Category/Header";
import BusinessNameMyBusiness from "@/app/componets/Mybusiness/BusinessTools/BusinessNameMyBusiness";
import BusinessAddressTools from "@/app/componets/Mybusiness/BusinessTools/ModalBusiness/BusinessAddressTools";
import ContactDetails from "@/app/componets/Mybusiness/BusinessTools/ModalBusiness/ContactDetails";
import React from "react";

function BusinessTools() {
  return (
    <div className=" w-full h-auto  flex flex-col gap-6 ">
      {/*  header  */}
      <div className=" w-full h-auto">
        <Header />
      </div>
      <div className="mx-auto 2xl:w-[60%] xl:w-[80%] flex-col gap-6 w-[95%] mt-[3rem]  flex  justify-between items-center ">
        <BusinessNameMyBusiness />
        <ContactDetails />
        <BusinessAddressTools/>
      </div>
    </div>
  );
}

export default BusinessTools;
