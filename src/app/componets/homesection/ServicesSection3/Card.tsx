"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import { Categorydata } from "@/app/types/Restypes";

const Card: React.FC<Categorydata> = ({
  category_image,
  category_name,
  subcategories_count,
  onClick,
}) => {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div
      className="w-[8rem]   h-[11rem] flex flex-col gap-1 overflow-x-hidden justify-between items-center cursor-pointer"
      onClick={onClick}
    >
      {/* Card Image Section */}
      <div
        className={`w-full h-[70%] flex justify-center items-center  rounded-lg   ${
          isDarkMode ? " bg-[#212121]" : " bg-[#0046AE0F] cardbordercolor"
        }`}
      >
        <div
          className=" w-[50%]  h-[50%] bg-cover  rounded-xl"
          style={{
            backgroundImage: `url(${category_image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        ></div>
      </div>

      {/* Card Content Section */}
      <div className="w-full h-[30%] flex justify-center items-center">
        <p
          className={`font-poppins  text-center line-clamp-2  ${
            isDarkMode ? " text-white" : " text-black"
          }`}
        >
          {category_name} ( {subcategories_count})       
        </p>
      </div>
    </div>
  );
};

export default Card;
