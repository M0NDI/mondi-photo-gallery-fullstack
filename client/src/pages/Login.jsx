import { LoginUser } from "../API/Backend/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleUsernameInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordInputChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const login = await LoginUser(username, userPassword);
      if (login) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-main-container t-flex t-items-center t-pt-20 t-h-full t-bg-zinc-200">
      <form
        onSubmit={handleSubmit}
        className="register-form t-flex t-w-full t-h-full rounded t-flex-col t-justify-center t-items-center t-p-24"
      >
        <input
          className={`register-input register-input-username ${!username ? "input-empty" : ""}`}
          type="text"
          placeholder="username"
          autoComplete="on"
          onChange={handleUsernameInputChange}
        />
        <input
          className={`register-input register-input-password ${!userPassword ? "input-empty" : ""}`}
          type="password"
          placeholder="password"
          autoComplete="on"
          onChange={handlePasswordInputChange}
        />
        <input
          type="submit"
          placeholder="submit"
          className="register-input register-input-submit"
        />
      </form>
    </div>
  );
};

export default Login;
