import { useAppSelector } from "@/app/hooks/hooks";
import { setStoreDescription } from "@/app/store/Slice/AddStore";
import { TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

function AddStoreDescrition() {
  const dispatch = useDispatch();

  const handleStoreNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setStoreDescription(event.target.value)); // Dispatch action to set store name
  };

  return (
    <div className="h-fit w-full">
      <label
        className="font-poppins text-sm font-medium text-[#000000]"
        htmlFor="store_description"
      >
        Business Description
        <span className=" text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2">
        <TextField
          id="store_description"
          name="store_description"
          placeholder="Enter store_description"
          className="!border-[#6565657a] border-[1px]    "
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          onChange={handleStoreNameChange} // Handle the input change
        />
      </div>
    </div>
  );
}

export default AddStoreDescrition;
