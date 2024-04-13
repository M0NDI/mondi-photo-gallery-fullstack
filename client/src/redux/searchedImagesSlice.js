import { createSlice } from "@reduxjs/toolkit";

export const searchedImagesSlice = createSlice({
  name: "searchedImages",
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

export const { imagesReset, addItems } = searchedImagesSlice.actions;

export default searchedImagesSlice.reducer;