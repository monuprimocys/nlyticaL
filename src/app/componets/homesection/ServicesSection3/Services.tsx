"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Card from "./Card";

const servicesData = [
  { image: "/assets/Image/servicesimagebg.png", title: "Restaurants" },
  { image: "/assets/Image/servicesimagebg2.png", title: "Hotels" },
  { image: "/assets/Image/servicesimagebg3.png", title: "Education" },
  { image: "/assets/Image/servicesimagebg3.png", title: "Education" },
];

function Services() {
  const router = useRouter();
  return (
    <div className="w-full h-auto mt-10 overflow-hidden ">
      {/* Main Container: Row direction layout */}
      <div className="w-full md:w-[85%] xl:w-[85%] 2xl:w-[60%] mx-auto flex items-center justify-between flex-col md:flex-row overflow-hidden">
        {/* Services Grid: This section contains the Resizable carousel */}
        <div className=" w-[90%] md:w-[85%] xl:w-[92%] 2xl:w-[90%] mx-auto grid grid-cols-2   xl:grid-cols-4 gap-6">
          {/* <Resizable /> */}

          {servicesData.map((service, index) => (
            <div key={index} className="">
              <Card key={index} image={service.image} title={service.title} />
            </div>
          ))}
        </div>

        {/* Arrow Button: Aligned next to the carousel */}
        <div
          className="flex justify-center items-center group mt-5 rounded-full cursor-pointer"
          onClick={() => router.push("/category")}
        >
          <div className="h-[4rem] w-[4rem] md:h-[5rem] md:w-[5rem] border-2 border-[#0046AE] hover:bg-[#0046AE] rounded-full flex justify-center items-center">
            {/* Arrow icon */}
            <Image
              src="/assets/Image/servicesarrow.png"
              alt="Arrow"
              width={30}
              height={30}
              className="object-cover w-[60%] group-hover:filter group-hover:invert group-hover:brightness-0 group-hover:contrast-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
