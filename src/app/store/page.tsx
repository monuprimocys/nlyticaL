import React from "react";
import StoreComponet from "./StoreComponet";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stores - Nlytical",
  description: "Explore our wide range of stores with Nlytical.",
  openGraph: {
    title: "Stores - Nlytical",
    description: "Explore our wide range of stores with Nlytical.",
    images: "http://192.168.0.69:8001/assets/images/cover_images/1741083119.istockphoto-1393890856-612x612.jpg", // Replace with a valid image URL
  },
  twitter: {
    card: "summary_large_image",
    title: "Stores - Nlytical",
    description: "Explore our wide range of stores with Nlytical.",
    images: "http://192.168.0.69:8001/assets/images/cover_images/1741083119.istockphoto-1393890856-612x612.jpg", // Replace with a valid image URL
  },
};

function page() {
  return (
    <div className=" w-full  h-auto">
      <StoreComponet />
    </div>
  );
}

export default page;
