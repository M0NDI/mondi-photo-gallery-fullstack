import "../CSS/Navbar.css";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

// Assets/images
import mondiLogo from "../assets/images/logos/mondi-logo-text-only.png";

// Components
import MyAccountNavIcon from "./MyAccountNavIcon.jsx";
import Categories from "./Categories.jsx";

// MaterialUI components
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

// Redux imports
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// redux state actions
import { imagesReset } from "../redux/imagesSlice.js";
import { resetSearchTerm } from "../redux/userSearchTermSlice.js";
import { pageReset } from "../redux/currentPageSlice.js";
import { setLoggedInFalse } from "../redux/isUserLoggedInSlice.js";

//Backend API
import { logoutUser } from "../API/Backend/api.ts";

const Navbar = ({ handleSubmit, handleInputChange }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //redux state selectors
  const userSearchTerm = useSelector((state) => state.userSearchTerm.value);
  const currentPage = useSelector((state) => state.currentPage.value);
  const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn.value);

  const resetDataOnLogoClick = () => {
    dispatch(pageReset());
    dispatch(resetSearchTerm());
    dispatch(imagesReset());
  };

  const logout = async () => {
    try {
      const logout = await logoutUser();
      if (logout) {
        dispatch(setLoggedInFalse());
        toast("Successfully logged out! 😊", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      return error;
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
                id="nav-search-input"
                value={userSearchTerm}
                onChange={handleInputChange}
              />
              {!isUserLoggedIn ? (
                <>
                  <NavLink to="/register" className="t-mr-4">
                    <RegisterButton>Register</RegisterButton>
                  </NavLink>
                  <NavLink to="/login">
                    <LoginButton>Login</LoginButton>
                  </NavLink>
                </>
              ) : (
                <>
                  <MyAccountNavIcon />
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

        {!location.pathname.startsWith("/photo/") && <Categories handleSubmit={handleSubmit} />}
      </nav>
    </>
  );
};

export default Navbar;
