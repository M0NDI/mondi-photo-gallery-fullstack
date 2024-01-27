import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { showCurrentUserLikedImages } from "../API/Backend/api";

const MyAccount = () => {
  const [likedImages, setLikedImages] = useState(null);
  const [fetchingImages, setFetchingImages] = useState(true); // Flag

  const fetchUserLikedImages = async () => {
    try {
      const images = await showCurrentUserLikedImages();
      if (images) {
        setLikedImages((prevLikedImages) => {
          return images.data.likedImages;
        });
      }
    } catch (error) {
      console.error("Error fetching user liked images:", error);
    }
  };

  const numOfColumns = 3;
  const imagesArray = Array.from({ length: numOfColumns }, () => []); // create an array with numOfColumns sub arrays

  if (likedImages !== null) {
    likedImages.map((image, index) => {
      const indexOfSubArray = index % numOfColumns;
      imagesArray[indexOfSubArray].push(image);
    });
  }

  useEffect(() => {
    fetchUserLikedImages();
  }, []);

  return (
    <>
      <h1 className="t-mt-44 t-text-3xl t-ml-4 t-font-bold">My liked photos</h1>
      <div className="top-divider t-outline t-outline-zinc-200 t-mb-14 t-mt-8 t-m-12"></div>
      <div className="t-flex t-justify-center t-mt-22">
        <div className="gallery-container">
          {imagesArray.map((column, columnIndex) => (
            <div className={`column-${columnIndex + 1}`} key={columnIndex}>
              {column.map((image, index) => (
                <div className="gallery-image" key={index}>
                  {image.urls && image.urls.regular && (
                    <img src={image.urls.regular} alt={image.alt_description} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      {likedImages ? (
        <></>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="t-flex t-flex-col">
            <CircularProgress className="t-m-auto t-mb-2" />
            <h6 className="t-m-auto">Loading images...</h6>
          </div>
        </Box>
      )}
    </>
  );
};

export default MyAccount;
