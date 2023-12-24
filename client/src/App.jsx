import "./App.css";
import "react-router-dom";
import _ from "lodash";
import { Routes, Route } from "react-router-dom";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { GetImages, GetRandomPhotos } from "./API/Remote/api.js";

import Images from "./components/Images";
import Navbar from "./components/Navbar";
import RandomPhotos from "./components/RandomPhotos.jsx";
import PhotoPage from "./pages/PhotoPage.jsx";
import Register from "./pages/Register.jsx";

// import state reducers
import { imagesReset, addItems } from "./features/imagesSlice";
import { pageReset, increment, decrement } from "./features/currentPageSlice.js";
import { resetSearchTerm, updateSearchTerm } from "./features/userSearchTermSlice";
import { setLoadingTrue, resetLoading, toggleLoading } from "./features/loadingSlice";
import { urlBaseTrue, urlBaseFalse } from "./features/isUrlBaseSlice.js";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state selectors
  const images = useSelector((state) => state.images.value);
  const currentPage = useSelector((state) => state.currentPage.value);
  const userSearchTerm = useSelector((state) => state.userSearchTerm.value);
  const loading = useSelector((state) => state.loading.value);

  // handle search submission
  const handleSubmit = async (userSearchTerm, currentPage, e) => {
    e.preventDefault();
    dispatch(imagesReset());
    try {
      console.log(userSearchTerm);
      const getImages = await GetImages(userSearchTerm, currentPage);
      if (getImages && getImages.length > 0) {
        dispatch(addItems(getImages));
        navigate(`/s/${userSearchTerm}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle user search input
  const handleInputChange = (e) => {
    const searchTermUpdate = dispatch(updateSearchTerm(e.target.value));
  };

  // get next page of search results
  const getNextPage = async () => {
    console.log("Getting next page... " + currentPage);
    try {
      dispatch(increment());
      const nextPageResults = await GetImages(userSearchTerm, currentPage);
      if (nextPageResults) {
        dispatch(addItems(nextPageResults));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* 
  this prevents images from being rendered below the registration form 
  at "/register". 
*/
  useEffect(() => {
    if (location.pathname === "/register") {
      dispatch(imagesReset());
    }
  }, [location.pathname]);

  // load next page of results only if user scrolls down to a certain point on page
  useEffect(() => {
    if (
      location.pathname !== "/register" &&
      location.pathname !== "/my-profile" &&
      location.pathname !== "/my-account" &&
      location.pathname !== "/settings" &&
      !location.pathname.startsWith("/photo/")
    ) {
      if (loading) return;

      /* 
        lodash's debounce method used to delay getNextPage being called again to prevent requests
        being made while scrollbar moves up after a single page is loaded. Without debounce,
        multiple pages would be called after scrolling beyond the 0.6 (60% down) mark on the page.

        For example, if I am currently 59% down the page and I scroll, the scrollbar might scroll to
        something like 70% down the page and on its way back up after a single request is made, it would
        make other requests for every x miliseconds while scrolling back up as the current location of
        the scrollbar would still be above 0.6(60%).

        By adding a delay, the scrollbar is allowed to move to it's expected location without triggering
        requests to the API.
      */
      const handleScroll = _.debounce(() => {
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (window.scrollY / pageHeight >= 0.6) {
          getNextPage();
        }
      }, 40);

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
        <Route path="/" element={<RandomPhotos />} />
        <Route path="/register" element={<Register />} />
        <Route path="/photo/:id" element={<PhotoPage />} />
      </Routes>
      <Images loading={loading} />
    </div>
  );
}

export default App;
