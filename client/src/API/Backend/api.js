import axios from "axios";

//Development urls
/* const authUrl = "http://localhost:3000/api/v1/auth";
const usersUrl = "http://localhost:3000/api/v1/users";
const imagesUrl = "http://localhost:3000/api/v1/images"; */

// production urls
const authUrl = "https://mondi-photo-gallery-api.onrender.com/api/v1/auth";
const usersUrl = "https://mondi-photo-gallery-api.onrender.com/api/v1/users";
const imagesUrl = "https://mondi-photo-gallery-api.onrender.com/api/v1/images";

const registerUser = async (username, password, confirmPassword, email) => {
  try {
    const user = await axios.post(authUrl + "/register", {
      username,
      password,
      confirmPassword,
      email,
    });
    return user.data;
  } catch (error) {
    throw error.response.data;
  }
};

const loginUser = async (username, password) => {
  try {
    const user = await axios.post(
      authUrl + "/login",
      {
        username: username,
        password: password,
      },
      { withCredentials: true }
    );
    return user.data;
  } catch (error) {
    throw error.response.data;
  }
};

const logoutUser = async () => {
  try {
    const logout = await axios.get(authUrl + "/logout", { withCredentials: true });
    return logout;
  } catch (error) {
    throw error.response.data;
  }
};

const showCurrentUser = async () => {
  try {
    const currentUser = await axios.get(usersUrl + "/showCurrentUser", { withCredentials: true });
    if (currentUser.status === 200) {
      return currentUser.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error.response.data;
  }
};

const addImageToLiked = async (likedPhoto) => {
  try {
    const addToLiked = await axios.post(
      imagesUrl + "/addImageToLiked",
      { likedPhoto },
      { withCredentials: true }
    );
    return addToLiked.data;
  } catch (error) {
    throw error.response.data;
  }
};

const removeImageFromLiked = async (imageToRemove) => {
  try {
    const removeImage = await axios.post(
      imagesUrl + "/removeLikedImage",
      { imageToRemove },
      { withCredentials: true }
    );
    return removeImage.data;
  } catch (error) {
    throw error.response.data;
  }
};

const showCurrentUserLikedImages = async () => {
  try {
    const likedImages = await axios.get(imagesUrl + "/showCurrentUserLikedImages", {
      withCredentials: true,
    });
    return likedImages;
  } catch (error) {
    throw error.response.data;
  }
};

export {
  registerUser,
  loginUser,
  logoutUser,
  showCurrentUser,
  addImageToLiked,
  removeImageFromLiked,
  showCurrentUserLikedImages,
};
