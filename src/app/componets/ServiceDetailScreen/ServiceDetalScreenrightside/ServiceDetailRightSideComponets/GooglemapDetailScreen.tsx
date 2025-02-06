"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import React, { useEffect, useState, useRef } from "react";
import locationicon from "../../../../../../public/assets/Image/locationicondetail.png";
import Image from "next/image";

const GooglemapDetailScreen: React.FC = () => {
  const googleMapRef = useRef<HTMLDivElement | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [address, setAddress] = useState("");
  const ServiceDetailData = useAppSelector(
    (state) => state.serviceDetail.serviceDetail
  );
  console.log("serviceDetailData #", ServiceDetailData);

  // Use ServiceDetailData or fall back to staticData
  const lat = parseFloat(ServiceDetailData?.lat);
  const lon = parseFloat(ServiceDetailData?.lon);

  // Fallback coordinates if lat/lon are invalid
  const fallbackLat = 37.7749; // San Francisco, for example
  const fallbackLon = -122.4194; // San Francisco, for example

  // Determine whether the provided coordinates are valid
  const validLat = !isNaN(lat) ? lat : fallbackLat;
  const validLon = !isNaN(lon) ? lon : fallbackLon;

  // Function to get address from lat/lon using Google Maps Geocoding API
  const getAddressFromCoordinates = (lat: number, lon: number) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(lat, lon);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK" && results) {
        if (results[0]) {
          console.log("Address:", results[0].formatted_address);
          setAddress(results[0].formatted_address); // Set address state
        } else {
          console.error("No results found");
        }
      } else {
        console.error("Geocoder failed due to: " + status);
      }
    });
  };

  // Loading Google Maps script if not already loaded
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          setGoogleLoaded(true);
        };

        script.onerror = () => {
          console.error(
            "Failed to load Google Maps script. Check your API key or network connection."
          );
        };

        document.body.appendChild(script);
      } else {
        setGoogleLoaded(true);
      }
    };

    loadGoogleMaps();
  }, []);

  // Once Google Maps is loaded, initialize the map and marker
  useEffect(() => {
    if (googleLoaded && window.google && googleMapRef.current) {
      const googleMap = new window.google.maps.Map(googleMapRef.current, {
        center: { lat: validLat, lng: validLon },
        zoom: 13,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: validLat, lng: validLon },
        map: googleMap,
        icon: {
          url: "https://cdn-icons-png.flaticon.com/512/1001/1001022.png",
          scaledSize: new window.google.maps.Size(50, 50),
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="font-family: Arial, sans-serif; font-size: 14px;">
            <img src="${ServiceDetailData.service_images[0]}" alt="Property Image" style="width: 100%; border-radius: 8px;" />
          </div>
        `,
      });

      // Open info window when marker is clicked
      marker.addListener("click", () => {
        infoWindow.open(googleMap, marker);
      });

      // Log the address based on lat/lon
      getAddressFromCoordinates(validLat, validLon);
    }
  }, [googleLoaded, validLat, validLon]);

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="items-center justify-center w-full p-4 h-full rounded-lg photoservicedetailborderandshado">
      {/* Heading */}
      <div
        className={`text-lg font-medium items-start font-poppins    ${
          isDarkMode ? "text-[#ffffff]" : "text-[#3E5155]"
        }`}
      >
        Map
      </div>
      {/* Google map location according to lat lon */}
      <div className="w-full flex gap-2 h-full">
        <Image
          src={locationicon}
          alt="Location Icon"
          className={`w-6 h-6  ${isDarkMode ? "bg-circle-icon" : ""}`}
        />
        <h1
          className={`text-sm font-medium  font-poppins pt-[2px]  ${
            isDarkMode ? "text-[#ffffff]" : "text-black"
          }`}
        >
          {address}
        </h1>
      </div>

      <div
        ref={googleMapRef}
        style={{
          width: "100%",
          height: "400px",
          borderRadius: "8px",
        }}
        className=" mt-3"
      />
    </div>
  );
};

export default GooglemapDetailScreen;
