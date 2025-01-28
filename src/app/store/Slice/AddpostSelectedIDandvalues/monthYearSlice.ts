import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

interface MonthYearState {
  monthValue: Dayjs | null;
  yearValue: Dayjs | null;
}

const initialState: MonthYearState = {
  monthValue: dayjs("2025-01-1"),
  yearValue: dayjs("2025-01-01"),
};

const monthYearSlice = createSlice({
  name: "monthYear",
  initialState,
  reducers: {
    setMonthValue: (state, action: PayloadAction<Dayjs | null>) => {
      state.monthValue = action.payload;
    },
    setYearValue: (state, action: PayloadAction<Dayjs | null>) => {
      state.yearValue = action.payload;
    },
  },
});

export const { setMonthValue, setYearValue } = monthYearSlice.actions;

export default monthYearSlice.reducer;
