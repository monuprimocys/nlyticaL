" use client";
import LocationSerachHomeScreeen from "./HomeScrennSerch/LocationSerachHomeScreeen";
import CategorySearchHomeScrenn from "./HomeScrennSerch/CategorySearchHomeScrenn";
import { useAppSelector } from "@/app/hooks/hooks";
import serachicon from "../../../../public/assets/Image/search-normal1.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useTranslation from "@/app/hooks/useTranslation";
function HomeSectionSerachBox() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const router = useRouter();

  const { getTranslation } = useTranslation();

  return (
    <div className="relative h-auto w-full">
      <div
        className={`relative top-[-7rem] mx-auto h-fit w-[90%] rounded-xl  p-4 shadow md:top-[-4rem] md:w-[85%] lg:top-[-2.5rem] xl:top-[-6.8rem] xl:p-6 2xl:w-[60%] 2xl:p-10   ${
          isDarkMode
            ? "bg-[#212121] text-[#ffffff]"
            : "bg-[#ffffff]  text-black"
        }`}
      >
        {" "}
        <div className="mx-auto flex w-[95%] flex-col items-start justify-start gap-6">
          <div>
            <h3 className="font-poppins text-lg font-medium text-[#0046AE] xl:text-2xl">
              {getTranslation("Search your services ", "Search your services ")}
            </h3>
          </div>

          <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
            <div className="relative w-full lg:w-[70%] ">
              <LocationSerachHomeScreeen />
            </div>
            <div className="relative w-full">
              <CategorySearchHomeScrenn />
            </div>

            <div
              className="relative flex w-fit items-center justify-center md:mt-7"
              onClick={() => {
                router.push("/store");
              }}
            >
              <div className="flex h-[3rem] w-[3rem] cursor-pointer items-center justify-center rounded-xl bg-[#0046AE]">
                <Image
                  src={serachicon}
                  className=" h-[40%] w-[40%]   "
                  alt="serachicon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSectionSerachBox;
