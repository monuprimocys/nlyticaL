import MybuinessBreadComeService from "@/app/componets/AllBreadCome/MybuinessBreadComeService";
import CardlistService from "@/app/componets/Mybusiness/BusinessService/Service/CardlistService";
import Headingtittle from "@/app/componets/Mybusiness/BusinessService/Service/Headingtittle";
import React from "react";

function Services() {
  return (
    <div className=" w-full flex  h-auto  flex-col gap-6">
      <MybuinessBreadComeService />
      <div className="mx-auto 2xl:w-[60%] xl:w-[80%]   flex-col gap-6 w-[95%] mt-[3rem]  flex  justify-between items-center ">
        <Headingtittle />
        <CardlistService />
      </div>
    </div>
  );
}

export default Services;
