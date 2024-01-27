/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "../CSS/Images.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import LikeImageHoverOption from "./LikeImageHoverOption";
import RemoveImageHoverOption from "./RemoveImageHoverOption";
import { Link } from "react-router-dom";
import { imagesReset } from "../redux/imagesSlice";
import { addImageToLiked, removeImageFromLiked } from "../API/Backend/api";
import { showCurrentUserLikedImages } from "../API/Backend/api";
import { setImageLikedFalse, setImageLikedTrue } from "../redux/isImageLikedSlice";

const Images = () => {
  const dispatch = useDispatch();

  const images = useSelector((state) => state.images.value);
  const isImageLiked = useSelector((state) => state.isImageLiked.value);
  const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn.value);

  const [hoveredImage, setHoveredImage] = useState([]);

  const numOfColumns = 3;
  const imagesArray = Array.from({ length: numOfColumns }, () => []); // create an array with numOfColumns sub arrays

  // Distribute images across columns
  images.forEach((image, index) => {
    const indexOfSubArray = index % numOfColumns;
    imagesArray[indexOfSubArray].push(image);
  });

  const handleMouseEnter = async (event) => {
    const image = event;
    setHoveredImage((prevImage) => {
      return image; // Set hoveredImage to the most recent image
    });
    const fetchLikedImages = await showCurrentUserLikedImages();
    if (fetchLikedImages) {
      const isHoveredImageLiked = fetchLikedImages.data.likedImages.find(
        (photo) => photo.id === image.id
      );
      if (isHoveredImageLiked) {
        dispatch(setImageLikedTrue());
        console.log("Image already liked!");
      } else {
        dispatch(setImageLikedFalse());
        console.log("Image NOT liked");
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const handleAddToLiked = async () => {
    await addImageToLiked(hoveredImage);
  };

  const handleRemoveFromLiked = async () => {
    await removeImageFromLiked(hoveredImage);
  };

  // prevent images from search results from displaying
  useEffect(() => {
    if (location.pathname === "/my-profile") {
      dispatch(imagesReset());
    }
  }, [location.pathname]);

  return (
    <div className="main-container t-mt-44">
      {images.length > 0 ? (
        <div className="gallery-container">
          {imagesArray.map((column, columnIndex) => (
            <div className={`column-${columnIndex + 1}`} key={columnIndex}>
              {column.map((image, index) => (
                <div
                  className="gallery-image"
                  onMouseEnter={() => {
                    handleMouseEnter(image);
                  }}
                  onMouseLeave={handleMouseLeave}
                  key={index}
                >
                  {hoveredImage === image ? (
                    <div>
                      {isImageLiked ? (
                        <div
                          onClick={() => {
                            handleRemoveFromLiked();
                          }}
                        >
                          <RemoveImageHoverOption />
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            handleAddToLiked();
                          }}
                        >
                          <LikeImageHoverOption />
                        </div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                  {image.urls && image.urls.regular && (
                    <Link to={`/photo/${image.id}`} target="_blank">
                      <>
                        <img src={image.urls.regular} alt={image.alt_description} />
                      </>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="t-flex t-flex-col">
            <CircularProgress className="t-m-auto t-mb-2" />
            <h6>Loading images...</h6>
          </div>
        </Box>
      )}
    </div>
  );
};

export default Images;
