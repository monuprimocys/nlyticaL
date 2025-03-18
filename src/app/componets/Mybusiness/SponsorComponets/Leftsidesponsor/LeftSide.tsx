import { useAppSelector } from "@/app/hooks/hooks";
import React, { useState, useEffect } from "react";
import "./Sponsorleftside.css";
import { MdExpandLess } from "react-icons/md";
import CompaineName from "./CompaineName";
import GoogleMapInputBoxSponser from "./GoogleMapInputBoxSponser";
import AudienceDetails from "./AudienceDetails";
import NewCampaign from "./NewCampaign";
import Cookies from "js-cookie";
import {
  addServiceImage,
  updateServiceField,
} from "@/app/storeApp/Slice/serviceSlice";
import { useDispatch } from "react-redux";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";

function LeftSide() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const sponcer_id = Cookies.get("sponcer_id");

  const [isFormVisible, setFormVisible] = useState(true);

  // Handle button click to toggle the form visibility, but only if no sponcer_id exists
  const handleAddCampaignClick = () => {
    setFormVisible(!isFormVisible);
  };

  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Trigger the mutation if vendor_id and service_id are present
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  // Handle the different states of the API call
  useEffect(() => {
    if (isLoading) {
      console.log("Loading...");
    }

    if (error) {
      console.error("Error fetching service:", error);
    }

    if (data) {
      console.log("API Response:@@!!", data);

      dispatch(updateServiceField(data.service));
      dispatch(addServiceImage(data.service_images));
    }
  }, [data, isLoading, error]);

  return (
    <div
      className={`w-full rounded-lg flex flex-col gap-6 ${
        isDarkMode ? "bg-[#212121] text-[#ffffff]" : "bg-white"
      }`}
    >
      {sponcer_id === "1" && (
        <div className="w-full flex flex-col gap-6">
          <NewCampaign />
          <div className="w-full px-5 justify-center items-center flex gap-3">
            <div className="w-[45%] h-[3px] bg-[#0046AE]"></div>
            <div className="w-[10%] flex justify-center font-medium items-center text-[#0046AE] font-poppins">
              OR
            </div>
            <div className="w-[45%] h-[3px] bg-[#0046AE]"></div>
          </div>
        </div>
      )}

      <div className="w-full businesslable rounded-lg">
        {/* Button */}
        <div
          className="w-full leftsidesponsor rounded-t-lg cursor-pointer bg-[#0046ae0a] flex justify-between p-4"
          onClick={handleAddCampaignClick}
        >
          <p className="font-poppins text-lg font-normal">Add New Campaign</p>
          <MdExpandLess
            className={`text-3xl  ${isFormVisible ? " rotate-180" : ""}`}
          />
        </div>

        {/* When clicked on the button, show this section */}
        {isFormVisible && (
          <div className="w-full flex flex-col gap-4 h-auto py-4 px-6">
            <CompaineName />
            <GoogleMapInputBoxSponser />
            <AudienceDetails />
          </div>
        )}
      </div>
    </div>
  );
}

export default LeftSide;
