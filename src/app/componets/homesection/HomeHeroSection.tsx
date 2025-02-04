"use client";

function HomeHeroSection() {
  return (
    <div className="w-full xl:h-[600px] 2xl:h-[650px]  flex items-center xl:bg-cover bg-no-repeat xl:bg-bottom xl:rounded-b-[8rem]  2xl:rounded-b-none h-[30rem] bg-center  bg-cover rounded-b-[3rem] md:rounded-b-[5rem] HomeHeroSection">
      <div className="mx-auto md:px-4 2xl:w-[80%] py-8 md:w-[90%] h-full  w-[95%]">
        <div className=" md:w-[95%]  xl:w-[70%] 2xl:w-[65%] flex flex-col  gap-4  mt-12     h-full  w-full">
          {/* Heading */}
          <div className="w-full">
            <h1 className="font-poppins text-[#E3EEFF] font-[500] md:leading-[3.8rem] text-3xl sm:text-4xl line-clamp-2 md:text-5xl 2xl:text-5xl 2xl:leading-[3.8rem]">
              Reliable <span className="AmericanSign">Solutions</span> for all
              your home repair and maintenance needs.
            </h1>
          </div>

          {/* Description */}
          <div className="w-full h-[5rem] xl:h-[7rem]  border-linecss rounded-l-2xl linear-color md:p-4 p-2  overflow-hidden">
            <div>
              <p className="text-[#E7E7E7] font-poppins text-[16px] text-wrap md:line-clamp-2 xl:line-clamp-3 ">
                Skilled hands available for all your home improvement projects.
                Skilled hands available for all your home improvement projects.
                Skilled hands available for all your home improvement
                projects.Skilled hands available for all your home improvement
                projects. Skilled hands available for all your home improvement
                projects.Skilled hands available for all your home improvement
                projects.
              </p>
            </div>
          </div>

          <div className="mt-3">
            <button
              type="button"
              className="px-4 py-3 bg-white rounded-lg w-fit font-poppins text-[#0046AE] font-[500] flex justify-center items-center hover:bg-slate-200"
            >
              Explore More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHeroSection;
