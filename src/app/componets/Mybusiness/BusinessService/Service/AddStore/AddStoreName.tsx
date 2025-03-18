import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { setStoreName } from "@/app/storeApp/Slice/AddStore";
import { useAppSelector } from "@/app/hooks/hooks";

interface BusinessNameProps {
  required?: boolean;
}

const AddStoreName: React.FC<BusinessNameProps> = ({ required }) => {
  const dispatch = useDispatch();

  const handleStoreNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setStoreName(event.target.value)); // Dispatch action to set store name
  };

  const storename = useAppSelector((state) => state.AddStore);

  console.log(" my reponcefjfkhnsdkfhsdkfl;hsdf0", storename.currentStoreName);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full">
      <label
        className={`font-poppins text-sm font-medium   ${
          isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
        }`}
        htmlFor="store_name"
      >
        Service Name
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2">
        <TextField
          id="store_name"
          name="store_name"
          placeholder="store_name"
          className={`border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm`}
          sx={{
            backgroundColor: isDarkMode ? "#FFFFFF0A" : "#ffffff",
            color: isDarkMode ? "#ffffff" : "#000000",
          }}
          fullWidth
          required={required}
          onChange={handleStoreNameChange} // Handle the input change
        />
      </div>
    </div>
  );
};

export default AddStoreName;
