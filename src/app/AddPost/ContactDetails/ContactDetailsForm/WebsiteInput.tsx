import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";

function WebsiteInput() {
  const dispatch = useDispatch();
  const serviceWebsite = useAppSelector(
    (state) => state.AddPost.service_website
  );

  // Handle input change
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddPostData({ service_website: e.target.value }));
  };

  return (
    <div className="">
      <label
        className="text-sm font-medium text-[#000000]"
        htmlFor="service_website"
      >
        Website
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          id="service_website"
          name="service_website"
          value={serviceWebsite || ""} // Sync input with Redux state
          onChange={handleWebsiteChange}
          className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
          placeholder="Website"
        />
      </div>
    </div>
  );
}

export default WebsiteInput;
