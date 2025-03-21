"use client";

import React, { useState } from "react";
import "../../style.css";
import Image from "next/image";
import locationicon from "../../../../../public/assets/Image/locationmarkericon.png";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { setAddress } from "@/app/storeApp/Slice/AddressSlice";
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

  //  in my setAdress slice and counry name and city and state and area
  const locationParts = defaultCurrentlocation.locationName
    .split(" ")
    .slice(-5)
    .filter((word) => !/\d/.test(word)); // Remove any word containing numbers

  const state = locationParts[locationParts.length - 2] || "";
  const country = locationParts[locationParts.length - 1] || "";

  console.log(" my  state values", country);

  const address = useAppSelector((state) => state.address);
  const dispatch = useAppDispatch();

  const [house, setHouse] = useState(address.house);
  const [area, setArea] = useState(address.area);
  const [landmark, setLandmark] = useState(address.landmark);
  const [cityName, setCityName] = useState(address.cityName);

  const [address12, setaddress12] = useState(address.address);

  // Update Redux store when form changes
  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(setAddress({ house, area, landmark, cityName }));
    //  in  addpost slice add  state and area and city counters values
    dispatch(
      updateAddPostData({
        state: mystate || state,
        country: mycountry || country,
        address: mycurrentlocationAndSelectedLocationIs,
        lon: (lonmycurrentlocationAndSelectedLocationIs ?? "").toString(),
        lat: (latmycurrentlocationAndSelectedLocationIs ?? "").toString(),
      })
    );
    dispatch(hideModal("CompleteAddressModal"));
    // Clear the form fields after saving the address
    setHouse("");
    setArea("");
    setLandmark("");
    setCityName("");

    toast.success("Address saved successfully!");
  };

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
        {/*  addresss */}

        <div className="">
          <label
            className="flex gap-[2px] text-sm font-medium text-[#000000]"
            htmlFor="area"
          >
            <span>Address(House No, Building, Street)</span>{" "}
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
              placeholder="Enter Full Address"
              required={true}
            />
          </div>
        </div>

        {/* area */}
        <div className="">
          <label
            className="flex gap-[2px] text-sm font-medium text-[#000000]"
            htmlFor="area"
          >
            <span>Area</span>{" "}
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
              placeholder="Enter Area Name"
              required={true}
            />
          </div>
        </div>

        {/* optinonal */}
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
              placeholder="Enter Nearby Landmark"
            />
          </div>
        </div>
        {/*  city and state */}
        <div className=" w-full flex  justify-between gap-4  md:flex-row flex-col">
          {/* city */}
          <div className="">
            <label
              className="flex gap-[2px] text-sm font-medium text-[#000000]"
              htmlFor="area"
            >
              <span>City</span>{" "}
              <span className="h-1 w-1 rounded-full text-red-600">*</span>
            </label>

            <div className="relative mt-2 flex items-center">
              <input
                type="text"
                id="area"
                name="cityName"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)} // Update local state
                className="font-poppins inputboxborder w-full rounded-md border bg-white py-4 pl-3 pr-[3rem] text-[#000000] placeholder-gray-500 focus:border-[#B5843F66] focus:outline-none focus:ring-[#B5843F66]"
                placeholder="City"
                required={true}
              />
            </div>
          </div>

          {/* State* */}
          <div className="">
            <label
              className="flex gap-[2px] text-sm font-medium text-[#000000]"
              htmlFor="house"
            >
              <span>State</span>{" "}
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
                placeholder=" State"
                required={true}
              />
            </div>
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

export default CompleteAddressModalForm;
