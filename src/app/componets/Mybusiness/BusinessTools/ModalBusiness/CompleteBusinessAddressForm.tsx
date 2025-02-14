"use client";

import React, { useState } from "react";
import Image from "next/image";
import locationicon from "../../../../../../public/assets/Image/locationmarkericon.png";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { setAddress } from "@/app/store/Slice/AddressSlice";
import { toast } from "react-hot-toast";
import { hideModal } from "@/app/store/Slice/modalSlice";
import { updateAddPostData } from "@/app/store/Slice/AddPostSlice";
import Currentlocation from "@/app/AddPost/BusinessDetail/BusinessDetailForm/Currentlocation";
import Cookies from "js-cookie";
import { useUpdateServiceMutation } from "@/app/store/api/updateServiceApi";

function CompleteBusinessAddressForm() {
  const currentlocationvalues = useAppSelector((state) => state.location);
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  // when user select location from input field then update the add post data
  const locationinputnoxvalues = currentlocationvalues.selectedLocation
    ? currentlocationvalues.selectedLocation
        .split(" ")
        .slice(-5)
        .filter((word) => !/\d/.test(word))
    : []; // Remove any word containing numbers;

  console.log(
    " when user current location selected: ",
    currentlocationvalues.lat
  );

  const myarea = locationinputnoxvalues[0] || "";
  const mycity = locationinputnoxvalues[1] || "";
  const mystate = locationinputnoxvalues[2] || "";
  const mycountry = locationinputnoxvalues[3] || "";

  console.log(" my user location area selected", myarea);

  const defaultCurrentlocation = useAppSelector(
    (state) => state.currentLocation
  );

  const lastFourWords = defaultCurrentlocation.locationName
    .split(" ")
    .slice(-4)
    .join(" ");

  console.log("Last four words:", lastFourWords);

  console.log(
    " my default current location selected: ",
    defaultCurrentlocation
  );

  //  in my setAdress slice and counry name and city and state and area
  const locationParts = defaultCurrentlocation.locationName
    .split(" ")
    .slice(-5)
    .filter((word) => !/\d/.test(word)); // Remove any word containing numbers

  // Assign each part to a separate variable (adjust depending on how many parts you have)
  const area12 = locationParts[0] || "";
  const city = locationParts[1] || "";
  const state = locationParts[2] || "";
  const country = locationParts[3] || "";

  const address = useAppSelector((state) => state.address);
  const dispatch = useAppDispatch();

  const [house, setHouse] = useState(address.house);
  const [area, setArea] = useState(address.area);
  const [landmark, setLandmark] = useState(address.landmark);

  // Update Redux store when form changes
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();

    const response = updateService({
      vendor_id,
      service_id,
      area: myarea || area12,
      city: mycity || city,
      state: mystate || state,
      country: mycountry || country,
      lat: currentlocationvalues.lat || defaultCurrentlocation.latitude,
      lon: currentlocationvalues.lng || defaultCurrentlocation.longitude,
    }).unwrap();

    dispatch(setAddress({ house, area, landmark }));
    //  in  addpost slice add  state and area and city counters values
    dispatch(
      updateAddPostData({
        area: myarea || area12,
        city: mycity || city,
        state: mystate || state,
        country: mycountry || country,
      })
    );

    // Clear the form fields after saving the address
    setHouse("");
    setArea("");
    setLandmark("");
    toast.success("Address saved successfully!");
    dispatch(hideModal("CompleteAddressModal"));
  };

  // console.log("Complete Address Modal", address);

  return (
    <div className="grid h-auto w-full grid-cols-1 gap-6">
      {/* address detail box  */}
      <div className="step-container1 flex flex-col gap-4 rounded-lg p-5">
        <div className="hidden">
          <Currentlocation />
        </div>
        <div className="flex w-full items-center justify-start">
          <h4 className="font-poppins text-lg font-medium text-black">
            {currentlocationvalues.selectedLocation
              ? currentlocationvalues.selectedLocation
              : lastFourWords}
          </h4>
        </div>
        {/* image location marker */}
        <div className="flex w-full items-center gap-4">
          <Image
            src={locationicon}
            alt="Location Icon"
            width={30}
            height={30}
          />
          <h4 className="font-poppins text-[#8E8E93]">
            {currentlocationvalues.selectedLocation
              ? currentlocationvalues.selectedLocation
              : defaultCurrentlocation.locationName}
          </h4>
        </div>
      </div>

      {/* form values */}
      <form className="flex w-full flex-col gap-6" onSubmit={handleSaveAddress}>
        <div className="">
          <label
            className="flex gap-[2px] text-sm font-medium text-[#000000]"
            htmlFor="house"
          >
            <span>House/Flat/ Block No</span>{" "}
            <span className="h-1 w-1 rounded-full text-red-600">*</span>
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type="text"
              id="house"
              name="house"
              value={house}
              onChange={(e) => setHouse(e.target.value)} // Update local state
              className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
              placeholder="House/Flat/ Block No"
              required={true}
            />
          </div>
        </div>
        <div className="">
          <label
            className="flex gap-[2px] text-sm font-medium text-[#000000]"
            htmlFor="area"
          >
            <span>Area / Sector / Locality</span>{" "}
            <span className="h-1 w-1 rounded-full text-red-600">*</span>
          </label>

          <div className="relative mt-2 flex items-center">
            <input
              type="text"
              id="area"
              name="area"
              value={area}
              onChange={(e) => setArea(e.target.value)} // Update local state
              className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
              placeholder="Area / Sector / Locality"
              required={true}
            />
          </div>
        </div>
        <div className="">
          <label
            className="text-sm font-medium text-[#000000]"
            htmlFor="landmark"
          >
            Nearby landmark (optional)
          </label>
          <div className="relative mt-2 flex items-center">
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)} // Update local state
              className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
              placeholder="Nearby landmark"
            />
          </div>
        </div>
        <div className="bg mx-auto flex w-[70%] items-center justify-center">
          <button
            type="submit"
            className="font-poppins w-full rounded-lg bg-[#0046AE] py-3 text-lg font-normal text-white"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompleteBusinessAddressForm;
