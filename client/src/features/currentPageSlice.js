import { createSlice } from "@reduxjs/toolkit";

export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState: {
    value: 2,
  },
  reducers: {
    pageReset: (state) => {
      state.value = 2;
    },
    increment: (state) => {
      state.value++;
    },
    decrement: (state) => {
      state.value--;
    },
  },
});

// Action creators are generated for each case reducer function
export const { pageReset, increment, decrement } = currentPageSlice.actions;

export default currentPageSlice.reducer;