import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./features/imagesSlice";
import currentPageReducer from "./features/currentPageSlice";
import userSearchTermReducer from "./features/userSearchTermSlice";
import loadingReducer from "./features/loadingSlice";
import urlBaseReducer from "./features/isUrlBaseSlice";
import singleImageReducer from './features/singleImageSlice'

const store = configureStore({
  reducer: {
    images: imagesReducer,
    currentPage: currentPageReducer,
    userSearchTerm: userSearchTermReducer,
    loading: loadingReducer,
    urlBase: urlBaseReducer,
    singleImage: singleImageReducer,
  },
});

export default store;
