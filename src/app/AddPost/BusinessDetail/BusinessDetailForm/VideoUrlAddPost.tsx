import { useAppSelector } from "@/app/hooks/hooks";
import { TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";

function VideoUrlAddPost() {
  const dispatch = useDispatch();
  const video_url = useAppSelector((state) => state.AddPost.video_url);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  const handleVideoUrlChange = (event) => {
    dispatch(updateAddPostData({ video_url: event.target.value }));
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-1">
        <label
          className={`font-poppins text-sm pb-1 font-medium ${
            isDarkMode ? "text-[#FFFFFF]" : "text-[#000000]"
          }`}
        >
          Enter Video URL
        
        </label>

        <TextField
          id="video-url"
          name="video-url"
          placeholder="Enter your video URL"
          fullWidth
          value={video_url} // Bind the value to video_url from the Redux store
          onChange={handleVideoUrlChange} // Handle changes
          InputProps={{
            className: `font-poppins rounded-md ${
              isDarkMode
                ? "text-white bg-[#373737] border-2 border-white"
                : "text-black bg-white"
            }`,
          }}
        />
      </div>
    </div>
  );
}

export default VideoUrlAddPost;
