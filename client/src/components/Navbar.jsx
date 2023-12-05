import "../CSS/Navbar.css";
import { NavLink } from "react-router-dom";
import profileLogo from "../assets/images/profile.svg";
import mondiLogo from "../assets/images/mondi-logo-text-only.png";

const Navbar = ({ handleSubmit, handleInputChange }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg t-justify-evenly t-bg-zinc-300 t-w-full t-z-50">
        <div className="container-fluid">
          <img src={mondiLogo} className="t-w-24 t-mr-4" />
          <button
            className="navbar-toggler t-outline group hover:t-outline-red-500"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="search-form d-flex t-w-full t-h-full" role="search" onSubmit={handleSubmit}>
              <input
                className="t-w-full t-rounded-3xl t-border-0 t-pl-12 t-pr-12"
                type="search"
                placeholder="Search"
                onChange={handleInputChange}
              />
              <div className="t-h-full t-w-12 t-flex t-justify-center t-items-center t-ml-4">
                <img src={profileLogo} className="t-h-8 t-cursor-pointer" />
              </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
