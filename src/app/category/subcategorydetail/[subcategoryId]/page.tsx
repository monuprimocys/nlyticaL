import CategorySubdetailBreadCome from "@/app/componets/AllBreadCome/CategorisBreadCome/CategorySubdetailBreadCome";
import LeftSide from "@/app/componets/Category/SubCategeoryList/LeftSide";
import RightSideCardListing from "@/app/componets/Category/SubCategeoryList/RightSideCardListing";
import React from "react";

function subcategeoyDetail() {
  return (
    <div className="w-full h-auto">
      {/* Header */}
      <div>
        <CategorySubdetailBreadCome />
      </div>

      <div className="mx-auto 2xl:w-[60%] xl:w-[80%] w-[90%] mt-[5rem] grid xl:grid-cols-[30%_70%] gap-6   bg-white  grid-cols-1">
        {/* First column */}
        <div className=" h-auto">
          <LeftSide />
        </div>

        {/* Second column */}
        <div className=" h-auto ">
          <RightSideCardListing />
        </div>
      </div>
    </div>
  );
}

export default subcategeoyDetail;
