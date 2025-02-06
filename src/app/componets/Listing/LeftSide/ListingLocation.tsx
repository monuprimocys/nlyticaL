"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// Correct the import path
import { useAppSelector } from "@/app/hooks/hooks";
import { TextField } from "@mui/material";
import {
  clearSearchLocationCategory,
  setSearchLocationCategory,
} from "@/app/store/Slice/category/SerachLocationSlice";

declare global {
  interface Window {
    google: typeof google;
    initAutocomplete: () => void;
  }
}

const ListingLocation = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(""); // Track the input value

  // Current location from Redux state
  const { latitude, longitude, locationName, errorMessage } = useAppSelector(
    (state) => state.currentLocation
  );

  // Initialize input with the current location name if available
  useEffect(() => {
    if (locationName) {
      setInputValue(locationName);
    }
  }, [locationName]);

  useEffect(() => {
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

        // Extract the state name from the address components
        const addressComponents = place.address_components;
        let state = "";
        addressComponents.forEach((component) => {
          if (component.types.includes("administrative_area_level_1")) {
            state = component.long_name;
          }
        });

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        console.log("Selected place:", state);

        //  if the state is empty then pass  locationName  values in state
        if (state === "") {
          state = locationName;
        }

        // Update the input value with just the state name
        setInputValue(state);

        // Dispatch the state name and location info to Redux
        dispatch(
          setSearchLocationCategory({
            name: state, // Set only the state name
            location: place.geometry.location,
            vicinity: place.name || "",
            lat,
            lng,
          })
        );

        // Create a marker on the map for the selected place
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };

        const marker = new google.maps.Marker({
          map,
          icon,
          title: place.formatted_address,
          position: place.geometry.location,
        });

        markers.push(marker);

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      map.fitBounds(bounds);
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value, "selected");

    setInputValue(value);

    if (value.trim() === "") {
      dispatch(clearSearchLocationCategory());
    }
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="relative h-full flex w-full items-center justify-center p-4">
        <div className="w-full absolute h-full right-[2rem] bottom-6">
          <TextField
            id="pac-input"
            variant="outlined"
            fullWidth
            className="input-important p-4 text-[16px]"
            placeholder="Search only state name"
            value={inputValue}
            onChange={handleInputChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                fontFamily: "Poppins, sans-serif",
                fontSize: "1.125rem",
                backgroundColor: isDarkMode ? "#FFFFFF21" : "#ffffff",
                color: isDarkMode ? "#ffffff" : "#000000",
                border: "none",

                borderRadius: "8px",
                borderColor: "#B4B4B4",
                "&:focus-within": {
                  borderColor: "#B5843F66",
                  boxShadow: "0 0 0 1px #B5843F66",
                },
              },
              "& .MuiInputBase-input": {
                color: isDarkMode ? "#ffffff" : "#000000",
                fontFamily: "Poppins, sans-serif",
              },
            }}
          />
        </div>
      </div>
      <div
        id="map"
        className="flex-1 rounded-xl"
        style={{ height: "400px" }}
      ></div>
    </div>
  );
};

export default ListingLocation;
