import { createSlice } from "@reduxjs/toolkit";

export const isUserLoggedInSlice = createSlice({
  name: "isUserLoggedIn",
  initialState: {
    value: false,
  },
  reducers: {
    setFalse: (state) => {
      state.value = false;
    },
    setTrue: (state) => {
      state.value = true;
    },
    toggleLoggedIn: (state) => {
      state.value = !state.value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFalse, setTrue, toggleLoggedIn } = isUserLoggedInSlice.actions;

export default isUserLoggedInSlice.reducer;
