import axios from "axios";

//Development urls
const authUrl = "http://localhost:3000/api/v1/auth";
const usersUrl = "http://localhost:3000/api/v1/users";
const imagesUrl = "http://localhost:3000/api/v1/images";

// production urls
/* const authUrl = "https://mondi-photo-gallery-api.onrender.com/api/v1/auth";
const usersUrl = "https://mondi-photo-gallery-api.onrender.com/api/v1/users";
const imagesUrl = "https://mondi-photo-gallery-api.onrender.com/api/v1/images"; */

const registerUser = async (username, password, email) => {
  try {
    const user = await axios.post(authUrl + "/register", {
      username: username,
      password: password,
      email: email,
    });
    console.log(user.data);
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
    console.log(error);
  }
};

const showCurrentUser = async () => {
  try {
    const currentUser = await axios.get(usersUrl + "/showCurrentUser", { withCredentials: true });
    if (!currentUser && !currentUser.status === 200) {
      return null;
    } else {
      return currentUser.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const addImageToLiked = async (likedPhoto) => {
  try {
    const addToLiked = await axios.post(
      imagesUrl + "/addImageToLiked",
      { likedPhoto },
      { withCredentials: true }
    );
    if (!addToLiked) {
      return { ERR: "There was an error liking this image." };
    } else {
      return addToLiked;
    }
  } catch (error) {
    console.log(error);
  }
};

const removeImageFromLiked = async (imageToRemove) => {
  try {
    const removeImage = await axios.post(
      imagesUrl + "/removeLikedImage",
      { imageToRemove },
      { withCredentials: true }
    );
    if (!imageToRemove) {
      return { ERR: "There was an error removing this image" };
    } else {
      return removeImage;
    }
  } catch (error) {
    console.log(error);
  }
};

const showCurrentUserLikedImages = async () => {
  try {
    const likedImages = await axios.get(imagesUrl + "/showCurrentUserLikedImages", {
      withCredentials: true,
    });
    if (!likedImages) {
      console.log("Error occured on the client when getting likedImages");
    } else {
      return likedImages;
    }
  } catch (error) {
    console.log(error);
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
