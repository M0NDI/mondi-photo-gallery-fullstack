import { useState } from "react";
import { RegisterUser } from "../API/Backend/api";
import '../CSS/Register.css'
import cameraPhoto from '../assets/images/camera-leaves.jpg'
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()

  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleUsernameInputChange = (event) => {
    setUsername(event.target.value);
    console.log(event.target.value);
  };

  const handlePasswordInputChange = (event) => {
    setUserPassword(event.target.value);
    console.log(event.target.value);
  };

  const handleEmailInputChange = (event) => {
    setUserEmail(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const register = await RegisterUser(username, userPassword, userEmail);
    if (register) {
      navigate("/login")
    }
  };

  return (
    <div className="register-main-container t-flex t-items-center t-pt-20 t-h-full t-bg-zinc-200">

      <div className="register-main-photo t-h-full t-w-7/12 t-flex">
        <img src={cameraPhoto} className="t-w-full object-fit-cover"/>
      </div>

      <form onSubmit={handleSubmit} className="register-form t-flex t-w-full t-h-full rounded t-flex-col t-justify-center t-items-center t-p-24">
        <input
          className={`register-input register-input-username ${!username ? 'input-empty' : ''}`}
          type="text"
          placeholder="username"
          autoComplete="on"
          onChange={handleUsernameInputChange}
        />
        <input
          className={`register-input register-input-password ${!userPassword ? 'input-empty' : ''}`}
          type="password"
          placeholder="password"
          autoComplete="on"
          onChange={handlePasswordInputChange}
        />
        <input
          className={`register-input register-input-email ${!userEmail ? 'input-empty' : ''}`}
          type="text"
          placeholder="email"
          autoComplete="on"
          onChange={handleEmailInputChange}
        />
        <input type="submit" placeholder="submit" className="register-input register-input-submit"/>
      </form>
      
    </div>
  );
};

export default Register;