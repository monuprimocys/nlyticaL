import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategoryListing: {
    id: null,
    category_name: "",
  },
};

const CategoryLIstingSlice = createSlice({
  name: "categoryListing",
  initialState,
  reducers: {
    setSelectedCategoryListing: (state, action) => {
      state.selectedCategoryListing = action.payload;
    },
  },
});

export const { setSelectedCategoryListing } = CategoryLIstingSlice.actions;

export default CategoryLIstingSlice.reducer;
