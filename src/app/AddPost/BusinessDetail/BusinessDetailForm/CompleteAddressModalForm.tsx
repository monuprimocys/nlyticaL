"use client";

import React, { useState } from "react";
import "../../style.css";
import Image from "next/image";
import locationicon from "../../../../../public/assets/Image/locationmarkericon.png";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { toast } from "react-toastify";
import Currentlocation from "./Currentlocation";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";

function CompleteAddressModalForm() {
  const currentlocationvalues = useAppSelector((state) => state.location);

  console.log(
    " my  current location and aremonu @!@",
    currentlocationvalues.selectedLocation
  );

  const locationinputnoxvalues = currentlocationvalues.selectedLocation
    ? currentlocationvalues.selectedLocation
        .split(" ")
        .slice(-5)
        .filter((word) => !/\d/.test(word))
    : []; // Remove any word containing numbers;

  // Get second-to-last value for state, and the last value for country
  const mystate =
    locationinputnoxvalues[locationinputnoxvalues.length - 2] || "";
  const mycountry =
    locationinputnoxvalues[locationinputnoxvalues.length - 1] || "";

  console.log("My state value: ", mystate);
  console.log("My country value: ", mycountry);

  const defaultCurrentlocation = useAppSelector(
    (state) => state.currentLocation
  );

  const mycurrentlocationAndSelectedLocationIs =
    currentlocationvalues.selectedLocation
      ? currentlocationvalues.selectedLocation
      : defaultCurrentlocation.locationName;

  const latmycurrentlocationAndSelectedLocationIs = currentlocationvalues.lat
    ? currentlocationvalues.lat
    : defaultCurrentlocation.latitude;

  const lonmycurrentlocationAndSelectedLocationIs = currentlocationvalues.lng
    ? currentlocationvalues.lng
    : defaultCurrentlocation.longitude;

  console.log(
    " my location values is @!@!@!@ lat values",
    mycurrentlocationAndSelectedLocationIs
  );

  console.log(
    " my  current location and are is @!@!@@",
    defaultCurrentlocation
  );

  const lastFourWords = defaultCurrentlocation.locationName
    .split(" ")
    .slice(-4)
    .join(" ");

  const dispatch = useAppDispatch();

  const AddPost = useAppSelector((state) => state.AddPost);

  const [address, setAddress] = useState(AddPost.address || "");
  const [area, setArea] = useState(AddPost.area || "");
  const [cityName, setCityName] = useState(AddPost.city || "");
  const [state, setState] = useState(AddPost.state || "");

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      updateAddPostData({
        address,
        area,
        city: cityName,
        state,
        lon: (lonmycurrentlocationAndSelectedLocationIs ?? "").toString(),
        lat: (latmycurrentlocationAndSelectedLocationIs ?? "").toString(),
      })
    );

    dispatch(hideModal("CompleteAddressModal"));
    toast.success("Address saved successfully!");
  };

  console.log(
    " my addresssvalues from lat long ",
    latmycurrentlocationAndSelectedLocationIs
  );

  return (
    <div className="grid h-auto w-full grid-cols-1 gap-6    ">
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
        {/* Address */}
        <div>
          <label
            className="flex gap-[2px] text-sm font-medium text-[#000000]"
            htmlFor="address"
          >
            <span>Address (House No, Building, Street)</span>
            <span className="h-1 w-1 rounded-full text-red-600">*</span>
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="inputboxborder w-full  font-poppins mt-2 rounded-md border bg-white py-4 px-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none"
            placeholder="Enter Full Address"
            required
          />
        </div>

        {/* Area */}
        <div>
          <label
            className="flex gap-[2px] text-sm font-medium text-[#000000]"
            htmlFor="area"
          >
            <span>Area</span>
            <span className="h-1 w-1 rounded-full text-red-600">*</span>
          </label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="inputboxborder w-full   font-poppins mt-2 rounded-md border bg-white py-4 px-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none"
            placeholder="Enter Area Name"
            required
          />
        </div>

        {/* City & State */}
        <div className="w-full flex flex-col md:flex-row gap-4">
          {/* City */}
          <div>
            <label
              className="flex gap-[2px] text-sm font-medium text-[#000000]"
              htmlFor="city"
            >
              <span>City</span>
              <span className="h-1 w-1 rounded-full text-red-600">*</span>
            </label>
            <input
              type="text"
              id="city"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="inputboxborder mt-2 w-full  font-poppins rounded-md border bg-white py-4 px-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none"
              placeholder="City"
              required
            />
          </div>

          {/* State */}
          <div>
            <label
              className="flex gap-[2px] text-sm font-medium text-[#000000]"
              htmlFor="state"
            >
              <span>State</span>
              <span className="h-1 w-1 rounded-full text-red-600">*</span>
            </label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="inputboxborder w-full rounded-md  font-poppins border mt-2 bg-white py-4 px-3 text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none"
              placeholder="State"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mx-auto flex w-[70%] items-center justify-center">
          <button
            type="submit"
            className="w-full rounded-lg bg-[#0046AE] py-3 text-lg text-white"
          >
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
}

export default CompleteAddressModalForm;
