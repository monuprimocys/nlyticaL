"use client";
import React from "react";
import bgimage from "../../../../public/assets/Image/bgimageheading.png";
import Addicon from "../../../../public/assets/Image/add.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function HeadingProfile() {
  const isStore = Cookies.get("store_approval");
  const isServiceId = Cookies.get("service_id");

  console.log("my isServiceId", isServiceId); // Check the value of isServiceId
  console.log("my isStore", isStore); // Check the value of isStore

  // Define the title based on the conditions
  const titleText =
    isStore === "0" && (!isServiceId || isServiceId === "undefined")
      ? "List your Business"
      : isStore === "0" && isServiceId
      ? "Pending"
      : "Your Business ";

  const router = useRouter();

  const handleClick = () => {
    //  store approval values 0 then move list route to the
    if (isStore === "0") {
      router.push("/Subscribe");
    }

    // Only push to the route when isStore equals "1" and isServiceId is not "undefined"
    if (isStore === "1" && isServiceId !== "undefined") {
      router.push("/bussines");
    }
  };

  return (
    <div className="w-full rounded-xl p-[6px] shadow-xl">
      <div
        className="h-[6rem] w-full rounded-xl"
        style={{
          backgroundImage: `url(${bgimage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: "0.9",
          position: "relative",
        }}
      >
        {/* Background Color Overlay */}
        <div
          style={{
            backgroundColor: "rgba(0, 70, 174, 0.8)",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: "inherit",
          }}
          onClick={handleClick}
          className="cursor-pointer"
        >
          <div className="flex h-full w-full items-center justify-center gap-4">
            {/* Circle Icon */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
              <Image src={Addicon} alt="add" width={30} height={30} />
            </div>
            {/* Title */}
            <h4 className="font-poppins text-xl font-medium text-white">
              {titleText}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadingProfile;
