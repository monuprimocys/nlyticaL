"use client";

import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useAppSelector } from "@/app/hooks/hooks";
import { useGetSubCategoriesQuery } from "@/app/store/api/useGetAllSubCategory";
import { setselectedSubCategory } from "@/app/store/Slice/AddpostSelectedIDandvalues/SubCategorySelectedIdandValues";
import { useDispatch } from "react-redux";

export default function SelectLabels() {
  const dispatch = useDispatch();
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const category_id = useAppSelector(
    (state) => state.categorySelected.selectedCategory.id
  );

  const selectedSubcategorysliceValues = useAppSelector(
    (state) => state.subCategorySelected.selectedSubCategory
  );

  console.log(
    "My selected subcategory from Redux",
    selectedSubcategorysliceValues
  );

  // Fetch subcategories if category_id exists
  const { data } = useGetSubCategoriesQuery(
    { category_id: category_id || "" },
    { skip: !category_id } // Skip API call if no category_id
  );

  const subcategory = data?.subCategoryData;

  console.log("API Response: ", data);

  // Handle selection change (both single and multiple)
  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event;

    // Update selected values
    const newSelectedValues =
      typeof value === "string" ? value.split(",") : value;
    setSelectedValues(newSelectedValues);

    // Dispatch selected subcategories to Redux store
    const selectedSubcategories = subcategory?.filter((sub) =>
      newSelectedValues.includes(sub.subcategory_name)
    );

    if (selectedSubcategories) {
      const subcategoryPayload = selectedSubcategories.map((sub) => ({
        id: sub.id,
        subcategory_name: sub.subcategory_name,
      }));

      // Dispatch the action to update the selected subcategory in the Redux store
      dispatch(setselectedSubCategory(subcategoryPayload));
    }
  };

  // Handle individual checkbox toggle
  const handleCheckboxChange = (subcategoryName: string) => {
    const newSelectedValues = selectedValues.includes(subcategoryName)
      ? selectedValues.filter((value) => value !== subcategoryName)
      : [...selectedValues, subcategoryName];

    setSelectedValues(newSelectedValues);

    // Update Redux store with the new selected subcategories
    const selectedSubcategories = subcategory?.filter((sub) =>
      newSelectedValues.includes(sub.subcategory_name)
    );

    if (selectedSubcategories) {
      const subcategoryPayload = selectedSubcategories.map((sub) => ({
        id: sub.id,
        subcategory_name: sub.subcategory_name,
      }));

      dispatch(setselectedSubCategory(subcategoryPayload));
    }
  };

  // Handle deletion of selected values (removing subcategories from selection)
  const handleDelete = (value: string) => {
    const newSelectedValues = selectedValues.filter((item) => item !== value);
    setSelectedValues(newSelectedValues);

    // If a subcategory is deleted, update the Redux store with the new selection
    const selectedSubcategories = subcategory?.filter((sub) =>
      newSelectedValues.includes(sub.subcategory_name)
    );

    if (selectedSubcategories) {
      const subcategoryPayload = selectedSubcategories.map((sub) => ({
        id: sub.id,
        subcategory_name: sub.subcategory_name,
      }));

      dispatch(setselectedSubCategory(subcategoryPayload));
    }
  };

  return (
    <div className="w-full overflow-hidden   ">
      {/* Subcategory label */}
      <label
        htmlFor="location"
        className="font-poppins mb-3 block text-sm font-medium capitalize text-black"
      >
        Sub Category
        <span className=" text-[#F21818] pl-[1px]">*</span>
      </label>
      <FormControl
        style={{
          width: "100%",
        }}
      >
        <Select
          multiple
          value={selectedValues}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          disabled={!category_id} // Disable dropdown if category_id doesn't exist
        >
          {/* Render options only if subcategory data is available */}
          {subcategory?.map((sub) => (
            <MenuItem
              key={sub.id}
              value={sub.subcategory_name}
              className="!flex !gap-2"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(sub.subcategory_name)}
                onChange={() => handleCheckboxChange(sub.subcategory_name)} // Handle checkbox toggle
                disabled={!category_id}
              />
              {sub.subcategory_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={{ mt: 2 }}>
        {selectedValues.map((value) => (
          <Chip
            key={value}
            label={value}
            onDelete={() => handleDelete(value)}
            sx={{ margin: 0.5 }}
          />
        ))}
      </Box>

      {/* Display a message if category_id doesn't exist */}
      {!category_id && (
        <Box sx={{ mt: 2, color: "gray",  }}>
          Please select a category to see subcategories.
        </Box>
      )}
    </div>
  );
}
