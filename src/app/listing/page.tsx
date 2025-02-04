import React from "react";
import SerachDesing from "../componets/Listing/LeftSide/SerachDesing";
import CardListing from "../componets/Listing/RightSide/CardListing";
import ServiceListBreadCome from "../componets/AllBreadCome/ServiceListBreadCome";

function Listing() {
  return (
    <div className="w-full h-auto">
      {/* Header */}
      <div>
        <ServiceListBreadCome />
      </div>

      <div className="mx-auto 2xl:w-[60%] xl:w-[80%] w-[90%] mt-[5rem] grid xl:grid-cols-[30%_70%] gap-6   bg-white  grid-cols-1">
        {/* First column */}
        <div className=" h-auto">
          <SerachDesing />
        </div>

        {/* Second column */}
        <div className=" h-auto ">
          <CardListing />
        </div>
      </div>
    </div>
  );
}

export default Listing;
