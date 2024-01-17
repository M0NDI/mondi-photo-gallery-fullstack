import { useEffect, useState } from "react";

import { ShowCurrentUser } from "../API/Backend/api/";
import { ShowCurrentUserLikedImages } from "../API/Backend/api";

const MyAccount = () => {
  const [likedImages, setLikedImages] = useState(null);

  const getCurrentUser = async () => {
    try {
      await ShowCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserLikedImages = async () => {
    try {
      const images = await ShowCurrentUserLikedImages();
      if (images) {
        setLikedImages(images);
      }
    } catch (error) {
      console.error("Error fetching user liked images:", error);
    }
  };

  useEffect(() => {
    fetchUserLikedImages();
  }, []);

  return (
    <div className="t-mt-48">
      <form>
        <button type="button" onClick={getCurrentUser}>
          GET USER
        </button>
        <button type="button" onClick={fetchUserLikedImages}>
          GET LIKED IMAGES
        </button>
      </form>
    </div>
  );
};

export default MyAccount;
