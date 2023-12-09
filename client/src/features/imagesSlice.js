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
      const items = action.payload
      state.value.push(...items);
    },
  },
});

// Action creators are generated for each case reducer function
export const { imagesReset, addItems } = imagesSlice.actions;

export default imagesSlice.reducer;
