"use client";
import React from "react";
import { useDispatch } from "react-redux"; // Import dispatch from Redux
import { useAppSelector } from "@/app/hooks/hooks";
import SubCategoryDropdwon from "./SubCategoryDropdwon";
import MonthYear from "./MonthYear";
import CategoryDropdown from "./CategoryDropdown";
import UploadImageAndVideo from "./UploadImageAndVideo";
import NoofEmployees from "./NoofEmployees";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import BusinessName from "./BusinessName";
import BusinessDescription from "./BusinessDescription";
import BusinessAddress from "./BusinessAddress";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import UploadCoverImage from "./UploadCoverImage";
import dayjs from "dayjs";
import VideoUrlAddPost from "./VideoUrlAddPost";

function BusinessDetailForm() {
  const addPostData = useAppSelector((state) => state.AddPost);

  const storesliceImage = useAppSelector(
    (state) => state.AddPost.service_image
  );

  const user_id = Cookies.get("user_id");
  const address = useAppSelector((state) => state.address);
  const location = useAppSelector((state) => state.location);
  const current_address = useAppSelector((state) => state.currentLocation);

  const category_id = useAppSelector(
    (state) => state.categorySelected.selectedCategory.id
  );
  const subcategory_id = useAppSelector(
    (state) => state.subCategorySelected.selectedSubCategory
  );

  // Filter out any empty IDs and join them into a comma-separated string
  const ids = Array.isArray(subcategory_id)
    ? subcategory_id
        .map((item) => item.id) // Extract the 'id' from each object
        .filter((id) => id !== "") // Filter out any empty strings
        .join(",") // Join the valid IDs into a string
    : "";

  const selectedDate = useAppSelector((state) => state.businessHours);

  const joinAddress =
    `${address.house} ${address.area} ${address.landmark}`.trim();
  const getvalues = useAppSelector((state) => state.monthYear);

  const published_month = getvalues.monthValue
    ? dayjs(getvalues.monthValue).format("MMMM")
    : null;

  const published_year = getvalues.yearValue
    ? dayjs(getvalues.yearValue).format("YYYY")
    : null;

  const postData = {
    address: joinAddress,
    category_id: category_id,
    subcategory_id: Array.isArray(subcategory_id)
      ? subcategory_id
          .map((item) => item.id) // Extract the 'id' from each object
          .filter((id) => id !== "") // Filter out any empty strings
          .join(",") // Join the valid IDs into a string
      : "",
    published_month: published_month,
    published_year: published_year,
    service_description: addPostData.service_description,
    service_email: addPostData.service_email,
    service_image: storesliceImage,
    cover_image: addPostData.cover_image,
    service_name: addPostData.service_name,
    service_phone: addPostData.service_phone,
    service_website: addPostData.service_website,
    facebook_link: addPostData.facebook_link,
    instagram_link: addPostData.instagram_link,
    twitter_link: addPostData.twitter_link,
    whatsapp_link: addPostData.whatsapp_link,
    vendor_id: user_id,
    is_featured: addPostData.is_featured,
    lat: location.lat || current_address.latitude,
    lon: location.lng || current_address.longitude,
    open_days: selectedDate.selectedDays.join(","),
    open_time: selectedDate.startTime,
    close_time: selectedDate.endTime,
    closed_days: selectedDate.unselectedDays.join(","),
    employee_strength: addPostData.employee_strength,
    video: "",
    video_thumbnail: "",
  };

  console.log(" my add post data from slice values ", addPostData);

  // Validation function
  const validateFields = () => {
    // Check if required fields are empty and show the appropriate toast messages
    if (!addPostData.service_name) {
      toast.error("Service name is required");
      return false;
    }

    if (!addPostData.cover_image) {
      toast.error("Cover image is required");
      return false;
    }

    if (!storesliceImage || storesliceImage.length === 0) {
      toast.error("Service image is required");
      return false;
    }

    if (!addPostData.service_description) {
      toast.error("Service description is required");
      return false;
    }
    

    if (!category_id) {
      toast.error("Please select a category");
      return false;
    }

    // if (!ids) {
    //   toast.error("Please select a sub-category");
    //   return false;
    // }

    if (!published_month) {
      toast.error("Please select a published_month");
      return false;
    }

    // if (!addPostData.employee_strength) {
    //   toast.error("Please select employee ");
    //   return false;
    // }
    // if (!addPostData.video_url) {
    //   toast.error("Please select video_url ");
    //   return false;
    // }

    return true;
  };

  const dispatch = useDispatch(); // Initialize dispatch
  const AddPostData = useAppSelector((state) => state.AddPost);

  const handleNextStep = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Validate before submitting
    const isValid = validateFields();
    if (!isValid) return; // If validation fails, stop form submission

    // Dispatch to update the current step
    dispatch(
      updateAddPostData({
        add_new_post_steps: ((AddPostData.add_new_post_steps || 1) + 1) as
          | 1
          | 2
          | 3,
      })
    );
  };

  return (
    <>
      <div className="w-full overflow-y-auto h-auto">
        <form onSubmit={handleNextStep} className="overflow-y-auto h-auto">
          <div className="w-full pb-6 h-auto">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 h-auto">
              {/* left side part */}
              <div className="grid h-fit w-full gap-6">
                <BusinessName />
                <BusinessDescription />
                <BusinessAddress />
                <CategoryDropdown />
                <SubCategoryDropdwon />
                <MonthYear />
              </div>
              {/* right side */}
              <div className="grid h-fit w-full  gap-6">
                <UploadCoverImage />
                <UploadImageAndVideo />
                <div className="flex h-fit flex-col gap-6">
                  {/* <FeaturedService /> */}
                  <VideoUrlAddPost />
                  <NoofEmployees />
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center mt-12">
              <button
                type="submit"
                className="flex w-fit items-center justify-between gap-2 rounded-lg bg-[#0046AE] px-10 py-3"
              >
                <p className="font-poppins text-lg font-medium text-white">
                  Next Step
                </p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default BusinessDetailForm;
