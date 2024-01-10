import "../CSS/Navbar.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Categories from "./Categories";
import MyAccount from "./MyAccount.jsx";

import mondiLogo from "../assets/images/logos/mondi-logo-text-only.png";
import { Link, NavLink } from "react-router-dom";

// redux imports
import { useDispatch, useSelector } from "react-redux";

// redux states
import { imagesReset } from "../redux/imagesSlice.js";
import { resetSearchTerm } from "../redux/userSearchTermSlice.js";
import { pageReset } from "../redux/currentPageSlice.js";
import { resetUserToken } from "../redux/userTokenSlice.js";

//api
import { LogoutUser } from "../API/Backend/api.js";

const Navbar = ({ handleSubmit, handleInputChange }) => {
  const dispatch = useDispatch();

  //redux state selectors
  const images = useSelector((state) => state.images.value);
  const userSearchTerm = useSelector((state) => state.userSearchTerm.value);
  const currentPage = useSelector((state) => state.currentPage.value);
  const userToken = useSelector((state) => state.userToken.value);

  const resetDataOnLogoClick = () => {
    dispatch(pageReset());
    dispatch(resetSearchTerm());
    dispatch(imagesReset());
  };

  const logout = async () => {
    try {
      await LogoutUser();
      dispatch(resetUserToken());
    } catch (error) {
      console.log(error);
    }
  };

  const LoginButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "1rem",
    border: "1px solid",
    lineHeight: 1.5,
    color: "white",
    backgroundColor: "#0c152a",
    borderColor: "#0063cc",
    margin: "auto",
    height: "3rem",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "white",
      color: "#0c152a",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      transform: 0.8,
    },
    // '&:focus': {
    //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    // },
  });

  const LogoutButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "1rem",
    border: "1px solid",
    lineHeight: 1.5,
    color: "white",
    backgroundColor: "#0c152a",
    borderColor: "#0063cc",
    margin: "auto",
    height: "3rem",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "white",
      color: "#0c152a",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      transform: 0.8,
    },
    // '&:focus': {
    //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    // },
  });

  const RegisterButton = styled(Button)({
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "1rem",
    border: "1px solid",
    lineHeight: 1.5,
    color: "white",
    backgroundColor: "#0c152a",
    borderColor: "#0063cc",
    margin: "auto",
    height: "3rem",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "white",
      color: "#0c152a",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      transform: 0.8,
    },
    // '&:focus': {
    //   boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    // },
  });

  return (
    <>
      <nav className="navbar navbar-expand-lg t-flex t-flex-col t-bg-white t-w-full t-z-30">
        <div className="container-fluid t-flex t-justify-evenly">
          <NavLink to={"/"}>
            <img src={mondiLogo} className="t-w-24 t-mr-4" onClick={() => resetDataOnLogoClick()} />
          </NavLink>
          <button
            className="navbar-toggler group"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form
              className="search-form t-flex t-w-full t-items-center"
              role="search"
              onSubmit={(e) => handleSubmit(userSearchTerm, currentPage, e)}
            >
              <input
                className="t-w-full t-h-12 t-rounded-3xl t-border-0 t-pl-12 t-pr-12 t-mr-2"
                type="search"
                placeholder="Search"
                value={userSearchTerm}
                onChange={handleInputChange}
              />
              {!userToken ? (
                <>
                  <NavLink to="/register" className='t-mr-4'>
                    <RegisterButton>Register</RegisterButton>
                  </NavLink>
                  <NavLink to="/login">
                    <LoginButton>Login</LoginButton>
                  </NavLink>
                </>
              ) : (
                <>
                  <MyAccount />
                  <LogoutButton
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </LogoutButton>
                </>
              )}
            </form>
          </div>
        </div>
        <Categories handleSubmit={handleSubmit} />
      </nav>
    </>
  );
};

export default Navbar;
