import { createSlice } from "@reduxjs/toolkit";

export const userTokenSlice = createSlice({
  name: "userToken",
  initialState: {
    value: null,
  },
  reducers: {
    setUserToken: (state, action) => {
      state.value = action.payload;
    },
    resetUserToken: (state) => {
      console.log(state.value)
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserToken, resetUserToken } = userTokenSlice.actions;

export default userTokenSlice.reducer;