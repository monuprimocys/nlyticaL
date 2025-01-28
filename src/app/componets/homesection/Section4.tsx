"use client";

import bgimage from "../../../../public/assets/Image/Homesection4image.png";
import arror from "../../../../public/assets/Image/section4arrorw.png";
import thirdcolume from "../../../../public/assets/Image/section4thirdcolume.png";
import secomdcolume from "../../../../public/assets/Image/section4image.png";
import arrowright from "../../../../public/assets/Image/section4arrorw.png";
import Image from "next/image";

function Section4() {
  return (
    <div className="w-full h-auto mt-[6rem] ">
      <div className="w-[90%] sm:w-[85%] md:w-[90%] 2xl:w-[70%] mx-auto flex flex-wrap xl:flex-nowrap justify-between gap-4">
        {/* First Section (Left Box) */}
        <div
          className="w-full md:w-[48%] xl:w-[35%] h-[35rem] md:h-[35rem] rounded-[2rem] relative flex flex-col justify-end overflow-hidden items-center cursor-pointer"
          style={{
            backgroundImage: `url(${bgimage.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Top Right Circle */}
          <div className="absolute top-[-0.5rem] right-[-0.5rem] w-[5rem] h-[5rem] rounded-full shadow-lg bg-white p-2 cursor-pointer">
            <div className="w-full h-full rounded-full bg-[#0046AE] flex justify-center items-center">
              <Image className="w-[2rem] h-[2rem]" src={arror} alt="arrow" />
            </div>
          </div>

          {/* Bottom Center */}
          <div className="w-full p-6 section4linearbgcolor h-[35%] flex flex-col gap-4 justify-center rounded-2xl">
            <div>
              <h4 className="text-3xl font-semibold text-white font-poppins">
                MEN’S COLLECTION
              </h4>
            </div>
            {/* Description */}
            <div className="w-[50%]">
              <p className="text-base font-[400] text-white font-poppins line-clamp-3">
                MEN’S FASHION COLLECTION: STYLE FOR EVERY OCCASION.
              </p>
            </div>
          </div>
        </div>

        {/* Middle Section (2 right boxes) */}
        <div className="w-full md:w-[48%] xl:w-[30%] h-[35rem] flex flex-col justify-between gap-6 cursor-pointer">
          {/* First Box */}
          <div className="h-[50%] section4linearcloor rounded-[2rem] p-6 w-full relative">
            <div className="w-[75%] mx-auto">
              <h4 className="text-2xl font-semibold text-white font-poppins">
                GET 25% OFF THIS Nlytical CODE
              </h4>
            </div>

            {/* Button */}
            <div className="bg-[#FFFFFF] bg-opacity-[21%] absolute bottom-7 px-4 py-2 rounded-[3rem] right-[3rem]">
              <button className="text-[#FFFFFF] opacity-70 font-poppins">
                NlyticalNEW01
              </button>
            </div>
          </div>

          {/* Second Box */}
          <div
            className="h-[50%] rounded-[3rem] mb-6 md:mb-0"
            style={{
              backgroundImage: `url(${secomdcolume.src})`, // Fixed usage of secomdcolume.src
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="w-full h-full section4box2 rounded-[3rem] flex justify-center items-center relative">
              <div>
                <h4 className="text-lg font-medium text-white font-poppins w-[80%] mx-auto">
                  Introducing latest Bag collection
                </h4>
              </div>

              {/* Bottom Circle */}
              <div className="absolute bottom-[-1.5rem] right-[45%] w-[5rem] h-[5rem] rounded-full shadow-lg bg-white p-2 cursor-pointer">
                <div className="w-full h-full rounded-full bg-[#0046AE] flex justify-center items-center">
                  <Image
                    className="w-[2rem] h-[2rem]"
                    src={arrowright}
                    alt="arrow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Section (Right Box) */}
        <div
          className="w-full md:w-[48%] xl:w-[35%] h-[35rem] rounded-[2rem] relative flex flex-col justify-end overflow-hidden items-center cursor-pointer"
          style={{
            backgroundImage: `url(${thirdcolume.src})`, // Fixed usage of thirdcolume.src
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Top Right Circle */}
          <div className="absolute top-1/2 right-[-0.5rem] w-[5rem] h-[5rem] rounded-full shadow-lg bg-white p-2 cursor-pointer">
            <div className="w-full h-full rounded-full bg-[#0046AE] flex justify-center items-center">
              <Image
                className="w-[2rem] h-[2rem]"
                src={arrowright}
                alt="arrow"
              />
            </div>
          </div>

          {/* Bottom Center */}
          <div className="w-full p-6 section4linearbgcolor h-[35%] flex flex-col gap-4 justify-center rounded-2xl">
            <div>
              <h4 className="text-3xl font-semibold text-white font-poppins">
                MEN’S COLLECTION
              </h4>
            </div>
            {/* Description */}
            <div className="w-[50%]">
              <p className="text-base font-[400] text-white font-poppins line-clamp-3">
                MEN’S FASHION COLLECTION: STYLE FOR EVERY OCCASION.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section4;
