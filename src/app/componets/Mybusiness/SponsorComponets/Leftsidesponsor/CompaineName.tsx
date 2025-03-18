import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { setCampaignName } from "@/app/storeApp/Slice/campaignSlice";
import { TextField } from "@mui/material";
import React from "react";

function CompaineName() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  const campaignName = useAppSelector((state) => state.campaign.campaignName);

  // Handle input change
  const handleInputChange = (event) => {
    dispatch(setCampaignName(event.target.value)); // Dispatch action to update store
  };

  return (
    <div className="w-full relative gap-2 flex flex-col">
      {/* Label */}
      <label className="text-sm font-medium font-poppins text-black">
        Campaign Name <span className="text-[#FF0000] font-poppins">*</span>
      </label>
      <TextField
        fullWidth
        variant="outlined"
        value={campaignName} // Bind input value to Redux state
        onChange={handleInputChange} // Handle input change and update Redux state
        placeholder="Enter campaign title"
        sx={{
          "& .MuiOutlinedInput-root": {
            paddingLeft: "1rem",
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.125rem",
            backgroundColor: isDarkMode ? "#212121" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#000000",
            border: "none",
            borderRadius: "8px",
            borderColor: "#B4B4B4",
            "&:focus-within": {
              borderColor: "#B5843F66",
              boxShadow: "0 0 0 1px #B5843F66",
            },
          },
          "& .MuiInputBase-input": {
            color: isDarkMode ? "#ffffff" : "#000000",
            fontFamily: "Poppins, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default CompaineName;
