import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state type
interface PriceStateListing {
  price: number;
}

const initialState: PriceStateListing = {
  price: 0, // Start with 100 as the default price
};

const PriceSliceListing = createSlice({
  name: "priceListing",
  initialState,
  reducers: {
    // The action to update the price
    setPriceListing: (state, action: PayloadAction<number>) => {
      // Ensure the price stays within a valid range (100 to 1000)
      state.price = Math.max(0, Math.min(1000, action.payload));
    },
  },
});

export const { setPriceListing } = PriceSliceListing.actions;
export default PriceSliceListing.reducer;
