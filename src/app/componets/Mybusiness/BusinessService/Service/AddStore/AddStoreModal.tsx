"use client";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import crossicon from "../../../../../../../public/assets/Image/crossicon.png";
import "../../../businesscss.css";  
import UploadStoreImage from "./UploadStoreImage";
import AddStoreName from "./AddStoreName";
import AddStoreDescrition from "./AddStoreDescrition";
import AddStorePrice from "./AddStorePrice";
import AddStoreAttachments from "./AddStoreAttachments";
import { useAddStoreApi } from "@/app/storeApp/api/useStoreAdd";
import Cookies from "js-cookie";
import { useStoreListApi } from "@/app/storeApp/api/usestorelist";
import { setStoreList } from "@/app/storeApp/Slice/AddStore";
import { ToastContainer, toast } from "react-toastify";
import AddStoreSubCategoriy from "./AddStoreSubCategoriy";

function AddStoreModal() {
  const modalOpen = useAppSelector((state) => state.modals.AddStoreModal);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");

  const dispatch = useAppDispatch();
  const { error: apiError, mutate } = useAddStoreApi();

  const store_name = useAppSelector((state) => state.AddStore.currentStoreName);
  const store_description = useAppSelector(
    (state) => state.AddStore.currentStoreDescription
  );
  const price = useAppSelector((state) => state.AddStore.currentStorePrice);
  const store_images = useAppSelector((state) => state.AddPost.service_image);
  const store_attachments = useAppSelector(
    (state) => state.AddPost.cover_image
  );
  const storedCategoryId = sessionStorage.getItem("selectedSubCategoryId");

  const close = () => dispatch(hideModal("AddStoreModal"));

  // The API hook (used to fetch the store list)
  const { data, error, isLoading, refetch } = useStoreListApi(service_id);

  // Handle form submission
  const handleSave = async () => {
    const formData = new FormData();

    // Append regular fields to the FormData
    formData.append("service_id", service_id);
    formData.append("vendor_id", vendor_id);
    formData.append("store_name", store_name);
    formData.append("store_description", store_description);
    formData.append("price", price);
    formData.append("subcategory_id", storedCategoryId);

    // Append files (store_images)
    store_images.forEach((file) => {
      formData.append("store_images[]", file); // Make sure each file is appended correctly
    });

    // Append store_attachments
    store_attachments.forEach((file) => {
      formData.append("store_attachments[]", file); // Same for attachments
    });

    try {
      // 1. Call the API to add the store (mutate)
      await mutate({
        service_id,
        vendor_id,
        store_name,
        store_description,
        price,
        store_images, // These should be File[] arrays
        store_attachments, // These should be File[] arrays
        subcategory_id: storedCategoryId, // The stored category ID should be used for the store
      });

      // Success toast notification
      toast.success("Store added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // 2. Once the store is added, refetch the store list
      if (service_id) {
        const refetchedData = await refetch(); // Refetch the store list to update the data
        if (refetchedData?.data?.StoreList) {
          dispatch(setStoreList(refetchedData.data.StoreList)); // Dispatch to Redux store once data is fetched
        }
      }
      refetch();

      close(); // Close the modal after successful submission
    } catch (error) {
      console.error("Error saving store or fetching store list:", error);

      // Error toast notification
      toast.error("Failed to add store. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <Dialog open={modalOpen} onClose={close} as="div" className="z-50">
      <div className="fixed inset-0 z-50 h-auto overflow-y-auto bg-black bg-opacity-55 backdrop-blur-sm">
        <div className="flex min-h-full h-auto items-center justify-center">
          <DialogPanel
            className={`mx-auto pb-6 h-auto w-[90%] rounded-2xl  shadow-lg backdrop-blur-2xl duration-300 ease-out sm:w-[60%] xl:w-[30%]  ${
              isDarkMode ? " bg-[#181818]  text-white" : "bg-white text-black"
            }`}
          >
            <div
              className={`flex w-full items-center justify-between p-4  font-poppins rounded-b-lg  ${
                isDarkMode ? "bg-[#FFFFFF0A]" : "modalbordercolor"
              }`}
            >
              <h3 className="font-poppins text-lg font-medium  text-center w-full">
                Add Service
              </h3>
              <div
                className="cursor-pointer"
                onClick={close}
                aria-label="Close modal"
              >
                <Image
                  src={crossicon}
                  className={`h-8 w-8  ${isDarkMode ? " invert" : ""}`}
                  alt="Close icon"
                />
              </div>
            </div>

            <div className="mx-auto w-[80%] flex justify-center mt-[3rem] flex-col gap-6 items-center h-auto">
              <UploadStoreImage />
              <AddStoreName />
              <AddStoreSubCategoriy />
              <AddStoreDescrition />
              <AddStorePrice />
              <AddStoreAttachments />

              <div className="w-full justify-center items-center flex">
                <button
                  type="button"
                  onClick={handleSave} // Call the handleSave function when clicked
                  className="w-fit px-[5rem] py-3 bg-[#0046AE] rounded-lg font-poppins text-white"
                >
                  {isLoading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
        <ToastContainer />
      </div>
    </Dialog>
  );
}

export default AddStoreModal;
