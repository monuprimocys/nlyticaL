"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../public/assets/Image/crossicon.png";
import "../../businesscss.css";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import { useEffect } from "react";
import { useGetAllCompain } from "@/app/storeApp/api/useGetAllCompain";

function SponcerModalAfterAdd() {
  const modalOpen = useAppSelector(
    (state) => state.modals.SponcerModalAfterAdd
  );
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  // Form state for business address

  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (vendor_id && service_id) {
      const fetchData = async () => {
        try {
          const response = await updateService({
            vendor_id,
            service_id,
          }).unwrap();
        } catch (err) {
          console.error("API Error:", err);
        }
      };

      fetchData();
    }
  }, [vendor_id, service_id, updateService]);

  // Handle modal close (dispatch action to hide modal)
  const close = () => dispatch(hideModal("SponcerModalAfterAdd"));
  const image = data?.service_images?.[0]?.service_images || "";

  console.log("   my service image    from  ", image);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const { data: listcompain } = useGetAllCompain();

  console.log(
    "my service image!!!",
    listcompain?.campaignData[0].goals[0].start_date
  );

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]  ${
              isDarkMode ? " bg-[#212121] text-white" : "bg-white  text-black"
            }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg  ${
                isDarkMode ? " bg-[#FFFFFF0A]" : " modalbordercolor"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                Campaign
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8  ${isDarkMode ? " invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            <div className=" mx-auto   w-[90%]  rounded-xl flex  flex-col gap-6  pt-6">
              {/*   store image  */}
              <div className=" w-full flex   flex-col gap-6 justify-center  items-center ">
                <h4 className=" font-poppins  text-lg font-medium  ">
                  {data?.service.service_name}
                </h4>
                {/*  add image bg  */}
                <div
                  className=" bg-cover bg-center  bg-no-repeat"
                  style={{
                    backgroundImage: `url(${image})`,
                    borderRadius: "20px",
                    width: "80%",
                    height: "220px",
                  }}
                ></div>
              </div>

              {/*  Campaign Name */}

              <h4 className=" w-full flex justify-center items-center  font-poppins  text-sm  font-medium">
                {listcompain?.campaignData[0].campaign_name}
              </h4>

              {/*  detail */}
              <div className=" w-full flex flex-col gap-4 h-auto   rounded-xl  p-6  bg-[#0046AE0F] ">
                <div className=" w-full flex gap-4  justify-between items-center ">
                  <h4
                    className={`   font-poppins  text-sm  font-normal  ${
                      isDarkMode ? " text-white" : "text-black"
                    }`}
                  >
                    Locations
                  </h4>
                  <h4 className=" font-poppins text-[#0046AE] line-clamp-1 text-sm  font-normal  ">
                    {listcompain?.campaignData[0].address}
                  </h4>
                </div>
                <div className=" w-full flex  justify-between items-center ">
                  <h4
                    className={`   font-poppins  text-sm  font-normal  ${
                      isDarkMode ? " text-white" : "text-black"
                    }`}
                  >
                    Area
                  </h4>
                  <h4 className=" font-poppins text-[#8E8E8E]  text-sm  font-normal  ">
                    {listcompain?.campaignData[0].area_distance} kms
                  </h4>
                </div>
                <div className=" w-full flex  justify-between items-center ">
                  <h4
                    className={`   font-poppins  text-sm  font-normal  ${
                      isDarkMode ? " text-white" : "text-black"
                    }`}
                  >
                    Total Days
                  </h4>
                  <h4 className=" font-poppins text-[#8E8E8E]  text-sm  font-normal  ">
                    {listcompain?.campaignData[0].goals[0].days}
                  </h4>
                </div>

                <div className=" w-full flex  justify-between items-center ">
                  <h4
                    className={`   font-poppins  text-sm  font-normal  ${
                      isDarkMode ? " text-white" : "text-black"
                    }`}
                  >
                    Start Date / End Date
                  </h4>
                  <h4 className=" font-poppins text-[#8E8E8E]  text-sm  font-normal  ">
                    {listcompain?.campaignData[0].goals[0].start_date} to{" "}
                    {listcompain?.campaignData[0].goals[0].end_date}
                  </h4>
                </div>
              </div>
              <div
                className={`mx-auto w-full rounded-lg  flex flex-col   ${
                  isDarkMode ? "bg-[#212121] text-[#ffffff]" : " bg-white "
                } `}
              >
                <div className=" w-full bordercolordailybudget rounded-xl p-4">
                  <div className=" w-full flex   justify-start items-center">
                    <h3 className=" text-lg font-medium font-poppins ">
                      Price Details
                    </h3>
                  </div>

                  <div className=" w-full flex gap-4 pt-4 flex-col">
                    <div className=" w-full flex justify-between items-center ">
                      <div
                        className={`   font-poppins text-sm  ${
                          isDarkMode ? " text-white" : "text-black"
                        }`}
                      >
                        Selected Ad Days
                      </div>
                      <div
                        className={`   font-poppins text-sm  ${
                          isDarkMode ? " text-white" : "text-black"
                        }`}
                      >
                        {listcompain?.campaignData[0].goals[0].days}
                      </div>
                    </div>
                    <div className=" w-full flex justify-between items-center ">
                      <div
                        className={`   font-poppins text-sm  ${
                          isDarkMode ? " text-white" : "text-black"
                        }`}
                      >
                        Price
                      </div>
                      <div
                        className={`   font-poppins text-sm  ${
                          isDarkMode ? " text-white" : "text-black"
                        }`}
                      >
                        {listcompain?.campaignData[0].goals[0].price}
                      </div>
                    </div>
                    <div className=" w-full flex justify-between items-center ">
                      <div
                        className={`   font-poppins text-sm  ${
                          isDarkMode ? " text-white" : "text-black"
                        }`}
                      >
                        Tax/GST
                      </div>
                      <div
                        className={`   font-poppins text-sm  ${
                          isDarkMode ? " text-white" : "text-black"
                        }`}
                      >
                        $20
                      </div>
                    </div>

                    <div className=" w-full flex justify-between items-center ">
                      <div
                        className={`   font-poppins text-sm  ${
                          isDarkMode ? " text-white" : "text-black"
                        }`}
                      >
                        Platform Charges
                      </div>
                      <div
                        className={`   font-poppins text-sm  ${
                          isDarkMode ? " text-white" : "text-black"
                        }`}
                      >
                        $2
                      </div>
                    </div>
                    <hr />
                    <div className=" w-full flex justify-between items-center ">
                      <div
                        className={` text-black   font-poppins text-[16px]  font-medium  ${
                          isDarkMode ? " text-white" : "text-black"
                        }`}
                      >
                        Total Amount
                      </div>
                      <div
                        className={` text-black   font-poppins text-[16px]  font-medium  ${
                          isDarkMode ? " text-white" : "text-black"
                        }`}
                      >
                        {listcompain?.campaignData[0].goals[0].price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default SponcerModalAfterAdd;
