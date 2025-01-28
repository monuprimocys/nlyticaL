import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLocation: null, // To store the selected location
  currentLocation: null, // To store the current location
  lat: null, // To store latitude
  lng: null, // To store longitude
};

const SerachLocationSlice = createSlice({
  name: "SerachLocationSlice",
  initialState,
  reducers: {
    setSearchLocationCategory: (state, action) => {
      state.selectedLocation = action.payload.name;
      state.currentLocation = action.payload.location;
      state.lat = action.payload.lat; // Store the latitude
      state.lng = action.payload.lng; // Store the longitude
    },
    clearSearchLocationCategory: (state) => {
      state.selectedLocation = null;
      state.currentLocation = null;
      state.lat = null;
      state.lng = null;
    },
  },
});

export const { setSearchLocationCategory, clearSearchLocationCategory } = SerachLocationSlice.actions;

export default SerachLocationSlice.reducer;
