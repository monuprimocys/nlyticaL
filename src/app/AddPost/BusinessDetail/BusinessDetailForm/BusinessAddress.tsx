import { useAppSelector } from "@/app/hooks/hooks";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { TextField, InputAdornment, IconButton } from "@mui/material"; // Import Material UI components

interface BusinessAddressProps {
  required?: boolean;
}

const BusinessAddress: React.FC<BusinessAddressProps> = ({ required }) => {
  const dispatch = useDispatch();

  const address = useAppSelector((state) => state.address);

  const addpostaddress = useAppSelector((state) => state.AddPost.country);

  console.log(" my  address values@!@!@@  ", addpostaddress);

  // Join the address components
  const joinAddress =
    ` ${address.area}  ${address.cityName} ${address.house} ${address.landmark}`.trim();

  // Handle address update
  const handleAddressClick = () => {
    dispatch(showModal("CompleteAddressModal"));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="">
      <label
        className={`text-sm font-medium ${
          isDarkMode ? "text-white" : "text-black"
        }`}
        htmlFor="address"
      >
        Business Address 
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2 flex items-center">
        <TextField
          id="address"
          name="address"
          placeholder="Enter your address"
          variant="outlined"
          className={`!border-[1px] ${
            isDarkMode ? "border-[#656565]" : "border-[#6565657a]"
          } ${isDarkMode ? "bg-[#333333] text-white" : "bg-white text-black"}`} // Conditional background and text color for TextField
          fullWidth
          value={joinAddress || ""}
          onClick={handleAddressClick}
          required={required}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleAddressClick}
                  edge="end"
                  style={{
                    backgroundColor: isDarkMode ? "#444444" : "#B4B4B414", // Darker button for dark mode
                    borderRadius: "50%",
                    padding: "8px",
                  }}
                >
                  <CiEdit
                    className={isDarkMode ? "text-white" : "text-[#b4b4b4]"} // Icon color based on the mode
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default BusinessAddress;
