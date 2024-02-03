import "./App.css";
import "react-router-dom";
import _ from "lodash";
import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getImages } from "./API/Remote/api.js";
import { logoutUser, showCurrentUser } from "./API/Backend/api.js";

import Images from "./components/Images.jsx";
import Navbar from "./components/Navbar";
import HomeRandomPhotos from "./components/HomeRandomPhotos.jsx";
import PhotoPage from "./pages/PhotoPage.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import MyLikedPhotos from "./pages/MyLikedPhotos.jsx";
import UserAccountSettings from "./pages/UserAccountSettings.jsx";

// import state reducers
import { imagesReset, addItems } from "./redux/imagesSlice";
import { increment } from "./redux/currentPageSlice.js";
import { updateSearchTerm } from "./redux/userSearchTermSlice";
import { setLoggedInFalse } from "./redux/isUserLoggedInSlice.js";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state selectors
  const currentPage = useSelector((state) => state.currentPage.value);
  const userSearchTerm = useSelector((state) => state.userSearchTerm.value);
  const loading = useSelector((state) => state.loading.value);

  // handle search submission
  const handleSubmit = async (userSearchTerm, currentPage, e) => {
    e.preventDefault();
    dispatch(imagesReset());
    try {
      const fetchImages = await getImages(userSearchTerm, currentPage);
      if (fetchImages && fetchImages.length > 0) {
        dispatch(addItems(fetchImages));
        navigate(`/c/${userSearchTerm}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // to be called on page refresh to clear expired cookies
  const clearCookie = async () => {
    await logoutUser();
  };

  // handle user search input
  const handleInputChange = (e) => {
    dispatch(updateSearchTerm(e.target.value));
  };

  // get next page of search results
  const getNextPage = async () => {
    try {
      dispatch(increment());
      const nextPageResults = await getImages(userSearchTerm, currentPage);
      if (nextPageResults) {
        dispatch(addItems(nextPageResults));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await showCurrentUser();
      if (!currentUser) {
        dispatch(setLoggedInFalse());
        await clearCookie(); // clear expired cookies in browser if user no longer logged in
      }
    };
    fetchCurrentUser();
  }, [location.pathname]);

  /* 
    this prevents images from being rendered below the registration form 
    at "/register". 
  */
  useEffect(() => {
    if (location.pathname === "/register") {
      dispatch(imagesReset());
    }
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  // load next page of results only if user scrolls down to a certain point on page
  useEffect(() => {
    if (
      location.pathname !== "/register" &&
      location.pathname !== "/my-profile" &&
      location.pathname !== "/my-liked-photos" &&
      location.pathname !== "/settings" &&
      !location.pathname.startsWith("/photo/")
    ) {
      /* 
        "if (loading) return;" and lodash's debounce method used to delay getNextPage being called again to prevent requests
        being made while scrollbar moves up after a single page is loaded. Without debounce,
        multiple pages would be called after scrolling beyond the 0.6 (60% down) mark on the page.

        For example, if I am currently 59% down the page and I scroll, the scrollbar might scroll to
        something like 70% down the page and on its way back up after a single request is made, it would
        make other requests for every x miliseconds while scrolling back up as the current location of
        the scrollbar would still be above 0.6(60%).

        By adding a delay, the scrollbar is allowed to move to it's expected location without triggering
        requests to the API.
      */
      if (loading) return;
      const handleScroll = _.debounce(() => {
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY / pageHeight >= 0.6) {
          getNextPage();
        }
      }, 150);

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [location.pathname, currentPage, loading]);

  return (
    <div className="app t-h-screen">
      <Navbar handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
      <Routes>
        <Route path="/" element={<HomeRandomPhotos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-liked-photos" element={<MyLikedPhotos />} />
        <Route path="/account-settings" element={<UserAccountSettings />} />
        <Route path="/photo/:id" element={<PhotoPage />} />
        <Route path="/c/:searchTerm" element={<Images />} />
      </Routes>
    </div>
  );
}

export default App;