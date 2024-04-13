import { createSlice } from "@reduxjs/toolkit";

export const isImageLikedSlice = createSlice({
  name: "isImageLiked",
  initialState: {
    value: false,
  },
  reducers: {
    setImageLikedTrue: (state) => {
      state.value = true;
    },
    setImageLikedFalse: (state) => {
      state.value = false;
    },
  },
});

export const { setImageLikedTrue, setImageLikedFalse } = isImageLikedSlice.actions;

export default isImageLikedSlice.reducer;
