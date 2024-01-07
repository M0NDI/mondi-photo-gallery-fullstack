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
    const user = await axios.post(
      authUrl + "/login",
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
    console.log(user.data)
    return user.data;
  } catch (error) {
    console.error(error);
  }
};

const LogoutUser = async () => {
  try {
    const logout = await axios.get(authUrl + "/logout", { withCredentials: true });
    return logout;
  } catch (error) {
    console.log(error);
  }
};

// make test call below to backend to authenticate user using withCredentials and save response to variable
// then if response has a value, use that to conditionally render pages/components on the front-end


export { RegisterUser, LoginUser, LogoutUser };
