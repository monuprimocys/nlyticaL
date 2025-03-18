import React, { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import CampaignList from "./CampaignList";

function NewCampaign() {
  // State to manage the visibility of CampaignList
  const [isOpen, setIsOpen] = useState(true);

  // Toggle function to show/hide CampaignList
  const toggleCampaignList = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="w-full businesslable rounded-lg h-auto p-4 flex gap-6 flex-col">
      <div
        className="w-full border-b-2 py-3 border-b-[#ECECEC3D] rounded-t-lg cursor-pointer flex justify-between"
        onClick={toggleCampaignList} // Toggle visibility on click
      >
        <p className="font-poppins text-lg font-normal">Campaign</p>
        {isOpen ? (
          <MdExpandLess className="text-3xl" />
        ) : (
          <MdExpandMore className="text-3xl" />
        )}
      </div>

      {/* Only render CampaignList if isOpen is true */}
      {isOpen && <CampaignList />}
    </div>
  );
}

export default NewCampaign;
