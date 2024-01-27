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
      // Update the state with the new items
      state.value.push(...action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { imagesReset, addItems } = searchedImagesSlice.actions;

export default searchedImagesSlice.reducer;