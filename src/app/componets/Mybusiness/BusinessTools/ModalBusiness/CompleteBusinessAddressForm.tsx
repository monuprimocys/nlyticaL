"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import locationicon from "../../../../../../public/assets/Image/locationmarkericon.png";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { toast } from "react-toastify";
import { hideModal } from "@/app/storeApp/Slice/modalSlice";
import { updateAddPostData } from "@/app/storeApp/Slice/AddPostSlice";
import Currentlocation from "@/app/AddPost/BusinessDetail/BusinessDetailForm/Currentlocation";
import { useUpdateServiceMutation } from "@/app/storeApp/api/updateServiceApi";
import Cookies from "js-cookie";

function CompleteBusinessAddressForm() {
  const vendor_id = Cookies.get("user_id");
  const service_id = Cookies.get("service_id");
  const [updateService, { data, isLoading, error }] =
    useUpdateServiceMutation();

  useEffect(() => {
    if (vendor_id && service_id) {
      // Make sure both vendor_id and service_id are available before calling the mutation
      updateService({ vendor_id, service_id });
    }
  }, [vendor_id, service_id, updateService]);

  console.log(
    " my api responce  values from add ress modal ",
    data?.service.address
  );

  const Addressfromapiresponce = data?.service;

  console.log("Addressfromapiresponce", Addressfromapiresponce);

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
      : Addressfromapiresponce?.address;

  const latmycurrentlocationAndSelectedLocationIs = currentlocationvalues.lat
    ? currentlocationvalues.lat
    : Addressfromapiresponce?.lat;

  const lonmycurrentlocationAndSelectedLocationIs = currentlocationvalues.lng
    ? currentlocationvalues.lng
    : Addressfromapiresponce?.lon;

  console.log(
    " my location values is @!@!@!@ lat values",
    mycurrentlocationAndSelectedLocationIs
  );

  console.log(
    " my  current location and are is @!@!@@",
    defaultCurrentlocation
  );

  const lastFourWords = Addressfromapiresponce?.address
    .split(" ")
    .slice(-4)
    .join(" ");

  //  in my setAdress slice and counry name and city and state and area
  const locationParts = Addressfromapiresponce?.address
    .split(" ")
    .slice(-5)
    .filter((word) => !/\d/.test(word)); // Remove any word containing numbers

  const state = locationParts
    ? locationParts[locationParts.length - 2] || ""
    : "";
  const country = locationParts
    ? locationParts[locationParts.length - 1] || ""
    : "";

  console.log(" my  state values", country);

  const address = useAppSelector((state) => state.address);
  const dispatch = useAppDispatch();

  console.log("my api responce values area", Addressfromapiresponce?.area);

  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [cityName, setCityName] = useState("");

  useEffect(() => {
    setArea(data?.service?.area || "");
    setCityName(data?.service?.city || "");
  }, [data]);

  console.log("  my  input values", area);

  // Update Redux store when form changes
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();

    //  Dispatch redux actions to save address data in the store
    dispatch(
      updateAddPostData({
        state: mystate || state,
        country: mycountry || country,
        address: mycurrentlocationAndSelectedLocationIs,
        lon: (lonmycurrentlocationAndSelectedLocationIs ?? "").toString(),
        lat: (latmycurrentlocationAndSelectedLocationIs ?? "").toString(),
      })
    );

    // Creating a FormData object and appending the necessary fields
    const formData = new FormData();
    formData.append("vendor_id", vendor_id); // Make sure `vendor_id` exists
    formData.append("service_id", service_id); // Make sure `service_id` exists
    formData.append("area", area); // Pass the area value (make sure `area` exists)
    formData.append("city", cityName);

    // You can add other fields to `formData` as needed
    formData.append("address", mycurrentlocationAndSelectedLocationIs);
    formData.append(
      "lat",
      (latmycurrentlocationAndSelectedLocationIs ?? "").toString()
    );
    formData.append(
      "lon",
      (lonmycurrentlocationAndSelectedLocationIs ?? "").toString()
    );

    try {
      // Trigger the API mutation with the FormData
      const response = await updateService(formData).unwrap();

      // Handle success (if the mutation is successful)
      if (response) {
        toast.success("Address saved successfully!");
        dispatch(hideModal("CompleteBusinessModal"));

        console.log(
          " my api responce from update business address",
          response.service.address
        );
        localStorage.setItem("locationupdate", response.service.address || "");
      }
    } catch (err) {
      // Handle error (if the mutation fails)
      console.error("Error saving address:", err);
      toast.error("Failed to save address.");
    }
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
              : Addressfromapiresponce?.address}
          </h4>
        </div>
      </div>

      {/* form values */}
      <form className="flex w-full flex-col gap-6" onSubmit={handleSaveAddress}>
        {/* flate number */}
        <div className="">
          <label
            className="flex gap-[2px] text-sm font-medium text-[#000000]"
            htmlFor="house"
          >
            <span>House/Flat/ Block No </span>{" "}
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
        {/* area */}
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
