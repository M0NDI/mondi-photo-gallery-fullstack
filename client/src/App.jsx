import "./App.css";
import "react-router-dom";
import Images from "./components/Images";
import Navbar from "./components/Navbar";
import GetImages from "./API/Remote/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { imagesReset, addItems } from "./features/imagesSlice";
import { pageReset, increment, decrement } from "./features/currentPageSlice";
import { resetSearchTerm, updateSearchTerm } from "./features/userSearchTermSlice";
import { resetLoading, toggleLoading } from "./features/loadingSlice";

function App() {
  const navigate = useNavigate();

  // states
  const images = useSelector((state) => state.images.value);
  const currentPage = useSelector((state) => state.currentPage.value);
  const userSearchTerm = useSelector((state) => state.userSearchTerm.value);
  const loading = useSelector((state) => {state.loading.value})

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(imagesReset());
    try {
      const getImages = await GetImages(userSearchTerm);
      navigate(`/s/${userSearchTerm}`);
      if (getImages) {
        dispatch(addItems(getImages));
        console.log(images);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  const handleInputChange = (e) => {
    dispatch(updateSearchTerm(e.target.value));
    console.log(e.target.value);
  };

  const getNextPage = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const nextPageResults = await GetImages(userSearchTerm, currentPage);

      if (nextPageResults.length > 0) {
        // Add next page results to images state array
        dispatch(addItems(nextPageResults));
        // Increment currentPage state by 1
        dispatch(increment());
        console.log(images);
      }
    } catch (error) {
      console.error("Error fetching next page:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY / pageHeight >= 0.75) {
        getNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, loading]);

  return (
    <div className="app t-bg-zinc-200">
      <Navbar
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        userSearchTerm={userSearchTerm}
      />
      <Images loading={loading} />
    </div>
  );
}

export default App;
