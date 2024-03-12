import axios, { AxiosResponse, AxiosError, isAxiosError } from "axios";

//Development urls
/* const authUrl = "http://localhost:3000/api/v1/auth";
const usersUrl = "http://localhost:3000/api/v1/users";
const imagesUrl = "http://localhost:3000/api/v1/images"; */

// production urls
const authUrl = "https://mondi-photo-gallery-api.onrender.com/api/v1/auth";
const usersUrl = "https://mondi-photo-gallery-api.onrender.com/api/v1/users";
const imagesUrl = "https://mondi-photo-gallery-api.onrender.com/api/v1/images";

// interface ErrorResponse {}

interface RegisterError {
  ERR: string;
}

interface RegisterApiResponse {
  status: number;
  success: boolean;
  message: string;
  user?: {
    username: string;
    email: string;
    id: string;
    role: string;
  };
  error?: RegisterError; // Include RegisterError type for error responses
}

interface LoginApiResponse {
  success: boolean;
  user: string;
}

interface ShowCurrentUserApiResponse {
  user: {
    username: string;
    id: string;
    role: string;
  };
}

interface RemoveImageToLikedApiResponse {
  success: boolean;
  message: string;
  ERR: string;
}

interface ShowCurrentUserLikedImagesApiResponse {
  likedImages: any[];
}

const registerUser = async (
  username: string,
  password: string,
  confirmPassword: string,
  email: string
): Promise<RegisterApiResponse> => {
  try {
    const user = await axios.post(authUrl + "/register", {
      username,
      password,
      confirmPassword,
      email,
    });
    return user.data;
  } catch (error) {
    const axiosError = error as AxiosError<RegisterError>;
    throw axiosError.response?.data ?? error;
  }
};

const loginUser = async (username: string, password: string): Promise<LoginApiResponse> => {
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
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

const logoutUser = async (): Promise<AxiosResponse<string>> => {
  try {
    const logout = await axios.get(authUrl + "/logout", { withCredentials: true });
    return logout;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

const showCurrentUser = async (): Promise<ShowCurrentUserApiResponse | null> => {
  try {
    const currentUser = await axios.get(usersUrl + "/showCurrentUser", { withCredentials: true });
    if (currentUser.status === 200) {
      return currentUser.data;
    } else {
      return null;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

const addImageToLiked = async (likedPhoto: any): Promise<string> => {
  try {
    const addToLiked = await axios.post(
      imagesUrl + "/addImageToLiked",
      { likedPhoto },
      { withCredentials: true }
    );
    return addToLiked.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

const removeImageFromLiked = async (imageToRemove: any): Promise<RemoveImageToLikedApiResponse> => {
  try {
    const removeImage = await axios.post(
      imagesUrl + "/removeLikedImage",
      { imageToRemove },
      { withCredentials: true }
    );
    return removeImage.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
  }
};

const showCurrentUserLikedImages = async (): Promise<
  AxiosResponse<ShowCurrentUserLikedImagesApiResponse>
> => {
  try {
    const likedImages = await axios.get(imagesUrl + "/showCurrentUserLikedImages", {
      withCredentials: true,
    });
    return likedImages;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError.response?.data;
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
