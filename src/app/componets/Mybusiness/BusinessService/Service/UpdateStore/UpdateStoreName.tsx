import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { updateStoreName } from "@/app/store/Slice/UpdateStoreSlice";
import { TextField } from "@mui/material";

const UpdateStoreName: React.FC = () => {
  const dispatch = useAppDispatch();
  const Updatestorename = useAppSelector(
    (state) => state.UpdateStore.store?.store_name
  );

  console.log(" my store_name ", Updatestorename);

  const handleStoreNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedStoreName = event.target.value;
    dispatch(updateStoreName(updatedStoreName)); // Dispatch action to update store name in redux
  };

  return (
    <div className="w-full">
      <label
        className="text-sm font-medium text-[#000000]"
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
          value={Updatestorename || ""}
          onChange={handleStoreNameChange} // Attach change handler
          className="border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm"
          fullWidth
        />
      </div>
    </div>
  );
};

export default UpdateStoreName;
