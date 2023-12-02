import axios from "axios";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const rootUrl = "https://api.unsplash.com/";

const GetImages = async (searchTerm) => {
  try {
    const response = await axios.get(rootUrl + "/search/photos", {
      params: {
        query: searchTerm
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default GetImages;