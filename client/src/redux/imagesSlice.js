import { createSlice } from "@reduxjs/toolkit";

export const imagesSlice = createSlice({
  name: "images",
  initialState: {
    value: [],
  },
  reducers: {
    imagesReset: (state) => {
      state.value = [];
    },
    addItems: (state, action) => {
      state.value.push(...action.payload);
    },
  },
});

export const { imagesReset, addItems } = imagesSlice.actions;

export default imagesSlice.reducer;