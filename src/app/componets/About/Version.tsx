import React from "react";
import bgimage from "../../../../public/assets/Image/aboutus1.png";
import "./style.css";
import Image from "next/image";
import aboutimage from "../../../../public/assets/Image/about2.png";

function Version() {
  return (
    <div
      className="h-auto bg-cover rounded-xl p-10 flex flex-col gap-6"
      style={{
        backgroundImage: `url(${bgimage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Heading */}
      <div className="w-full justify-center items-center flex flex-col gap-4">
        <h2 className="font-medium AmericanSign text-white text-3xl sm:text-4xl md:text-4xl">
          Integrity Growth
        </h2>
        <h4 className="font-medium font-poppins text-white text-xl md:text-3xl  lg:text-5xl">
          Vision and Values into action
        </h4>
      </div>

      {/* Card Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 h-full mx-auto w-[90%]">
        {/* Card 1 */}
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <div className="py-10 px-4 rounded-xl flex justify-center items-center flex-col gap-4 relative">
              <div className="absolute top-0 left-0 p-1">
                <h2 className="font-poppins text-5xl text-white font-medium stroke-text">
                  .01
                </h2>
              </div>
              <div className="w-[10em] h-[10rem] rounded-full border p-2 flex justify-center items-center cursor-pointer">
                <Image
                  src={aboutimage.src}
                  alt="about image"
                  width={400}
                  height={400}
                />
              </div>

              <div className="w-full flex items-center justify-center flex-col">
                <h3 className="font-poppins text-xl font-medium text-white">
                  Our Mission
                </h3>
                <p className="text-clip items-center font-poppins text-[#FFFFFFB5] font-normal text-sm text-center">
                  We are dedicated to delivering innovative solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <div className="py-10 px-4 rounded-xl flex justify-center items-center flex-col gap-4 relative">
              <div className="absolute top-0 left-0 p-1">
                <h2 className="font-poppins text-5xl text-white font-medium stroke-text">
                  .02
                </h2>
              </div>
              <div className="w-[10em] h-[10rem] rounded-full border p-2 flex justify-center items-center cursor-pointer">
                <Image
                  src={aboutimage.src}
                  alt="about image"
                  width={400}
                  height={400}
                />
              </div>

              <div className="w-full flex items-center justify-center flex-col">
                <h3 className="font-poppins text-xl font-medium text-white">
                  Our Mission
                </h3>
                <p className="text-clip items-center font-poppins text-[#FFFFFFB5] font-normal text-sm text-center">
                  We are dedicated to delivering innovative solutions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
            <div className="py-10 px-4 rounded-xl flex justify-center items-center flex-col gap-4 relative">
              <div className="absolute top-0 left-0 p-1">
                <h2 className="font-poppins text-5xl text-white font-medium stroke-text">
                  .03
                </h2>
              </div>
              <div className="w-[10em] h-[10rem] rounded-full border p-2 flex justify-center items-center cursor-pointer">
                <Image
                  src={aboutimage.src}
                  alt="about image"
                  width={400}
                  height={400}
                />
              </div>

              <div className="w-full flex items-center justify-center flex-col">
                <h3 className="font-poppins text-xl font-medium text-white">
                  Our Mission
                </h3>
                <p className="text-clip items-center font-poppins text-[#FFFFFFB5] font-normal text-sm text-center">
                  We are dedicated to delivering innovative solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Version;
