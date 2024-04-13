import { createSlice } from "@reduxjs/toolkit";

export const singleImageSlice = createSlice({
  name: "image",
  initialState: {
    value: [],
  },
  reducers: {
    imageReset: (state) => {
      state.value = [];
    },
    addItem: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { imageReset, addItem } = singleImageSlice.actions;

export default singleImageSlice.reducer;
