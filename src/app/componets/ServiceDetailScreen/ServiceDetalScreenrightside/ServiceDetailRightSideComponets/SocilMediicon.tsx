"use client";

import React from "react";
import fbicon from "../../../../../../public/assets/Image/facebook.png";
import Image from "next/image";
import insta from "../../../../../../public/assets/Image/instafotter.png";
import twitter from "../../../../../../public/assets/Image/twitter.png";
import whatshop from "../../../../../../public/assets/Image/whatshop.png";
import { useAppSelector } from "@/app/hooks/hooks";

function SocilMediicon() {
  const ServiceDetailData = useAppSelector(
    (state) => state.serviceDetail.serviceDetail
  );

  console.log("serviceDetailData #12121121", ServiceDetailData);

  return (
    <div className="p-4 rounded-lg photoservicedetailborderandshado bg-white">
      {/* Heading */}
      <div className="text-lg font-medium font-poppins text-[#3E5155] mb-4">
        Follow Us On
      </div>
      <div className="w-full flex gap-3 flex-wrap">
        {/* Facebook Link */}
        {ServiceDetailData?.facebook_link &&
          ServiceDetailData?.facebook_link !== "" && (
            <div className="w-fit flex gap-2 p-2 cursor-pointer rounded-xl scoailmediiconvordercolor">
              <div>
                <Image src={fbicon} alt="Facebook" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[#3E5155] font-medium">Facebook</span>
              </div>
            </div>
          )}

        {/* Instagram Link */}
        {ServiceDetailData?.instagram_link &&
          ServiceDetailData?.instagram_link !== "" && (
            <div className="w-fit flex gap-2 p-2 cursor-pointer rounded-xl scoailmediiconvordercolor">
              <div>
                <Image src={insta} alt="Instagram" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[#3E5155] font-medium">Instagram</span>
              </div>
            </div>
          )}

        {/* Whatshop Link */}
        {ServiceDetailData?.whatsapp_link &&
          ServiceDetailData?.whatsapp_link !== "" && (
            <div className="w-fit flex gap-2 p-2 cursor-pointer rounded-xl scoailmediiconvordercolor">
              <div>
                <Image src={whatshop} alt="Instagram" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[#3E5155] font-medium">Whatsapp</span>
              </div>
            </div>
          )}

        {/* Twitter Link */}
        {ServiceDetailData?.twitter_link &&
          ServiceDetailData?.twitter_link !== "" && (
            <div className="w-fit flex gap-2 p-2 cursor-pointer rounded-xl scoailmediiconvordercolor">
              <div>
                <Image src={twitter} alt="Twitter" className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[#3E5155] font-medium">Twitter</span>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default SocilMediicon;
