"use client";
import { useDispatch } from "react-redux";
import dropdown from "../../../../../public/assets/Image/subcategorylisting.png";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { useGetSubCategoriesQuery } from "@/app/store/api/useGetAllSubCategory";
import { setselectedSubCategoryListing } from "@/app/store/Slice/Listing/SubCategoryListing";
import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon for cross button

const SubCategoryListingDropdown = () => {
  const category_id = useAppSelector(
    (state) => state.categoryListing.selectedCategoryListing.id
  );
  const { data, isLoading } = useGetSubCategoriesQuery({
    category_id: category_id || "",
  });
  const subcategory = data?.subCategoryData;

  const dispatch = useDispatch();

  const handleSubCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selectedCategory = subcategory?.find(
      (cat) => cat.id === parseInt(selectedId)
    );

    if (selectedCategory) {
      dispatch(setselectedSubCategoryListing(selectedCategory));
    }
  };

  const subcategoryvalues = useAppSelector(
    (state) =>
      state.SubCategoryListing.selectedSubCategoryListing.subcategory_name
  );

  const isCategoryValid = category_id != null;

  const handleClearCategory = () => {
    dispatch(setselectedSubCategoryListing({ id: null, subcategory_name: "" }));
  };

  return (
    <div className="w-full mx-auto rounded-xl  ">
      <FormControl fullWidth variant="outlined" disabled={!isCategoryValid}>
        {/* Select with custom dropdown icon */}
        <Select
          id="subcategory-select"
          value={subcategoryvalues || ""}
          onChange={handleSubCategoryChange}
          className={`text-gray-700 pl-10 ${
            subcategoryvalues ? "hide-select-icon bg-slate-300" : ""
          }`} // Conditionally apply hide-select-icon
          displayEmpty
          renderValue={(value) => (value ? value : "Search Subcategories")}
          startAdornment={
            <InputAdornment position="start">
              <Image src={dropdown} alt="Dropdown Icon" className="h-5 w-6 " />
            </InputAdornment>
          }
          endAdornment={
            subcategoryvalues ? (
              <InputAdornment position="end">
                <IconButton onClick={handleClearCategory} edge="end">
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : (
              <InputAdornment position="end"></InputAdornment>
            )
          }
        >
          <MenuItem value="" disabled>
            Search Subcategories 
          </MenuItem>
          {subcategory && subcategory.length > 0 ? (
            subcategory.map((subcategory) => (
              <MenuItem key={subcategory.id} value={subcategory.id}>
                {subcategory.subcategory_name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No SubCategory available</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default SubCategoryListingDropdown;
