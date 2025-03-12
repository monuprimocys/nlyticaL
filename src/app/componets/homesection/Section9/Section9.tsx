import React from "react";
import SameTypeCard from "./SameTypeCard";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Heading from "../../Heading/Heading";

function Section9() {
  return (
    <div className=" w-full h-auto mt-[5rem] overflow-hidden ">
      <div className=" w-[90%] 2xl:w-[60%] h-auto mx-auto gap-5 flex  flex-col  ">
        {/* heading  about section */}
        <div className=" w-full mt-4">
          <Heading
            title="Our Pricing Plam "
            highlightedTitle="  Affordable price Packages"
          />
        </div>

        {/* card  */}

        <div className=" w-full  relative     grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-3    pb-[14px]  gap-10 md:gap-6 mt-10">
          <SameTypeCard />
          <Card2 />
          <Card3 />
        </div>
      </div>
    </div>
  );
}

export default Section9;
