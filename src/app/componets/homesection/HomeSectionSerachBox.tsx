" use client";

import location from "../../../../public/assets/Image/locationicon.png";
import searchnormalicon from "../../../../public/assets/Image/search-normal.png";
import Image from "next/image";

function HomeSectionSerachBox() {
  return (
    <div className="relative h-auto w-full">
      <div className="relative top-[-3rem] mx-auto h-fit w-[90%] rounded-xl bg-white p-4 shadow md:top-[-1rem] md:w-[85%] lg:top-[-2.5rem] xl:top-[-4rem] xl:p-6 2xl:w-[60%] 2xl:p-10">
        <div className="mx-auto flex w-[95%] flex-col items-start justify-start gap-6">
          {/* serach  description */}
          <div>
            <h3 className="font-poppins text-lg font-medium text-[#0046AE] xl:text-2xl">
              Search your services
            </h3>
          </div>

          {/* form for filttering data  */}
          <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row">
            {/* location dropdwon */}
            <div className="relative w-full lg:w-[40%] 2xl:w-[25%]">
              <label
                className="font-poppins text-sm font-semibold text-[#000000]"
                htmlFor="name"
              >
                Location
              </label>
              <div className="relative mt-2 flex items-center">
                <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full">
                  <Image
                    src={location}
                    alt="Full Name Icon"
                    className="h-[1.5rem] w-[1.5rem] object-cover"
                  />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border-1 font-poppins w-full rounded-lg border border-[#0046AE80] bg-white py-3 pl-14 text-[#000000] placeholder-gray-500 focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80]"
                  placeholder="Mumbai"
                  required
                />
              </div>
            </div>
            {/* input box for serach */}
            <div className="relative w-full">
              <label
                className="font-poppins text-sm font-semibold text-[#000000]"
                htmlFor="name"
              >
                Search Services
              </label>
              <div className="relative mt-2 flex items-center">
                <span className="absolute left-1 flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full">
                  <Image
                    src={searchnormalicon}
                    alt="Full Name Icon"
                    className="h-[1.5rem] w-[1.5rem] fill-red-700 object-cover"
                  />
                </span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="font-poppins w-full rounded-lg border border-[#0046AE80] bg-white py-3 pl-14 text-[#000000] placeholder-gray-500 focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80]"
                  placeholder="Search...."
                  required
                />
              </div>
            </div>

            {/* serach icon */}
            <div className="relative flex w-fit items-center justify-center md:mt-7">
              <div className="flex h-[3.2rem] w-[7.2rem] cursor-pointer items-center justify-center rounded-xl bg-[#0046AE]">
                <button
                  type="submit"
                  className="font-poppins px-4 py-2 text-sm font-medium text-white"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSectionSerachBox;
