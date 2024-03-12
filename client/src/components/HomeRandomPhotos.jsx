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

  /* 
    Create an array with 3 sub-arrays which represent 3 columns on the page.

    Then for each image retrieved from the api, we get the index of the image and determine
    which sub-array it will be placed into. 
    
    For example: 
    image[0] % numOfColumns = 0 (placed in sub-array at index 0)
    image[1] % numofColumns = 1 (placed in sub-array at index 1)
    image[2] % numofColumns = 2 (placed in sub-array at index 2) -- next, we go back to index 0 as numOfColumns is 3
    image[3] % numofColumns = 0 (placed in sub-array at index 0) -- and so on...

    image[12] % numofColumns = 0 (placed in sub-array at index 0)
    image[13] % numofColumns = 1 (placed in sub-array at index 1)
    image[14] % numofColumns = 2 (placed in sub-array at index 2)

    Performed this way to prevent large disparities between lengths of columns as one column
    might receive more portrait oriented images than the others. Distribution of images is more
    even.
  */
  const numColumns = 3;
  const columns = Array.from({ length: numColumns }, () => []);
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
      return error;
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
    try {
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
      }
    } catch (error) {
      console.error(error);
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
      return error;
    }
  };

  const handleRemoveFromLiked = async () => {
    try {
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
      }
    } catch (error) {
      console.error(error);
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
      return error;
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
      if (window.scrollY / pageHeight >= 0.6) {
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
