import React from "react";
import AboutComponet from "./AboutComponet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Nlytical",
  description: "Learn more about Nlytical and its services.",
};

function page() {
  return (
    <div className=" w-full h-auto">
      <AboutComponet />
    </div>
  );
}

export default page;
