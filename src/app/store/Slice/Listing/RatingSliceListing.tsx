// src/redux/RatingSliceListing.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RatingStatelisting {
  selectedRating: string;
}

const initialState: RatingStatelisting = {
  selectedRating: "",
};

const RatingSliceListing = createSlice({
  name: "ratinglisting",
  initialState,
  reducers: {
    setSelectedRatingListing: (state, action: PayloadAction<string>) => {
      state.selectedRating = action.payload;
    },
  },
});

export const { setSelectedRatingListing } = RatingSliceListing.actions;

export default RatingSliceListing.reducer;
