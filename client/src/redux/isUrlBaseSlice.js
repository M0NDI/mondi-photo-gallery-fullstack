import { createSlice } from "@reduxjs/toolkit";

export const isUrlBaseSlice = createSlice({
  name: "urlBase",
  initialState: {
    value: true,
  },
  reducers: {
    urlBaseTrue: (state) => {
      state.value = true;
    },
    urlBaseFalse: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { urlBaseTrue, urlBaseFalse } = isUrlBaseSlice.actions;

export default isUrlBaseSlice.reducer;