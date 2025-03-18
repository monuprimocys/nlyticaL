import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";

interface MonthYearState {
  monthValue: string | null; // ✅ Store as a string
  yearValue: string | null; // ✅ Store as a string
}

const initialState: MonthYearState = {
  monthValue: dayjs("2025-01-01").toISOString(), // ✅ Convert to string
  yearValue: dayjs("2025-01-01").toISOString(), // ✅ Convert to string
};

const monthYearSlice = createSlice({
  name: "monthYear",
  initialState,
  reducers: {
    setMonthValue: (state, action: PayloadAction<string | null>) => {
      state.monthValue = action.payload;
    },
    setYearValue: (state, action: PayloadAction<string | null>) => {
      state.yearValue = action.payload;
    },
  },
});

export const { setMonthValue, setYearValue } = monthYearSlice.actions;

export default monthYearSlice.reducer;
