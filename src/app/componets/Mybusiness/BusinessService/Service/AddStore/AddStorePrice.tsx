import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { useAppSelector } from "@/app/hooks/hooks";
import { setStorePrice } from "@/app/storeApp/Slice/AddStore";
import toast from "react-hot-toast";

interface BusinessNameProps {
  required?: boolean;
}

const AddStorePrice: React.FC<BusinessNameProps> = ({ required }) => {
  const dispatch = useDispatch();

  const handleStoreNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    // Check if the input value is a valid number
    if (value !== "" && isNaN(value)) {
      // If it's not a valid number, show an alert
      toast.error("Please enter a only number.");
    } else {
      // If it's a valid number, dispatch the action
      dispatch(setStorePrice(value));
    }
  };

  const storename = useAppSelector((state) => state.AddStore);

  console.log("Current store price:", storename.currentStorePrice);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full">
      <label
        className={`font-poppins text-sm font-medium   ${
          isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
        }`}
        htmlFor="price"
      >
        Price
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2">
        <TextField
          id="price"
          name="price"
          placeholder="Add price"
          className={`border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm  ${
            isDarkMode
              ? "bg-[#212121] text-[#FFFFFF]"
              : "bg-[#FFFFFF] text-[#000000]"
          }`}
          fullWidth
          required={required}
          onChange={handleStoreNameChange} // Handle the input change
        />
      </div>
    </div>
  );
};

export default AddStorePrice;
