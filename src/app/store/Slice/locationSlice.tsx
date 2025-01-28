// src/store/locationSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: null, // To store the selected location
  currentLocation: null, // To store the current location
  lat: null, // To store latitude
  lng: null, // To store longitude
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.selectedLocation = action.payload.name;
      state.currentLocation = action.payload.location;
      state.lat = action.payload.lat; // Store the latitude
      state.lng = action.payload.lng; // Store the longitude
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
