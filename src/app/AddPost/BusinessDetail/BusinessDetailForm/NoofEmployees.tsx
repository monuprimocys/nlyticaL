"use client";
import { updateAddPostData } from "@/app/store/Slice/AddPostSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks/hooks";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import "./BusinessDertail.css";

export default function NoofEmployees() {
  // Static data for number of employees, with modified values
  const employeeRanges = [
    { label: "Less than 10", value: "Less than 10" },
    { label: "20-30", value: "20-30" },
    { label: "30-40", value: "30-40" },
    { label: "40-50", value: "40-50" },
    { label: "More than 10000", value: "More than 10000" },
  ];

  const dispatch = useDispatch(); // Initialize dispatch

  // Handle select change
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    dispatch(updateAddPostData({ employee_strength: selectedValue })); // Update the Redux state
  };

  // Get the selected value from Redux store
  const selectedvalues = useAppSelector(
    (state) => state.AddPost.employee_strength
  );

  console.log("my select change event employee", selectedvalues);

  return (
    <div className="w-full  mt-[3rem]  b">
      <label
        htmlFor="location"
        className="font-poppins mb-3 block text-sm font-medium capitalize text-black"
      >
        Number of Employees
      </label>
      <FormControl style={{ width: "100%" }}>
        <Select
          labelId="employee-select-label"
          id="employee-select"
          value={selectedvalues} // Ensure default is empty string if no value
          onChange={handleSelectChange}
          className="font-poppins"
          displayEmpty
        >
          {/* Display selected employeeRanges name or placeholder */}
          <MenuItem value="" disabled className=" font-poppins text-sm    ">
            Select employee range
          </MenuItem>
          {employeeRanges.map((range) => (
            <MenuItem key={range.value} value={range.value}>
              {range.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
