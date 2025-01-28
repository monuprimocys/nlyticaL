import React from "react";
import Header from "../componets/Category/Header";
import MybusinessLable from "../componets/Mybusiness/MybusinessLable";
import MainSectionQuickLink from "../componets/Mybusiness/BusinessQuickLinks/MainSectionQuickLink";
import Businesstools from "../componets/Mybusiness/BusinessTools/Businesstools";
import BusinessService from "../componets/Mybusiness/BusinessService/BusinessService";
import CustomeSupport from "../componets/Mybusiness/CustomreSupport/CustomeSupport";

function Mybusiness() {
  return (
    <div className=" w-full h-auto  flex  flex-col gap-6">
      {/*  header  */}
      <Header />

      {/*  complete my lable bussiness  */}
      <MybusinessLable />
      <MainSectionQuickLink />
      <Businesstools />
      <BusinessService />
      <CustomeSupport />
    </div>
  );
}

export default Mybusiness;
