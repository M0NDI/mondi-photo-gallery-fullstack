import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    value: false,
  },
  reducers: {
    setLoadingTrue: (state) => {
      state.value = true
    },
    resetLoading: (state) => {
      state.value = false;
    },
    toggleLoading: (state) => {
      state.value = !state.value
    }
  },
});

export const { setLoadingTrue, resetLoading, toggleLoading } = loadingSlice.actions;

export default loadingSlice.reducer;