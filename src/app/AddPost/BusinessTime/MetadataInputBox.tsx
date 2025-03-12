import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";

function MetadataInputBox() {
  const dispatch = useDispatch();
  const meta_title = useAppSelector((state) => state.AddPost.meta_title);

  // Handle input change
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateAddPostData({ meta_title: e.target.value }));
  };

  return (
    <div className="w-full">
      <label
        className="text-sm font-medium text-[#000000]"
        htmlFor="service_website"
      >
       Meta Title
      </label>
      <div className="relative mt-2 flex items-center">
        <textarea
          rows={2}
          value={meta_title || ""} // Sync input with Redux state
          onChange={handleWebsiteChange}
          className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
          placeholder="Enter your meta title"
        />
      </div>
    </div>
  );
}

export default MetadataInputBox;
