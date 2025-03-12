// src/store/locationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: "", // To store the selected location
  currentLocation: "", // To store the current location
  lat: null, // To store latitude
  lng: null, // To store longitude
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.selectedLocation = action.payload.name;
      state.currentLocation = JSON.stringify(action.payload.location); // Convert object to string
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
