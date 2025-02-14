// src/components/GooglemapInput.js

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../style.css";
import { CiSearch } from "react-icons/ci"; // Define types for Google Maps
import { setLocation } from "@/app/store/Slice/locationSlice";

declare global {
  interface Window {
    google: typeof google;
    initAutocomplete: () => void;
  }
}

const GooglemapInput = () => {
  const dispatch = useDispatch(); // To dispatch actions to the store

  useEffect(() => {
    // Load the Google Maps script dynamically
    const script = document.createElement("script");
    script.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMZ4GbRFYSevy7tMaiH5s0JmMBBXc0qBA&callback=initAutocomplete&libraries=places&v=weekly";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.initAutocomplete = initAutocomplete;
    };
  }, []);

  function initAutocomplete() {
    const map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 23.0225, lng: 72.5714 },
        zoom: 10,
        mapTypeId: "roadmap",
      }
    );

    const input = document.getElementById("pac-input") as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
    });

    let markers: google.maps.Marker[] = [];

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      console.log("monulocation: ", places[0]);

      if (places.length === 0) {
        return;
      }

      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: places[0]?.formatted_address,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        // Log the latitude and longitude values
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        console.log("Latitude: ", lat, "Longitude: ", lng);

        // Dispatch the selected location to Redux
        dispatch(
          setLocation({
            name: places[0]?.formatted_address,
            location: place.geometry.location,
            vicinity: places[0]?.name,
            lat, // Pass latitude
            lng, // Pass longitude
          })
        );
      });

      map.fitBounds(bounds);
    });
  }

  return (
    <div className="flex h-full w-full flex-col rounded-xl  ">
      <div className="relative flex w-full items-center justify-center p-4">
        <div className="relative">
          <input
            id="pac-input"
            className="input-important w-[70%] rounded-lg border p-4 pl-10 text-sm outline-none"
            type="text"
            placeholder="Search for area, street name"
          />
          <CiSearch className="absolute bottom-[-5.7rem] left-[-12rem] z-20 -translate-y-1/2 transform text-xl text-gray-500" />
        </div>
      </div>
      <div id="map" className="flex-1 rounded-xl"></div>
    </div>
  );
};

export default GooglemapInput;
