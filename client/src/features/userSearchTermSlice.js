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
      console.log(action.payload)
    },
  },
});

// Action creators are generated for each case reducer function
export const { resetSearchTerm, updateSearchTerm } = searchTermSlice.actions;

export default searchTermSlice.reducer;
