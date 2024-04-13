import { createSlice } from "@reduxjs/toolkit";

export const searchTermSlice = createSlice({
  name: "userSearchTerm",
  initialState: {
    value: "",
  },
  reducers: {
    resetSearchTerm: (state) => {
      state.value = "";
    },
    updateSearchTerm: (state, action) => {
      state.value = action.payload
    },
  },
});

export const { resetSearchTerm, updateSearchTerm } = searchTermSlice.actions;

export default searchTermSlice.reducer;
