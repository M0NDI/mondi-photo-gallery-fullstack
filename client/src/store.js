import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

import imagesReducer from "./redux/imagesSlice";
import currentPageReducer from "./redux/currentPageSlice";
import userSearchTermReducer from "./redux/userSearchTermSlice";
import loadingReducer from "./redux/loadingSlice";
import singleImageReducer from "./redux/singleImageSlice";
import isUserLoggedInReducer from "./redux/isUserLoggedInSlice";
import isImageLikedSlice from "./redux/isImageLikedSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["images", "currentPage", "userSearchTerm", "loading", "singleImage"],
};

const rootReducer = combineReducers({
  images: imagesReducer,
  currentPage: currentPageReducer,
  userSearchTerm: userSearchTermReducer,
  loading: loadingReducer,
  singleImage: singleImageReducer,
  isUserLoggedIn: isUserLoggedInReducer,
  isImageLiked: isImageLikedSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
