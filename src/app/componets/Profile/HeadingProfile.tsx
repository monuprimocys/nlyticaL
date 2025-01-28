"use client";
import React from "react";
import bgimage from "../../../../public/assets/Image/bgimageheading.png";
import Addicon from "../../../../public/assets/Image/add.png";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

function HeadingProfile() {
  const isStore = Cookies.get("is_store");

  // Default text is "List your Business"
  let titleText = "List your Business";

  // Update titleText based on the value of is_store
  if (isStore === "1") {
    titleText = "Your Business"; // Show "Your Business" when is_store is "1"
  } else if (isStore === "0") {
    titleText = "Pending"; // Show "Pending" when is_store is "0"
  }

  const router = useRouter();

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
          onClick={() => router.push("/Mybusiness")}
          className=" cursor-pointer"
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
