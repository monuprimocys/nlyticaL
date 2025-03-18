import React from "react";
import VenderDetail from "./ServiceDetailRightSideComponets/VenderDetail";
import VenderDetailInformation from "./ServiceDetailRightSideComponets/VenderDetailInformation";
import GooglemapDetailScreen from "./ServiceDetailRightSideComponets/GooglemapDetailScreen";
import Websiteurl from "./ServiceDetailRightSideComponets/Websiteurl";
import SocilMediicon from "./ServiceDetailRightSideComponets/SocilMediicon";
import BusinessHoursDetail from "./ServiceDetailRightSideComponets/BusinessHoursDetail";
import VideoSectionDetsilScrenn from "./ServiceDetailRightSideComponets/VideoSectionDetsilScrenn";

function ServiceDetalScreenrightside() {
  return (
    <div className=" w-full flex flex-col gap-6">
      <VenderDetail />
      <VenderDetailInformation />
      <GooglemapDetailScreen />
      <Websiteurl />
      <VideoSectionDetsilScrenn />
      <SocilMediicon />
      <BusinessHoursDetail />
    </div>
  );
}

export default ServiceDetalScreenrightside;
