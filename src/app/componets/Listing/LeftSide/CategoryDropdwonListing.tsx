import { useGetCategoriesQuery } from "@/app/store/api/useGetCategory";
import { useDispatch } from "react-redux";
import dropdown from "../../../../../public/assets/Image/lisdtingcategory.png";
import Image from "next/image";
import { useAppSelector } from "@/app/hooks/hooks";
import { setSelectedCategoryListing } from "@/app/store/Slice/Listing/CategoryLIstingSlice";
import {
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon for cross button
import "../../Listing/style.css";

interface CategoryDropdwonListingProps {
  required?: boolean;
}

const CategoryDropdwonListing: React.FC<
  CategoryDropdwonListingProps
> = ({}) => {
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
      dispatch(setSelectedCategoryListing(selectedCategory));
    }
  };

  // Clear the selected category
  const handleClearCategory = () => {
    dispatch(setSelectedCategoryListing({ id: null, category_name: "" }));
  };

  const selectedCategory = useAppSelector(
    (state) => state.categoryListing.selectedCategoryListing.id
  );

  return (
    <div className="w-full mx-auto mt-6 rounded-xl">
      <div className="relative w-full rounded-full">
        {/* Material-UI Select with custom icon on the left */}
        <FormControl className="rounded-xl w-full">
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory || ""}
            onChange={handleCategoryChange}
            className={`pl-10  bordercolor ${
              selectedCategory
                ? "hide-select-icon text-gray-700 bg-slate-300"
                : "  !text-gray-500" // If no category is selected, apply opacity
            }`} // Conditionally apply opacity class
            displayEmpty
            startAdornment={
              <InputAdornment position="start">
                <Image
                  src={dropdown}
                  alt="Dropdown Icon"
                  className="h-5 w-6 opacity-[50%]"
                />
              </InputAdornment>
            }
            endAdornment={
              selectedCategory ? (
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
            <MenuItem value="" disabled className="placholdercolordropdown">
              Search Categories
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
        </FormControl>
      </div>
    </div>
  );
};

export default CategoryDropdwonListing;
