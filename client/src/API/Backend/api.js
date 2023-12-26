import axios from "axios";

const authUrl = "http://localhost:3000/api/v1/auth";
const usersUrl = "http://localhost:3000/api/v1/users";

const RegisterUser = async (username, password, email) => {
  try {
    const user = await axios.post(authUrl + "/register", {
      username: username,
      password: password,
      email: email,
    });
    return user.data;
  } catch (error) {
    console.error(error);
  }
};

const LoginUser = async (username, password) => {
  try {
    const user = await axios.post(authUrl + "/login", {
      username: username,
      password: password,
    });
    return user.data;
  } catch (error) {
    console.error(error);
  }
};

export { RegisterUser, LoginUser };