/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "../CSS/Images.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import LikeImageHoverOption from "./LikeImageHoverOption";
import RemoveImageHoverOption from "./RemoveImageHoverOption";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { imagesReset, addItems } from "../redux/imagesSlice";
import { addImageToLiked, removeImageFromLiked } from "../API/Backend/api";
import { showCurrentUserLikedImages } from "../API/Backend/api";
import { setImageLikedFalse, setImageLikedTrue } from "../redux/isImageLikedSlice";
import { updateSearchTerm } from "../redux/userSearchTermSlice";
import { getImages } from "../API/Remote/api";

const Images = () => {
  const dispatch = useDispatch();

  const { searchTerm } = useParams(); // Get the searchTerm from URL params

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
      } else {
        dispatch(setImageLikedFalse());
      }
    }
  };

  /* 
    The code inside the useEffect hook below is used to solve the following problem:
    When linking a certain page to someeone else or when copying the link and pasting in a new tab, 
    any url that has a param in the url, such as "http://localhost:5173/c/wallpapers", 
    would not load the data(images in this case).
    
    This is because the userSearchTerm state is not persisted across refreshes and devices/browsers.
    For this reason, I have called getImages and set the result to be loaded on every initial page request with
    the search term being the param in the url which I have called searchTerm in the function below.

  */
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getImages(searchTerm); // Fetch images based on searchTerm param in the url
        dispatch(addItems(fetchedImages));
        dispatch(updateSearchTerm(searchTerm));
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages(); // Fetch images when component initially mounts
  }, []);

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  const handleAddToLiked = async () => {
    await addImageToLiked(hoveredImage);
    if (isUserLoggedIn) {
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
    await removeImageFromLiked(hoveredImage);
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
          </div>
        </Box>
      )}
    </div>
  );
};

export default Images;
