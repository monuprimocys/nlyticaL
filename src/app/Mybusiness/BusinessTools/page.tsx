import MybusinessToolsBreadCome from "@/app/componets/AllBreadCome/MybusinessToolsBreadCome";
import Header from "@/app/componets/Category/Header";
import BusinessNameMyBusiness from "@/app/componets/Mybusiness/BusinessTools/BusinessNameMyBusiness";
import BusinessAddressTools from "@/app/componets/Mybusiness/BusinessTools/ModalBusiness/BusinessAddressTools";
import Businesscategories from "@/app/componets/Mybusiness/BusinessTools/ModalBusiness/Businesscategories";
import BusinessImages from "@/app/componets/Mybusiness/BusinessTools/ModalBusiness/BusinessImages";
import BusinessTimings from "@/app/componets/Mybusiness/BusinessTools/ModalBusiness/BusinessTimings";
import BusinessWebsite from "@/app/componets/Mybusiness/BusinessTools/ModalBusiness/BusinessWebsite";
import ContactDetails from "@/app/componets/Mybusiness/BusinessTools/ModalBusiness/ContactDetails";
import FollowSocialMedia from "@/app/componets/Mybusiness/BusinessTools/ModalBusiness/FollowSocialMedia";
import NumberofEmployees from "@/app/componets/Mybusiness/BusinessTools/ModalBusiness/NumberofEmployees";
import YearEstablishment from "@/app/componets/Mybusiness/BusinessTools/ModalBusiness/YearEstablishment";
import React from "react";

function BusinessTools() {
  return (
    <div className=" w-full h-auto  flex flex-col gap-6 ">
      {/*  header  */}
      <div className=" w-full h-auto">
        <MybusinessToolsBreadCome />
      </div>
      <div className="mx-auto 2xl:w-[60%] xl:w-[80%] flex-col gap-6 w-[95%] mt-[3rem]  flex  justify-between items-center ">
        <BusinessNameMyBusiness />
        <ContactDetails />
        <BusinessAddressTools />
        <BusinessTimings />
        <YearEstablishment />
        <Businesscategories />
        <NumberofEmployees />
        <BusinessImages />
        <BusinessWebsite />
        <FollowSocialMedia />
      </div>
    </div>
  );
}

export default BusinessTools;
