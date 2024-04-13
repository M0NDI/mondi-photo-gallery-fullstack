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

export const { setLoggedInTrue, setLoggedInFalse } = isUserLoggedInSlice.actions;

export default isUserLoggedInSlice.reducer;