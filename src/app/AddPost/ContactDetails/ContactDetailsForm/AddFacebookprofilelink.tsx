"use client";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
const AddFacebookprofilelink: React.FC = () => {
  const dispatch = useDispatch();
  const facebook_link = useAppSelector(
    (state) => state.AddPost.facebook_link
  );

  // Handle input change
  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateAddPostData({ facebook_link: e.target.value }));
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          id="facebook_link"
          name="facebook_link"
          className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
          placeholder="Add Facebook profile link"
          value={facebook_link || ""} // Sync input with Redux state
          onChange={handleWebsiteChange}
        />
      </div>
    </div>
  );
};

export default AddFacebookprofilelink;
