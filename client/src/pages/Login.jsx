import { loginUser } from "../API/Backend/api";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInTrue } from "../redux/isUserLoggedInSlice";
import { toast } from "react-toastify";
import "../CSS/Login.css";
import RequestSpeedAlert from "../components/RequestSpeedAlert";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [formSubmissionInProgress, setFormSubmissionInProgress] = useState(false);

  const handleInputChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      setFormSubmissionInProgress(true);
      const login = await loginUser(loginForm.username, loginForm.password);
      console.log(login);
      if (login.success === true) {
        dispatch(setLoggedInTrue());
        navigate("/");
        toast("Successfully logged in! 😊", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setFormSubmissionInProgress(false);
    } catch (error) {
      if (error) {
        toast.error(error.ERR, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      setFormSubmissionInProgress(false);
    }
  };

  return (
    <div className="login-main-container t-flex t-flex-col t-items-center t-justify-center t-h-full t-w-full t-bg-zinc-200 t-mt-10">
      {formSubmissionInProgress ? (
        <div className="t-flex t-justify-center t-items-center t-relative t-top-0">
          <RequestSpeedAlert />
        </div>
      ) : (
        <></>
      )}
      <div className="login-sub-container t-h-1/2 t-w-1/2 t-flex t-flex-col t-justify-center">
        <div className="login-header t-flex t-justify-center t-text-6xl t-text-white t-mb-8">
          LOGIN
          <div className="login-header-dot t-text-amber-500">.</div>
        </div>
        <form onSubmit={handleLogin} className="login-form t-flex t-flex-col t-items-center">
          <input
            className="login-input login-input-username t-h-10"
            id="login-username-field"
            type="text"
            name="username"
            autoComplete="on"
            placeholder="username"
            onChange={handleInputChange}
          />
          <input
            className="login-input login-input-password t-h-10"
            id="login-password-field"
            type="password"
            name="password"
            autoComplete="on"
            placeholder="password"
            onChange={handleInputChange}
          />
          <input
            className="register-input register-input-submit t-h-8 t-bg-amber-500"
            type="submit"
            value="Submit"
            disabled={formSubmissionInProgress} // Disable the button while form is being submitted
          />
          <div className="t-mt-2">
            {formSubmissionInProgress && ( // Render CircularProgress inside Box when form is being submitted
              <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div className="t-flex t-flex-col">
                  <CircularProgress className="t-m-auto t-mb-2" />
                </div>
              </Box>
            )}
          </div>
          <div className="t-text-white t-mt-4 t-text-base">
            CREATE ACCOUNT
            <Link to={"/register"} className="t-text-amber-500 t-ml-2">
              Register here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
