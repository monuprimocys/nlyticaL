import { useGetCategoriesQuery } from "@/app/storeApp/api/useGetCategory";
import { useDispatch } from "react-redux";
import { setSelectedCategory } from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/CategorySelectedIDandValues";
import { useAppSelector } from "@/app/hooks/hooks";
import { useState } from "react";
import {
  MdOutlineArrowDropDown,
  MdOutlineCheck,
  MdOutlineChevronRight,
} from "react-icons/md";

interface CategoryDropdownProps {
  required?: boolean;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = () => {
  const { data } = useGetCategoriesQuery();
  const category = data?.data || [];
  const dispatch = useDispatch();

  const category12 = useAppSelector((state) => {
    return state.category;
  });

  console.log(" my slice values category", category12.selectedCategory);

  const [searchValue, setSearchValue] = useState<string>(""); // The value in the search input
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // Control dropdown visibility

  // Handle category selection from the dropdown
  const handleSelectCategory = (categoryName: string, categoryId: number) => {
    setSearchValue(categoryName); // Set the selected category name in input
    dispatch(
      setSelectedCategory({ category_name: categoryName, id: categoryId })
    ); // Update Redux store
    setShowDropdown(false); // Close the dropdown
  };

  // Handle input change (for filtering categories based on search)
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value); // Update the search input
  };

  // Show the dropdown when input is focused
  const handleFocus = () => {
    setShowDropdown(true); // Show dropdown on focus
  };

  // Hide the dropdown when input loses focus
  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false); // Hide dropdown after a short delay
    }, 100);
  };

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Filter categories based on the searchValue
  const filteredCategories = searchValue.trim()
    ? category.filter((cat) =>
        cat.category_name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : category; // Show all categories if the search value is empty

  console.log(" my filteredCategories", filteredCategories);
  console.log(" my category", category);
  const [rotate, setRotate] = useState(false); // State to manage icon rotation

  const handleToggle = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
    setRotate((prev) => !prev); // Toggle rotation of the icon
  };

  return (
    <div className="w-full flex flex-col relative h-full">
      {/* Label category */}
      <label
        htmlFor="category"
        className={`font-poppins text-sm font-medium ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Category
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>

      <div
        className="relative mt-2 flex items-center cursor-pointer"
        onClick={handleToggle}
      >
        <input
          type="text"
          id="category"
          name="category"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className={`font-poppins w-full font-normal  cursor-pointer rounded-lg py-4 pl-4 placeholder-gray-500 focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80] ${
            isDarkMode
              ? "text-white border border-[#FFFFFF0A] bg-[#FFFFFF0A]"
              : "text-black bg-white border border-[#e5e7eb]"
          }`}
          placeholder="Search Category"
          value={searchValue} // Bind search value to input
          onChange={handleCategoryChange} // Handle input change
          onFocus={handleFocus} // Show dropdown on focus
          onBlur={handleBlur} // Hide dropdown on blur
        />

        <div
          className={`absolute right-2 text-xl cursor-pointer transition-transform ${
            rotate ? "transform rotate-90" : "transform -rotate-90" // Apply rotation when `rotate` is true
          }`}
          onClick={handleToggle}
        >
          <MdOutlineChevronRight className="text-xl" />
        </div>
      </div>

      {/* Custom Dropdown */}
      {showDropdown && (
        <ul
          className="absolute top-[5.9rem] left-0 w-full bg-white rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10 border border-[#0046AE80] mt-1"
          style={{
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {/* Check if any category matches the search value */}
          {filteredCategories.length > 0 ? (
            filteredCategories.map((categoryItem) => (
              <li
                key={categoryItem.id}
                className="px-4 py-2 cursor-pointer font-poppins hover:bg-gray-200 text-black flex justify-between items-center"
                onMouseDown={() =>
                  handleSelectCategory(
                    categoryItem.category_name,
                    categoryItem.id
                  )
                }
              >
                {categoryItem.category_name}
                {category12.selectedCategory?.id === categoryItem.id && (
                  <MdOutlineCheck className="text-[#0046AE] text-lg" />
                )}
              </li>
            ))
          ) : (
            // If no categories match the search value, show a "No categories found" message
            <li className="px-4 py-2 font-poppins text-center text-gray-500">
              No categories found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CategoryDropdown;
