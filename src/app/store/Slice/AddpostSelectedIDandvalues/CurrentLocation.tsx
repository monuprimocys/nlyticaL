import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: null,
  longitude: null,
  locationName: "",
  errorMessage: "",
};

const CurrentLocationSlice = createSlice({
  name: "CurrentLocationSlice",
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
      state.locationName = action.payload.locationName;
      state.errorMessage = "";
    },
    setError: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { setCurrentLocation, setError } = CurrentLocationSlice.actions;
export default CurrentLocationSlice.reducer;
