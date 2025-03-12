import { useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material"; // Import Material UI TextField

interface BusinessDescriptionProps {
  required?: boolean;
}

const BusinessDescription: React.FC<BusinessDescriptionProps> = ({
  required,
}) => {
  const dispatch = useDispatch();
  const serviceDescription = useAppSelector(
    (state) => state.AddPost.service_description
  );

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(updateAddPostData({ service_description: e.target.value }));
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="h-fit">
      <label
        className={`text-sm font-medium   ${
          isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
        }`}
        htmlFor="service_description"
      >
        Business Description
        <span className=" text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2">
        <TextField
          id="service_description"
          name="service_description"
          placeholder="Enter Business Description"
          className={`border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm  ${
            isDarkMode ? "bg-[#FFFFFF0A]" : "text-[#000000]"
          }`}
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={serviceDescription || ""}
          onChange={handleChange}
          required={required}
        />
      </div>
    </div>
  );
};

export default BusinessDescription;
