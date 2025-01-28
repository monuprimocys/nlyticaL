import { useAppSelector } from "@/app/hooks/hooks";
import { showModal } from "@/app/store/Slice/modalSlice";
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

  // Join the address components
  const joinAddress =
    `${address.house} ${address.area} ${address.landmark}`.trim();

  // Handle address update
  const handleAddressClick = () => {
    dispatch(showModal("CompleteAddressModal"));
  };

  return (
    <div className="">
      <label className="text-sm font-medium text-[#000000]" htmlFor="address">
        Business Address
        <span className=" text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2 flex items-center">
        <TextField
          id="address"
          name="address"
          placeholder="Enter your address"
          variant="outlined"
          className="!border-[#6565657a] border-[1px] "
          
          
          fullWidth
          value={joinAddress || ""}
          onClick={handleAddressClick}
          required={required}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" >
                <IconButton
                  onClick={handleAddressClick}
                  edge="end"
                  style={{
                    backgroundColor: "#B4B4B414",
                    borderRadius: "50%",
                    padding: "8px",
                  }}
                >
                  <CiEdit className="text-[#b4b4b4]" />
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
