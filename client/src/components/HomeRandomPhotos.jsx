import "../CSS/Images.css";
import lodash from "lodash";

// React
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

// Material UI components
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Components
import LikeImageHoverOption from "./LikeImageHoverOption";
import RemoveImageHoverOption from "./RemoveImageHoverOption";

// Redux
import { useSelector, useDispatch } from "react-redux";

// Remote API
import { getRandomPhotos } from "../API/Remote/api";

// Backend API
import { addImageToLiked, removeImageFromLiked } from "../API/Backend/api";
import { showCurrentUserLikedImages } from "../API/Backend/api";

// Redux state actions
import { setImageLikedFalse, setImageLikedTrue } from "../redux/isImageLikedSlice";

const RandomPhotos = () => {
  const dispatch = useDispatch();

  // react state
  const [randomImages, setRandomImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);

  // redux state
  const isImageLiked = useSelector((state) => state.isImageLiked.value);
  const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn.value);

  const numColumns = 3;
  const columns = Array.from({ length: numColumns }, () => []);

  // Distribute images across columns dynamically
  randomImages.forEach((image, index) => {
    const columnIndex = index % numColumns;
    columns[columnIndex].push(image);
  });

  const randomPhotos = async () => {
    try {
      const photos = await getRandomPhotos();
      if (photos) {
        setRandomImages((prevPhotos) => [...prevPhotos, ...photos]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseEnter = async (event) => {
    const image = event;
    setHoveredImage((prevImage) => {
      return image; // Set hoveredImage to the most recent image
    });
    const userLikedImages = await showCurrentUserLikedImages();
    if (userLikedImages && isUserLoggedIn) {
      const isImageLiked = userLikedImages.data.likedImages.find((photo) => photo.id === image.id);
      if (isImageLiked) {
        dispatch(setImageLikedTrue());
      } else {
        dispatch(setImageLikedFalse());
      }
    }
  };

  const handleAddToLiked = async () => {
    const addToLiked = await addImageToLiked(hoveredImage);
    if (addToLiked && isUserLoggedIn === true) {
      toast("Image liked!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(setImageLikedTrue());
    } else {
      toast("Cannot perform action because you are not logged in!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleRemoveFromLiked = async () => {
    const removeFromLiked = await removeImageFromLiked(hoveredImage);
    if (removeFromLiked && isUserLoggedIn === true) {
      toast("Image unliked!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(setImageLikedFalse());
    } else {
      toast("Cannot perform action because you are not logged in!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  useEffect(() => {}, [isImageLiked]);

  useEffect(() => {
    setRandomImages([]);
    if (location.pathname === "/") {
      randomPhotos();
    }
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = lodash.debounce(() => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY / pageHeight >= 0.5) {
        randomPhotos();
      }
    }, 40);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return (
    <div className="main-container t-mt-48">
      {randomImages.length > 0 ? (
        <div className="gallery-container">
          {columns.map((column, columnIndex) => (
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
                      <img src={image.urls.regular} alt={image.alt_description} />
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
          </div>
        </Box>
      )}
    </div>
  );
};

export default RandomPhotos;
