import axios from "axios";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const rootUrl = "https://api.unsplash.com/";

const getImages = async (searchTerm, page) => {
  try {
    const response = await axios.get(rootUrl + "search/photos", {
      params: {
        query: searchTerm,
        page: page,
        per_page: 20,
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
    if (response) {
      return response.data.results;
    }
  } catch (error) {
    console.log(error);
  }
};

const getSingleImage = async (imageId) => {
  try {
    const response = await axios.get(rootUrl + `/photos/${imageId}`, {
      params: {
        id: imageId
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    });
    console.log(response.data)
    return response.data
  } catch (error) {
    console.log(error);
  }
};

const getRandomPhotos = async () => {
  try {
    const response = await axios.get(rootUrl + "photos/random", {
      params: {
        count: 20,
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
    if (response) {
      console.log(response);
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export { getImages, getRandomPhotos, getSingleImage };