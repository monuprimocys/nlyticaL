import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  selectedLocation: string;
}

const initialState: LocationState = {
  selectedLocation: "",
};

const locationSearchHomeSlice = createSlice({
  name: "locationSearchHome",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.selectedLocation = action.payload;
    },
  },
});

export const { setLocation } = locationSearchHomeSlice.actions;
export default locationSearchHomeSlice.reducer;
