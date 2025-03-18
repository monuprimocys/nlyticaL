import React from "react";
import SubscribeComponets from "./SubscribeComponets";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "  Subscription  - Nlytical",
  description: "Learn more Subscription Nlytical and its services.",
};

function page() {
  return (
    <div className=" w-full h-auto">
      <SubscribeComponets />
    </div>
  );
}

export default page;
