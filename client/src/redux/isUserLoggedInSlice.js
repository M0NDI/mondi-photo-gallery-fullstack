import { createSlice } from "@reduxjs/toolkit";

export const isUserLoggedInSlice = createSlice({
  name: "isUserLoggedIn",
  initialState: {
    value: false,
  },
  reducers: {
    setLoggedInTrue: (state) => {
      state.value = true;
    },
    setLoggedInFalse: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoggedInTrue, setLoggedInFalse } = isUserLoggedInSlice.actions;

export default isUserLoggedInSlice.reducer;