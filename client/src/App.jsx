import "./App.css";
import "react-router-dom";
import _ from "lodash";
import Images from "./components/Images";
import Navbar from "./components/Navbar";
import GetImages from "./API/Remote/api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import state reducers
import { imagesReset, addItems } from "./features/imagesSlice";
import { pageReset, increment, decrement } from "./features/currentPageSlice.js";
import { resetSearchTerm, updateSearchTerm } from "./features/userSearchTermSlice";
import { setLoadingTrue, resetLoading, toggleLoading } from "./features/loadingSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state selectors
  const images = useSelector((state) => state.images.value);
  const currentPage = useSelector((state) => state.currentPage.value);
  const userSearchTerm = useSelector((state) => state.userSearchTerm.value);
  const loading = useSelector((state) => state.loading.value);

  // handle search submission
  const handleSubmit = async (newSearchTerm, currentPage, e) => {
    e.preventDefault();
    dispatch(imagesReset());
    try {
      console.log(newSearchTerm)
      const getImages = await GetImages(newSearchTerm, currentPage);
      if (getImages && getImages.length > 0) {
        dispatch(addItems(getImages));
        navigate(`/s/${newSearchTerm}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle user search input
  const handleInputChange = async (e) => {
    const searchTermUpdate = dispatch(updateSearchTerm(e.target.value));
    console.log(searchTermUpdate);
  };

  // get next page of search results
  const getNextPage = async () => {
    console.log("Getting next page... " + currentPage);
    try {
      const nextPageResults = await GetImages(userSearchTerm, currentPage);
      if (nextPageResults) {
        dispatch(addItems(nextPageResults));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // load next page of results only if user scrolls down to a certain point on page
  useEffect(() => {
    if (loading) return;

    const handleScroll = _.debounce(() => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY / pageHeight >= 0.75) {
        getNextPage();
        dispatch(increment());
      }
    }, 20); // Adjust the debounce delay as needed

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, loading]);

  useEffect(() => {
    dispatch(pageReset());
    dispatch(imagesReset());
  }, [userSearchTerm]);

  return (
    <div className="app t-bg-zinc-200">
      <Navbar handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
      <Images loading={loading} />
    </div>
  );
}

export default App;
