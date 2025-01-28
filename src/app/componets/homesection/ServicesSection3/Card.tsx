"use client";
import { Categorydata } from "@/app/types/Restypes";
import Image from "next/image";

const Card: React.FC<Categorydata> = ({
  category_image,
  category_name,
  subcategories_count,
  onClick,
}) => {
  return (
    <div className="overflow-hidden rounded-lg w-full" onClick={onClick}>
      <div
        className="relative  h-[12rem] xl:h-[16rem] w-full  rounded-2xl transform transition duration-300 ease-in-out overflow-hidden cursor-pointer flex items-end justify-center group"
        style={{
          backgroundImage: `url(${category_image})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {/* Default Title */}
        <div className="flex items-center justify-center w-full p-5 linear-color1 flex-col">
          <h4 className=" md:text-lg font-semibold text-[#FFFFFF] line-clamp-1 font-poppins group-hover:hidden">
            {category_name}
          </h4>
          <h4 className=" md:text-lg font-semibold text-[#FFFFFF] font-poppins  line-clamp-1 group-hover:hidden">
            {subcategories_count}
          </h4>
        </div>

        {/* Hover Effect - Icon and Text */}
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-4 transition-opacity duration-300 bg-[rgba(0,70,172,0.75)]  opacity-0 group-hover:opacity-100">
          {/* Hover Text */}
          <div className=" w-full flex justify-center items-center flex-col">
            <h4 className="md:text-2xl small:text-lg  text-xl  line-clamp-1  font-semibold text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              {category_name}
            </h4>
            <h4 className="md:text-2xl small:text-lg  text-xl  line-clamp-1  font-semibold text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              {subcategories_count}
            </h4>
          </div>
          {/* Hover Icon */}
          <div className="transform transition-all duration-500 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-[50%]">
            <div
              className="h-[5rem] w-[5rem]  rounded-full cursor-pointer flex justify-center items-center"
              style={{
                backgroundImage: `url("/assets/Image/Star 1.png")`,
                backgroundSize: "cover",
              }}
            >
              {/* Image component with width and height */}
              <Image
                src="/assets/Image/servicesarrow.png"
                alt="Arrow"
                width={30} // Add width
                height={30} // Add height
                className="object-cover w-[60%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
