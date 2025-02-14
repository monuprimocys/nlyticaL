import { useAppSelector } from "@/app/hooks/hooks";
import { TextField } from "@mui/material";
import React from "react";

function CompaineName() {
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full relative  gap-2 flex flex-col ">
      {/*  lable add */}
      <label className=" text-sm font-medium font-poppins   text-black">
        Campaign Name{" "}
        <span className=" text-[#FF0000] font-poppins    ">*</span>
      </label>
      <TextField
        fullWidth
        variant="outlined"
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
