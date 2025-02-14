import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for the selected SubCategory
interface SubCategoryState {
  selectedSubCategory: {
    id: number | null;
    subcategory_name: string | null;
  };
}

const initialState: SubCategoryState = {
  selectedSubCategory: {
    id: sessionStorage.getItem("subid")
      ? Number(sessionStorage.getItem("subid"))
      : null,
    subcategory_name: sessionStorage.getItem("subcategory_name") || null,
  },
};

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,

  reducers: {
    setselectedSubCategory(
      state,
      action: PayloadAction<{ id: number; subcategory_name: string }>
    ) {
      state.selectedSubCategory = {
        id: action.payload.id,
        subcategory_name: action.payload.subcategory_name,
      };
    },
  },
});

export const { setselectedSubCategory } = subcategorySlice.actions;

export const selectselectedSubCategory = (state: {
  category: SubCategoryState;
}) => state.category.selectedSubCategory;

export default subcategorySlice.reducer;
