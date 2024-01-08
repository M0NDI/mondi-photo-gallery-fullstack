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
      // Update the state with the new items
      state.value.push(...action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { imagesReset, addItems } = imagesSlice.actions;

export default imagesSlice.reducer;