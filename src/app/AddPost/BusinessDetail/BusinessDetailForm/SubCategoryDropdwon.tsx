import { useGetSubCategoriesQuery } from "@/app/storeApp/api/useGetAllSubCategory";
import { useDispatch } from "react-redux";
import { setselectedSubCategory } from "@/app/storeApp/Slice/AddpostSelectedIDandvalues/SubCategorySelectedIdandValues";
import { useAppSelector } from "@/app/hooks/hooks";
import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";

const SubcategoryDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string>(""); // For input value
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // For controlling dropdown visibility
  const [selectedValues, setSelectedValues] = useState<string[]>([]); // Store selected subcategory names

  const category_id = useAppSelector(
    (state) => state.categorySelected.selectedCategory.id
  );
  const subcategory =
    useGetSubCategoriesQuery(
      { category_id: category_id || "" },
      { skip: !category_id }
    ).data?.subCategoryData || [];

  const isDarkMode = useAppSelector((state) => state.darkMode.isDarkMode);

  // Handle category search input change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // Show dropdown on focus
  const handleFocus = () => {
    setShowDropdown(true);
  };

  // Hide dropdown on blur
  const handleBlur = () => {
    setTimeout(() => {
      setShowDropdown(false);
    }, 100);
  };

  // Handle subcategory selection (both single and multiple)
  const handleSelectCategory = (subcategoryName: string) => {
    const newSelectedValues = selectedValues.includes(subcategoryName)
      ? selectedValues.filter((value) => value !== subcategoryName)
      : [...selectedValues, subcategoryName];
    setSelectedValues(newSelectedValues);

    // Dispatch selected subcategories to Redux store
    const selectedSubcategories = subcategory.filter((sub) =>
      newSelectedValues.includes(sub.subcategory_name)
    );
    dispatch(setselectedSubCategory(selectedSubcategories));
  };

  // Filter subcategories based on search input
  const filteredSubcategories = searchValue.trim()
    ? subcategory.filter((sub) =>
        sub.subcategory_name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : subcategory; // Show all if search value is empty

  const [rotate, setRotate] = useState(false); // State to manage icon rotation

  const handleToggle = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
    setRotate((prev) => !prev); // Toggle rotation of the icon
  };

  return (
    <div className="w-full flex flex-col  relative">
      {/* Subcategory Label */}
      <label
        htmlFor="subcategory"
        className={`font-poppins text-sm font-medium ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Subcategory
        <span className="text-[#F21818] pl-[1px]">*</span>
      </label>

      {/* Subcategory Input */}
      <div className="relative mt-2 flex items-center  cursor-pointer" onClick={handleToggle}>
        <input
          type="text"
          id="subcategory"
          name="subcategory"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className={`font-poppins w-full rounded-lg py-4  cursor-pointer pl-4 placeholder-gray-500 focus:border-[#0046AE80] focus:outline-none focus:ring-[#0046AE80] ${
            isDarkMode
              ? "text-white border border-[#FFFFFF0A] bg-[#333333]"
              : "text-black bg-white border border-[#e5e7eb]"
          } ${!category_id ? "bg-gray-300 cursor-not-allowed" : ""}`} // Disable styles when category_id is missing
          placeholder="Search Subcategory"
          value={searchValue}
          onChange={handleCategoryChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={!category_id}
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
      {showDropdown &&
        category_id && ( // Only show dropdown if category_id exists
          <ul
            className="absolute top-[5.9rem] left-0 w-full bg-white rounded-lg shadow-lg max-h-[200px] overflow-y-auto z-10 border border-[#0046AE80] mt-1"
            style={{
              maxHeight: "200px",
              overflowY: "auto",
            }}
          >
            {filteredSubcategories.length > 0 ? (
              filteredSubcategories.map((sub) => (
                <li
                  key={sub.id}
                  className="px-4 py-2 cursor-pointer font-poppins hover:bg-gray-200 text-black"
                  onMouseDown={() => handleSelectCategory(sub.subcategory_name)}
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(sub.subcategory_name)}
                    onChange={() => handleSelectCategory(sub.subcategory_name)}
                    className="mr-3"
                  />
                  {sub.subcategory_name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-center text-gray-500">
                No subcategories found
              </li>
            )}
          </ul>
        )}

      {/* Display Selected Subcategories as Chips */}
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedValues.map((value) => (
          <span
            key={value}
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
              isDarkMode ? "bg-[#555555] text-white" : "bg-[#e5e7eb] text-black"
            }`}
          >
            {value}
            <button
              type="button"
              onClick={() => {
                const newSelectedValues = selectedValues.filter(
                  (item) => item !== value
                );
                setSelectedValues(newSelectedValues);
              }}
              className="ml-2 text-sm font-bold text-gray-600 hover:text-red-500"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryDropdown;
