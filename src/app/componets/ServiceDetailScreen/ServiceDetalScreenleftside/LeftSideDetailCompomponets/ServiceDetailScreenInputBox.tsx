import React from "react";
import Image from "next/image";
import { TextField, InputAdornment } from "@mui/material";
import search from "../../../../../../public/assets/Image/search-normal.png";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/app/storeApp/Slice/ServiceDetail/serviceDetailScreenInputSlice";
import { useAppSelector } from "@/app/hooks/hooks";

const ServiceDetailScreenInputBox: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useAppSelector(
    (state) => state.serviceDetailScreenInput.searchQuery
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  console.log(" my service name is 12121212121 ", searchQuery);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full relative">
      <TextField
        fullWidth
        variant="outlined"
        value={searchQuery} // Bind the value to Redux state
        onChange={handleChange} // Update Redux state on change
        placeholder="Listing Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div className="bg-transparent w-[2.5rem] h-[2.5rem] rounded-full flex items-center justify-center">
                <Image
                  src={search}
                  alt="Search Icon"
                  className="h-[1rem] w-[1rem] object-cover"
                />
              </div>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            paddingLeft: "1rem",
            backgroundColor: isDarkMode ? " #FFFFFF0A" : "",

            borderRadius: "8px",
            borderColor: "#B4B4B4",
            "&:focus-within": {
              borderColor: "#B5843F66",
              boxShadow: "0 0 0 1px #B5843F66",
            },
          },
          "& .MuiInputBase-input": {
            color: "#000000",
            fontFamily: "Poppins, sans-serif",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: isDarkMode ? "#333333" : "#B4B4B4",
          },
          "& .MuiOutlinedInput-root:hover": {
            borderColor: isDarkMode ? "#333333" : "#B5843F",
          },
        }}
      />
    </div>
  );
};

export default ServiceDetailScreenInputBox;
