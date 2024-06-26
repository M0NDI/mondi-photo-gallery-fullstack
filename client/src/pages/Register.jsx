import { useState } from "react";
import { registerUser } from "../API/Backend/api";
import "../CSS/Register.css";
import { Link, useNavigate } from "react-router-dom";

// toastify toast
import { toast } from "react-toastify";

// material ui components
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Register = () => {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const handleInputChange = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const [formSubmissionInProgress, setFormSubmissionInProgress] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    setFormSubmissionInProgress(true);
    try {
      const register = await registerUser(
        registerForm.username,
        registerForm.password,
        registerForm.confirmPassword,
        registerForm.email
      );
      if (register) {
        navigate("/login");
        toast("Successfully registered!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
      }
      setFormSubmissionInProgress(false);
    } catch (error) {
      toast.error(error.ERR || "An error occurred", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setFormSubmissionInProgress(false);
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
            id="registration-username-field"
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
          />
          <input
            className="register-input register-input-password t-h-10"
            id="registration-password-field"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
          <input
            className="register-input register-input-password t-h-10"
            id="registration-confirm-password-field"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleInputChange}
          />
          <div className="t-text-zinc-50 t-opacity-50">
            Password must be a minimum of 8 characters
          </div>
          <input
            className="register-input register-input-email t-h-10"
            id="registration-email-field"
            type="email"
            name="email"
            placeholder="Email"
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
            ALREADY HAVE AN ACCOUNT?
            <Link to={"/login"} className="t-text-amber-500 t-ml-2">
              Login here!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
