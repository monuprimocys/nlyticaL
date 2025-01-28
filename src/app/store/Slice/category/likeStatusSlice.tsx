import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LikeStatusState {
  [key: string]: number; // Maps service_id to like status (0 or 1)
}

const initialState: LikeStatusState = {};

const likeStatusSlice = createSlice({
  name: "likeStatus",
  initialState,
  reducers: {
    setLikeStatus: (
      state,
      action: PayloadAction<{ service_id: string; likeStatus: number }>
    ) => {
      const { service_id, likeStatus } = action.payload;
      state[service_id] = likeStatus;
    },
  },
});

export const { setLikeStatus } = likeStatusSlice.actions;

export default likeStatusSlice.reducer;
