"use client";

import React, { useEffect, useState, useRef } from "react";

import CrossIcon from "../../../../public/assets/Image/insta.png";
import { MdOutlineStar } from "react-icons/md";
import { IoIosStarHalf } from "react-icons/io";

const Googlemap: React.FC = () => {
  const googleMapRef = useRef<HTMLDivElement | null>(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  // Static data for the property
  const staticData = {
    id: "1",
    lat: 23.073292,
    lon: 72.560402,
    title: "Mapplin Electronic",
    price: 500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    location: "Los Angeles, CA",
    status: "Electrical",
    property_image: [
      {
        url: "https://plus.unsplash.com/premium_photo-1661960643553-ccfbf7d921f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }, // Replace with actual image URL
    ],
  };

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
          // console.log("Google Maps script loaded");
          setGoogleLoaded(true);
        };

        script.onerror = () => {
          console.error(
            "Failed to load Google Maps script. Check your API key or network connection."
          );
        };

        document.body.appendChild(script);
      } else {
        // console.log("Google Maps already loaded");
        setGoogleLoaded(true);
      }
    };

    loadGoogleMaps();
  }, []);

  useEffect(() => {
    if (googleLoaded && window.google && googleMapRef.current) {
      const googleMap = new window.google.maps.Map(googleMapRef.current, {
        center: { lat: staticData.lat, lng: staticData.lon },
        zoom: 13,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: staticData.lat, lng: staticData.lon },
        map: googleMap,
        icon: {
          url: "https://cdn-icons-png.flaticon.com/512/1001/1001022.png",
          scaledSize: new window.google.maps.Size(50, 50),
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
        `,
      });

      marker.addListener("click", () => {
        infoWindow.open(googleMap, marker);
      });
    }
  }, [googleLoaded]);

  return (
    <div className="items-center justify-center w-full h-full rounded-lg">
      <div
        ref={googleMapRef}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default Googlemap;
