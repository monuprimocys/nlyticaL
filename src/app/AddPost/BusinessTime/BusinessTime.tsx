"use client";
import BusinessOpeningHours from "./BusinessOpeningHours";
import DaysofWeek from "./DaysofWeek";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { updateAddPostData } from "@/app/store/Slice/AddPostSlice";
import Cookies from "js-cookie";
import { useAddServiceMutation } from "@/app/store/api/AddService";
import { toast } from "react-hot-toast";
import { hideModal } from "@/app/store/Slice/modalSlice";
import MetadataInputBox from "./MetadataInputBox";
import Metadata from "./Metadata";

function BusinessTime() {
  const dispatch = useAppDispatch();
  const addPostData = useAppSelector((state) => state.AddPost);

  const handlePreviousStep = () => {
    if ((addPostData.add_new_post_steps ?? 0) > 1) {
      dispatch(
        updateAddPostData({
          add_new_post_steps: ((addPostData.add_new_post_steps ?? 0) - 1) as
            | 1
            | 2
            | 3,
        })
      );
    }
  };

  const storesliceImage = useAppSelector(
    (state) => state.AddPost.service_image
  );

  const coverImage = useAppSelector((state) => state.AddPost.cover_image);

  console.log(
    " my cover imager from when submit the fdata@@@@@@@@@@@@@@@@@@@ ",
    coverImage
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

  console.log(" my varil from subcategory", subcategory_id);
  const getvalues = useAppSelector((state) => state.monthYear);
  const selectedDate = useAppSelector((state) => state.businessHours);

  const joinAddress =
    `${address.house} ${address.area} ${address.landmark}`.trim();
  const published_month = getvalues.monthValue.format("MMMM");
  const published_year = getvalues.yearValue.format("YYYY");

  const postData = {
    address: joinAddress,
    category_id: category_id,
    subcategory_id: subcategory_id,
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

  console.log(" addpost  data  my store services", postData);

  // Use the mutation hook
  const [addService, { isLoading, isSuccess, isError, error }] =
    useAddServiceMutation();

  // Validation function
  const validateFields = () => {
    if (!addPostData.service_name) {
      toast.error("Service name is required");
      return false;
    }
    if (!addPostData.service_email) {
      toast.error("Service email is required");
      return false;
    }
    if (!addPostData.service_phone) {
      toast.error("Service phone is required");
      return false;
    }
    if (!joinAddress) {
      toast.error("Address is required");
      return false;
    }
    if (!storesliceImage || storesliceImage.length === 0) {
      toast.error("Service image is required");
      return false;
    }
    if (!selectedDate.selectedDays.length) {
      toast.error("Open days are required");
      return false;
    }
    if (!selectedDate.startTime || !selectedDate.endTime) {
      toast.error("Business opening hours are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    // Validate before submitting
    const isValid = validateFields();
    if (!isValid) return;

    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append all the fields to the FormData object
      formData.append("address", joinAddress);
      formData.append("category_id", category_id);
      formData.append(
        "subcategory_id",
        Array.isArray(subcategory_id)
          ? subcategory_id
              .map((item) => item.id) // Extract the 'id' from each object
              .filter((id) => id !== "") // Filter out any empty strings
              .join(",") // Join the valid IDs into a string
          : ""
      );

      formData.append("published_month", published_month);
      formData.append("cover_image", addPostData.cover_image[0]);
      formData.append("published_year", published_year);
      formData.append("service_description", addPostData.service_description);
      formData.append("service_email", addPostData.service_email);
      formData.append("service_name", addPostData.service_name);
      formData.append("service_phone", addPostData.service_phone);
      formData.append("service_website", addPostData.service_website);
      formData.append("facebook_link", addPostData.facebook_link);
      formData.append("instagram_link", addPostData.instagram_link);
      formData.append("twitter_link", addPostData.twitter_link);
      formData.append("whatsapp_link", addPostData.whatsapp_link);
      formData.append("vendor_id", user_id);
      formData.append("is_featured", addPostData.is_featured);
      formData.append("lat", location.lat || current_address.latitude);
      formData.append("lon", location.lng || current_address.longitude);
      formData.append("open_days", selectedDate.selectedDays.join(","));
      formData.append("open_time", selectedDate.startTime);
      formData.append("close_time", selectedDate.endTime);
      formData.append("closed_days", selectedDate.unselectedDays.join(","));
      formData.append("employee_strength", addPostData.employee_strength);
      formData.append("area", addPostData.area);
      formData.append("city", addPostData.city);
      formData.append("state", addPostData.state);
      formData.append("country", addPostData.country);
      formData.append("video", "");
      formData.append("video_thumbnail", "");
      formData.append("meta_title", addPostData.meta_title);
      formData.append("meta_description", addPostData.meta_description);

      // Check if there are files to upload
      storesliceImage.forEach((file) => {
        formData.append("service_images[]", file);
      });

      // Call the API mutation with the FormData
      await addService(formData).unwrap();
      toast.success("Service added successfully");
      dispatch(hideModal("AddPostModal"));
      Cookies.set("FormSubmited", "true");
    } catch (err) {
      console.error("Failed to add service", err);
    }
  };

  return (
    <div className="flex w-full flex-col items-center space-y-6 md:items-start">
      <BusinessOpeningHours />
      <DaysofWeek />
      <Metadata />
      <div className="mx-auto flex w-[90%] flex-col items-center justify-center gap-6 pb-10 md:w-full md:flex-row">
        <div>
          <button
            onClick={handlePreviousStep}
            className="bordercoloricon font-poppins rounded-xl bg-transparent px-12 py-3 font-medium text-[#0046AE]"
          >
            Previous
          </button>
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="font-poppins rounded-xl bg-[#0046AE] px-14 py-3 font-medium text-white"
            disabled={isLoading} // Disable button if the request is in progress
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BusinessTime;
