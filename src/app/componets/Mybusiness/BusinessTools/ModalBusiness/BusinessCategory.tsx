"use client";
import { useGetCategoriesQuery } from "@/app/store/api/useGetCategory";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";

// Import Material-UI components
import { FormControl, Select, MenuItem, FormHelperText } from "@mui/material";
import { updateServiceField } from "@/app/store/Slice/serviceSlice";

interface CategoryDropdownProps {
  required?: boolean;
}

const BusinessCategory: React.FC<CategoryDropdownProps> = ({ required }) => {
  const storevalues = useAppSelector(
    (state) => state.service.service.category_id
  );

  const { data } = useGetCategoriesQuery();
  const category = data?.data || [];
  const dispatch = useDispatch();

  // Handle category selection
  const handleCategoryChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedId = e.target.value as number;

    console.log(" my category id 12212121212", selectedId);

    // Dispatch only category_id to update in store
    dispatch(
      updateServiceField({
        category_id: selectedId,
      })
    );
  };

  // Find the category name of the selected category from the list
  const selectedCategoryName = category.find((cat) => cat.id === storevalues)
    ? category.find((cat) => cat.id === storevalues)?.category_name
    : "Select Category"; // Default text if no category is selected

  return (
    <div className="w-full h-auto">
      {/* Label category */}
      <label
        htmlFor="location"
        className="font-poppins mb-3 block text-sm font-medium capitalize text-black"
      >
        Category
        <span className=" text-[#F21818] pl-[1px]">*</span>
      </label>
      <FormControl
        style={{
          width: "100%",
        }}
      >
        <Select
          labelId="category-label"
          id="category-select"
          value={storevalues || ""} // Set the value based on category_id from Redux store
          onChange={handleCategoryChange}
          displayEmpty
        >
          {/* Display selected category name or placeholder */}
          <MenuItem value="" disabled>
            {selectedCategoryName} {/* Display the selected category name */}
          </MenuItem>
          {category && category.length > 0 ? (
            category.map((categoryItem) => (
              <MenuItem key={categoryItem.id} value={categoryItem.id}>
                {categoryItem.category_name}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No Category available</MenuItem>
          )}
        </Select>
        {required && !storevalues && (
          <FormHelperText>Category is required</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default BusinessCategory;
