"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { showModal } from "@/app/storeApp/Slice/modalSlice";
import { useUpdateStoreMutation } from "@/app/storeApp/api/UpdateStoreApi";
import {
  updateStoreFailure,
  updateStoreSuccess,
} from "@/app/storeApp/Slice/UpdateStoreSlice";
import { useAppSelector } from "@/app/hooks/hooks";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { decodeString, encodeString } from "@/app/utils/enocodeAndDecode";

interface CardDesignBusinessProps {
  name: string;
  store_name: string;
  store_description: string;
  priceRange: string;
  mainImage: string;
  avatar: string;
  store_id: string;
  service_name: string;
}

const CardDesignBusiness: React.FC<CardDesignBusinessProps> = ({
  name,
  store_name,
  store_description,
  priceRange,
  mainImage,
  avatar,
  store_id,
  service_name,
}) => {
  const dispatch = useDispatch();

  const [UpdateStore] = useUpdateStoreMutation();

  console.log(" my avatar@@###   ", service_name);
  const service_id = Cookies.get("service_id");
  const router = useRouter(); // <-- Initialize router

  // Function to handle edit
  const handalupdate = async (id: string) => {
    try {
      const response = await UpdateStore({ store_id: id });

      console.log(
        " my   update store api response",
        response.data?.store.subcategory_name
      );
      sessionStorage.setItem(
        "updatestore_idsubcategory",
        response.data?.store.subcategory_id
      );
      sessionStorage.setItem(
        "updatestorenamesubcategory",
        response.data?.store.subcategory_name
      );
      if (response.data && response.data.status) {
        dispatch(updateStoreSuccess({ store: response.data.store }));
        dispatch(showModal("UpdateAddStoreModal"));
      } else {
        dispatch(updateStoreFailure("Failed to delete the store"));
      }
    } catch (error) {
      dispatch(
        updateStoreFailure("An error occurred while deleting the store")
      );
    }
  };

  //  handal delete
  const handalDelete = async (id: string) => {
    try {
      const response = await UpdateStore({ store_id: id });
      if (response.data && response.data.status) {
        dispatch(updateStoreSuccess({ store: response.data.store }));
        dispatch(showModal("DeleteStoreModal"));
      } else {
        dispatch(updateStoreFailure("Failed to delete the store"));
      }
    } catch (error) {
      dispatch(
        updateStoreFailure("An error occurred while deleting the store")
      );
    }
  };

  const updatestoreslicedata = useAppSelector((state) => state.UpdateStore);

  console.log(
    " my api slice store values from update slice ",
    updatestoreslicedata
  );

  const handleCardClick = (e) => {
    e.preventDefault(); // Prevent default behavior
    e.stopPropagation(); // Stop event propagation to avoid triggering other click handlers
    if (!service_id || !service_name) {
      console.error("Invalid serviceId or serviceName");
      return;
    }

    const encodedServiceId = encodeString(String(service_id)); // Ensure serviceId is a string
    const serviceSlug = service_name.toLowerCase().replace(/\s+/g, "-"); // Convert name to URL slug

    console.log("Encoded Service ID:", encodedServiceId);

    // Navigate to the encoded route
    router.push(`/stores/${serviceSlug}/${encodedServiceId}`);

    service_id12 = decodeString(encodedServiceId);

    // Store in sessionStorage for later use
    sessionStorage.setItem("serviceId", service_id12);
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);
  return (
    <div
      className="h-fit overflow-hidden w-full relative rounded-xl flex flex-col mb-2 shadow-md cursor-pointer"
      onClick={handleCardClick} // <-- Call navigation on click
    >
      {/* Image Section */}
      <div
        className="w-full rounded-t-xl h-[12rem] bg-cover bg-right-top"
        style={{
          backgroundImage: `url(${mainImage})`,
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Content Section */}
      <div
        className={`w-full py-4 flex justify-center h-[18rem] items-center px-4 sm:px-6   ${
          isDarkMode ? " bg-[#212121]" : " bg-white"
        }`}
      >
        <div className="flex flex-col w-full gap-3">
          {/* Avatar with Detail */}
          <div className="flex items-center gap-x-2">
            <div
              className="w-10 h-10 rounded-full"
              style={{
                backgroundImage: `url(${avatar})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div>
              <h5
                className={` font-poppins text-lg font-medium line-clamp-1  ${
                  isDarkMode ? "text-white" : "text-[#636363]"
                }`}
              >
                {name}
              </h5>
            </div>
          </div>

          {/* Store Heading */}
          <div>
            <h3
              className={`xl:text-[22px] text-xl font-semibold font-poppins line-clamp-1  ${
                isDarkMode ? "text-white" : " text-black"
              }`}
            >
              {store_name}
            </h3>
          </div>

          {/* Store Description */}
          <div className="flex gap-2">
            <p
              className={` font-poppins text-sm line-clamp-2  ${
                isDarkMode ? "text-[#FFFFFFBA]" : "text-[#636363]"
              }`}
            >
              {store_description}
            </p>
          </div>

          {/* Price Range Button */}
          <div
            className={`w-full mx-auto border-2 border-[#0046AE] px-4 py-3 rounded-xl flex justify-center items-center group relative overflow-hidden cursor-pointer   ${
              isDarkMode ? "  bg-[#0046AE2B]" : " "
            } `}
          >
            <button className="text-[#0046AE] font-medium font-poppins group-hover:text-white z-10 relative">
              {priceRange}
            </button>
            <div className="absolute top-0 left-0 w-full h-full bg-[#0046AE] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {/* Edit and Delete Btn */}
          <div className="w-full grid grid-cols-2 gap-6">
            <button
              className="text-[#FFFFFF] bg-[#0046AE] rounded-xl px-4 py-2 font-medium font-poppins"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                handalupdate(store_id);
              }}
            >
              Edit
            </button>
            <button
              className="text-[#0046AE] font-medium font-poppins rounded-xl px-4 py-2 bordercolorservice"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                handalDelete(store_id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDesignBusiness;
