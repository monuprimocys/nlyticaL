// store/slices/categorySlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the selected category
interface CategoryState {
  selectedCategory: {
    id: number | null;
    category_name: string | null;
  };
}

const initialState: CategoryState = {
  selectedCategory: {
    id: null,
    category_name: null,
  },
};

const categorySlice = createSlice({
  name: "category",
  initialState, 
  
  reducers: {
    setSelectedCategory(
      state,
      action: PayloadAction<{ id: number; category_name: string }>
    ) {
      state.selectedCategory = {
        id: action.payload.id,
        category_name: action.payload.category_name,
      };
    },
  },
});

export const { setSelectedCategory } = categorySlice.actions;

export const selectSelectedCategory = (state: { category: CategoryState }) =>
  state.category.selectedCategory;

export default categorySlice.reducer;
