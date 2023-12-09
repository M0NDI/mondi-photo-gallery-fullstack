import axios from "axios";

const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const rootUrl = "https://api.unsplash.com/";

const GetImages = async (searchTerm, nextPage) => {
  try {
    const response = await axios.get(rootUrl + "/search/photos", {
      params: {
        query: searchTerm,
        page: nextPage,
        per_page: 20
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
  }
};

export default GetImages;