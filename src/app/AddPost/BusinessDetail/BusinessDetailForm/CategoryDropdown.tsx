"use client";
import { useGetCategoriesQuery } from "@/app/store/api/useGetCategory";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "@/app/store/Slice/AddpostSelectedIDandvalues/CategorySelectedIDandValues";
import { useAppSelector } from "@/app/hooks/hooks";

// Import Material-UI components
import { FormControl, Select, MenuItem, FormHelperText } from "@mui/material";

interface CategoryDropdownProps {
  required?: boolean;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ required }) => {
  const { data } = useGetCategoriesQuery();
  const category = data?.data || [];
  const dispatch = useDispatch();

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selectedCategory = category.find(
      (cat) => cat.id === parseInt(selectedId)
    );

    if (selectedCategory) {
      dispatch(setSelectedCategory(selectedCategory));
    }
  };

  const selectedvalues = useAppSelector((state) => state.categorySelected);

  console.log("1212121212121212121221", selectedvalues);

  // Determine the display name for the selected category
  const selectedCategoryName =
    selectedvalues.selectedCategory.category_name || " Category";

  console.log(" my category name  121212121212", selectedCategoryName);
  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  return (
    <div className="w-full">
      {/* Label category */}
      <label
        htmlFor="location"
        className={`font-poppins mb-3 block text-sm font-medium capitalize ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Category
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>
      <FormControl
        style={{
          width: "100%",
          backgroundColor: isDarkMode ? "#333" : "#fff", // Change background color based on mode
          color: isDarkMode ? "#FFFFFF" : "#000", // Change text color based on mode
        }}
      >
        <Select
          labelId="category-label"
          id="category-select"
          value={selectedvalues?.id || ""}
          onChange={handleCategoryChange}
          displayEmpty
          className={
            isDarkMode ? "bg-dark-600 text-white" : "bg-light-200 text-black"
          } // Conditional styling for select
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
        {required && !selectedvalues?.id && (
          <FormHelperText
            className={isDarkMode ? "text-white" : "text-black"} // Conditional text color
          >
            Category is required
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
};

export default CategoryDropdown;
