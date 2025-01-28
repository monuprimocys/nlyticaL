import React from "react";
import Header from "../componets/Category/Header";
import SubscribeCard from "../componets/Subscribe/SubscribeCard";
import Heading from "../componets/Heading/Heading";

function Subscribe() {
  return (
    <div className="h-auto w-full">
      {/* header  */}
      <div>
        <Header />
      </div>

      {/* heading */}

      <div className="mt-[3rem] w-full xl:mt-[5rem]">
        <Heading
          title="Our Pricing Plam "
          highlightedTitle="  Affordable price Packages"
        />
      </div>

      {/* card */}
      <div className="mx-auto mt-[3rem] grid w-[90%] grid-cols-1 items-center justify-between gap-6 md:grid-cols-2 xl:mt-[5rem] xl:w-[80%] xl:grid-cols-3 2xl:w-[60%]">
        <SubscribeCard />
        <SubscribeCard />
        <SubscribeCard />
      </div>
    </div>
  );
}

export default Subscribe;
