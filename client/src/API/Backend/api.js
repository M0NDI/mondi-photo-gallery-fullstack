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
    console.log("User registered", user);
    return user.data;
  } catch (error) {
    console.error("Username already taken:", error);
    throw error; // Rethrow the error for further handling
  }
};

export { RegisterUser };