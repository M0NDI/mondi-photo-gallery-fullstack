import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./redux/imagesSlice";
import currentPageReducer from "./redux/currentPageSlice";
import userSearchTermReducer from "./redux/userSearchTermSlice";
import loadingReducer from "./redux/loadingSlice";
import urlBaseReducer from "./redux/isUrlBaseSlice";
import singleImageReducer from "./redux/singleImageSlice";
import userTokenReducer from "./redux/userTokenSlice";

const store = configureStore({
  reducer: {
    images: imagesReducer,
    currentPage: currentPageReducer,
    userSearchTerm: userSearchTermReducer,
    loading: loadingReducer,
    urlBase: urlBaseReducer,
    singleImage: singleImageReducer,
    userToken: userTokenReducer,
  },
});

export default store;
