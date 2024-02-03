import { loginUser } from "../API/Backend/api";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInTrue } from "../redux/isUserLoggedInSlice";
import { toast } from "react-toastify";
import "../CSS/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleUsernameInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordInputChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const login = await loginUser(username, userPassword);
      if (login.success) {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-main-container t-flex t-flex-col t-items-center t-justify-center t-h-full t-w-full t-bg-zinc-200 t-mt-10">
      <div className="login-sub-container t-h-1/2 t-w-1/2 t-flex t-flex-col t-justify-center">
        <div className="login-header t-flex t-justify-center t-text-6xl t-text-white t-mb-8">
          LOGIN
          <div className="login-header-dot t-text-amber-500">.</div>
        </div>
        <form
          onSubmit={handleLogin}
          className="login-form t-flex t-flex-col t-items-center"
        >
          <input
            className="login-input login-input-username t-h-10"
            type="text"
            placeholder="username"
            id="registration-username-field"
            onChange={handleUsernameInputChange}
          />
          <input
            className="login-input login-input-password t-h-10"
            type="password"
            placeholder="password"
            id="registration-password-field"
            onChange={handlePasswordInputChange}
          />
          <input
            className="login-input login-input-submit t-h-8 t-bg-amber-500"
            type="submit"
            placeholder="submit"
          />
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
