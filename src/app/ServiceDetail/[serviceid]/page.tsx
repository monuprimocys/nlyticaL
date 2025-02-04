import ServiceDetailBreadCome from "@/app/componets/AllBreadCome/ServiceDetailBreadCome";
import ServiceDetalScreenleftside from "@/app/componets/ServiceDetailScreen/ServiceDetalScreenleftside/ServiceDetalScreenleftside";
import ServiceDetalScreenrightside from "@/app/componets/ServiceDetailScreen/ServiceDetalScreenrightside/ServiceDetalScreenrightside";
import React from "react";

function page() {
  return (
    <div className="w-full h-auto    ">
      {/* header */}
      <ServiceDetailBreadCome />

      {/* left side and right side card detail screen */}
      <div className="mx-auto w-[95%] md:w-[90%] lg:w-[80%] xl:w-[80%] 2xl:w-[60%] flex flex-col lg:flex-row h-auto mt-[3rem] gap-6 items-start">
        {/* Left side */}
        <div className="w-full lg:w-[65%] h-auto">
          <ServiceDetalScreenleftside />
        </div>

        {/* Right side */}
        <div className="w-full lg:w-[35%] h-auto">
          <ServiceDetalScreenrightside />
        </div>
      </div>
    </div>
  );
}

export default page;
