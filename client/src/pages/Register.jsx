import { useState } from "react";
import { registerUser } from "../API/Backend/api";
import "../CSS/Register.css";
// import cameraPhoto from "../assets/images/camera-leaves.jpg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleUsernameInputChange = (event) => {
    setUsername(event.target.value);
    console.log(event.target.value);
  };

  const handlePasswordInputChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleEmailInputChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const register = await registerUser(username, userPassword, userEmail);
    if (register) {
      navigate("/login");
      toast("Successfully registered!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast(
        "Cannot register your account. Username is already taken or one of the inputs is empty.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        }
      );
    }
  };

  return (
    <div className="register-main-container t-flex t-flex-col t-items-center t-justify-center t-h-full t-w-full t-bg-zinc-200 t-mt-10">
      <div className="register-sub-container t-h-1/2 t-w-1/2 t-flex t-flex-col t-justify-center">
        <div className="register-header t-flex t-justify-center t-text-6xl t-text-white t-mb-8">
          REGISTER
          <div className="register-header-dot t-text-amber-500">.</div>
        </div>
        <form onSubmit={handleRegister} className="register-form t-flex t-flex-col t-items-center">
          <input
            className="register-input register-input-username t-h-10"
            type="text"
            placeholder="username"
            id="registration-username-field"
            onChange={handleUsernameInputChange}
          />
          <input
            className="register-input register-input-password t-h-10"
            type="password"
            placeholder="password"
            id="registration-password-field"
            onChange={handlePasswordInputChange}
          />
          <input
            className="register-input register-input-email t-h-10"
            type="text"
            placeholder="email"
            id="registration-email-field"
            onChange={handleEmailInputChange}
          />
          <input
            className="register-input register-input-submit t-h-8 t-bg-amber-500"
            type="submit"
            placeholder="submit"
          />
          <div className="t-text-white t-mt-4 t-text-xs">
            ALREADY HAVE AN ACCOUNT?
            <Link to={"/login"} className="t-text-amber-500 t-ml-2 t-text-base">
              Login here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
