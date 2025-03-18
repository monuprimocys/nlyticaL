import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { updateStoreDescription } from "@/app/storeApp/Slice/UpdateStoreSlice";
import { TextField } from "@mui/material";
import React from "react";

function UpdateStoreDescription() {
  const dispatch = useAppDispatch();

  const UpdatestorDescription = useAppSelector(
    (state) => state.UpdateStore.store?.store_description
  );

  console.log("my UpdatestorDescription", UpdatestorDescription);

  const handleStoreDescitptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const UpdatestorDescription = event.target.value;
    dispatch(updateStoreDescription(UpdatestorDescription)); // Dispatch action to update store name in redux
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="h-fit w-full">
      <label
        className={`font-poppins text-sm font-medium   ${
          isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
        }`}
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
          className={`!border-[#6565657a] border-[1px]     ${
            isDarkMode
              ? "bg-[#FFFFFF0A] text-[#FFFFFF]"
              : "bg-[#ffffff] text-[#000000]"
          }`}
          variant="outlined"
          value={UpdatestorDescription}
          onChange={handleStoreDescitptionChange}
          fullWidth
          multiline
          rows={3}
        />
      </div>
    </div>
  );
}

export default UpdateStoreDescription;
