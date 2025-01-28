import { useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/store/Slice/AddPostSlice";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material"; // Import Material UI TextField

interface BusinessNameProps {
  required?: boolean;
}

const BusinessName: React.FC<BusinessNameProps> = ({ required }) => {
  const dispatch = useDispatch();
  const serviceName = useAppSelector((state) => state.AddPost.service_name);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddPostData({ service_name: e.target.value }));
  };

  return (
    <div className="">
      <label
        className="text-sm font-medium text-[#000000]"
        htmlFor="service_name"
      >
        Business Name
        <span className=" text-[#F21818] pl-[1px]">*</span>
      </label>
      <div className="relative mt-2">
        <TextField
          id="service_name"
          name="service_name"
          placeholder="Business Name"
          className="border-solid border-2 border-[#EFEFEF] rounded-md focus:outline-none focus:border-[#888888] focus:ring-2 focus:ring-[#888888] focus:ring-offset-2 focus:ring-offset-[#555555] focus:shadow-sm"
          fullWidth
          value={serviceName || ""}
          onChange={handleChange}
          required={required}
        />
      </div>
    </div>
  );
};

export default BusinessName;
