import React from "react";
import { useAppSelector } from "@/app/hooks/hooks";

function AudienceDetails() {
  const distanceValue = useAppSelector((state) => state.distance.distance);
  const { address } = useAppSelector((state) => state.sponsorLocation);

  return (
    <div className="w-full flex flex-col gap-6 pt-6">
      <h4 className="font-poppins text-black text-lg font-medium">
        Audience Details
      </h4>

      <div
        className="w-full rounded-xl gap-3 flex justify-between items-center py-4 px-6 bg-white shadow-lg"
        id="Audiancedetail"
      >
        <h4 className="font-poppins text-black text-lg font-medium">
          Locations
        </h4>
        <h3 className="text-[#7B7B7B] text-sm line-clamp-1 font-poppins">
          {address || "No location provided"}
        </h3>
      </div>

      <div
        className="w-full rounded-xl flex justify-between items-center py-4 px-6 bg-white shadow-lg"
        id="Audiancedetail"
      >
        <h4 className="font-poppins text-black text-lg font-medium">Area</h4>
        <h3 className="text-[#7B7B7B] text-sm font-poppins">
          {distanceValue ? `${distanceValue} kms` : "Distance not provided"}
        </h3>
      </div>
    </div>
  );
}

export default AudienceDetails;
