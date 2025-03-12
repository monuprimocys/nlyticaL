// src/components/MessageSerchBox.tsx

import React from "react";
import Image from "next/image";
import { TextField, InputAdornment } from "@mui/material";
import search from "../../../../../public/assets/Image/search-normal.png";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/app/storeApp/Slice/Listing/searchSlice";
import { useAppSelector } from "@/app/hooks/hooks";

const MessageSerchBox = () => {
  const dispatch = useDispatch();

  // Access the search query from Redux store
  const searchQuery = useSelector(
    (state: { search: { query: string } }) => state.search.query
  );

  // Handle the change in input field and dispatch the action to update the Redux state
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  console.log(" updating search", searchQuery);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full relative  ">
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search User"
        value={searchQuery} // Bind the input value to Redux state
        onChange={handleInputChange} // Handle the change in the input field
        className=" "
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div className="bg-transparent w-[2rem] h-[2rem] rounded-full flex items-center justify-center">
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
            fontFamily: "Poppins, sans-serif",
            fontSize: "1.125rem",
            backgroundColor: isDarkMode ? "#212121" : "#00000008",
            color: isDarkMode ? "#ffffff" : "#000000",
            border: "none",
            borderRadius: "15px",
            borderColor: isDarkMode ? "!#FFFFFFF" : "#000000",

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
};

export default MessageSerchBox;
