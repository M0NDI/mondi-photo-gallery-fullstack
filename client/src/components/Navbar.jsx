import "../CSS/Navbar.css";
import Categories from "./Categories";

import profileLogo from "../assets/images/profile.svg";
import mondiLogo from "../assets/images/mondi-logo-text-only.png";
import { NavLink } from "react-router-dom";

import { imagesReset } from "../features/imagesSlice";
import { resetSearchTerm } from "../features/userSearchTermSlice";
import { useDispatch, useSelector } from "react-redux";
import { pageReset } from "../features/currentPageSlice.js";
import { useEffect } from "react";

const Navbar = ({ handleSubmit, handleInputChange }) => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.value);
  const userSearchTerm = useSelector((state) => state.userSearchTerm.value);
  const currentPage = useSelector((state) => state.currentPage.value);

  const resetDataOnLogoClick = () => {
    dispatch(pageReset());
    dispatch(resetSearchTerm());
    dispatch(imagesReset());
    console.log(images);
    console.log(userSearchTerm);
    console.log(currentPage);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg t-flex t-flex-col t-bg-white t-w-full t-z-10">
        <div className="container-fluid t-flex t-justify-evenly">
          <NavLink to={"/"}>
            <img src={mondiLogo} className="t-w-24 t-mr-4" onClick={() => resetDataOnLogoClick()} />
          </NavLink>
          <button
            className="navbar-toggler t-outline group"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="search-form d-flex t-w-full" role="search" onSubmit={handleSubmit}>
              <input
                className="t-w-full t-h-12 t-rounded-3xl t-border-0 t-pl-12 t-pr-12"
                type="search"
                placeholder="Search"
                value={userSearchTerm}
                onChange={handleInputChange}
              />
              <div className="t-h-12 t-w-12 t-flex t-justify-center t-items-center t-ml-4">
                <img src={profileLogo} className="t-h-8 t-cursor-pointer" />
              </div>
            </form>
          </div>
        </div>
        <Categories handleSubmit={handleSubmit} />
      </nav>
    </>
  );
};

export default Navbar;
