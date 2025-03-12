import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { updateStorePrice } from "@/app/storeApp/Slice/UpdateStoreSlice";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";

interface BusinessNameProps {
  required?: boolean;
}

const UpdateStorePrice: React.FC<BusinessNameProps> = ({ required }) => {
  const dispatch = useAppDispatch();

  const UpdatestorPrice = useAppSelector(
    (state) => state.UpdateStore.store?.price
  );
  const handleStorPriceChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const UpdatestorPrice = event.target.value;

    // Check if the input value is a valid number
    if (UpdatestorPrice !== "" && isNaN(Number(UpdatestorPrice))) {
      // If it's not a valid number, show an alert
      toast.error("Please enter a only number.");
    } else {
      // If it's a valid number, dispatch the action
      dispatch(updateStorePrice(UpdatestorPrice)); // Dispatch action to update store name in redux
    }
  };

  console.log(" my update store price", UpdatestorPrice);

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
              ? "bg-[#FFFFFF0A] text-[#FFFFFF]"
              : "bg-[#FFFFFF] text-[#000000]"
          }`}
          fullWidth
          required={required}
          onChange={handleStorPriceChange}
          value={UpdatestorPrice}
        />
      </div>
    </div>
  );
};

export default UpdateStorePrice;
