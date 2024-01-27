import "../CSS/Images.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LikeImageHoverOption from "./LikeImageHoverOption";
import RemoveImageHoverOption from "./RemoveImageHoverOption";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getRandomPhotos } from "../API/Remote/api";
import lodash, { random } from "lodash";
import { addImageToLiked, removeImageFromLiked } from "../API/Backend/api";
import { showCurrentUserLikedImages } from "../API/Backend/api";
import { setImageLikedFalse, setImageLikedTrue } from "../redux/isImageLikedSlice";

// import redux state

const RandomPhotos = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // react state
  const [randomImages, setRandomImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);

  // redux state
  const isImageLiked = useSelector((state) => state.isImageLiked.value);

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
    console.log(image);
    setHoveredImage((prevImage) => {
      return image; // Set hoveredImage to the most recent image
    });
    const userLikedImages = await showCurrentUserLikedImages();
    if (userLikedImages) {
      const isImageLiked = userLikedImages.data.likedImages.find((photo) => photo.id === image.id);
      if (isImageLiked) {
        console.log("Image already liked!");
        dispatch(setImageLikedTrue());
      } else {
        dispatch(setImageLikedFalse());
      }
    }
  };

  const handleAddToLiked = async () => {
    await addImageToLiked(hoveredImage);
  };

  const handleRemoveFromLiked = async () => {
    await removeImageFromLiked(hoveredImage);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

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
            <h6>Loading images...</h6>
          </div>
        </Box>
      )}
    </div>
  );
};

export default RandomPhotos;
