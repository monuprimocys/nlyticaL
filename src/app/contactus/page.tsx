import React from "react";
import ContacntComponets from "./ContacntComponets";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "  Contact Us   - Nlytical",
  description: "Learn more Contact Us Nlytical and its services.",
};


function page() {
  return (
    <div className=" w-full h-auto">
      <ContacntComponets />
    </div>
  );
}

export default page;
