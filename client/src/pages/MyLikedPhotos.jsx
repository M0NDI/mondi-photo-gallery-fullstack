import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "../CSS/MyLikedPhotos.css";

// material UI components
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Backend API
import {
  addImageToLiked,
  removeImageFromLiked,
  showCurrentUserLikedImages,
} from "../API/Backend/api";

// Components
import RemoveImageHoverOption from "../components/RemoveImageHoverOption";

// redux
import { useDispatch, useSelector } from "react-redux";

// Redux state actions
import { setImageLikedTrue } from "../redux/isImageLikedSlice";

const MyAccount = () => {
  const dispatch = useDispatch();

  const [likedImages, setLikedImages] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [imageToRecover, setImageToRecover] = useState(null);
  const [recentlyUnliked, setRecentlyUnliked] = useState(false);

  const isImageLiked = useSelector((state) => state.isImageLiked.value);

  const handleMouseEnter = async (image) => {
    setHoveredImage(image);
    await showCurrentUserLikedImages();
    dispatch(setImageLikedTrue());
  };

  /* 
    Unlike image and store it in temporary state "imageToRecover" so a user can undo the action.
    "recentlyUnliked" state used to conditionally render undo button.
  */
  const handleRemoveFromLiked = async (imageToRemove) => {
    try {
      const remove = await removeImageFromLiked(imageToRemove);
      setLikedImages((prevLikedImages) =>
        prevLikedImages.filter((image) => image !== imageToRemove)
      );
      setRecentlyUnliked(true);
      setImageToRecover(imageToRemove); // Store the image to recover upon removal

      if (remove.status === 200) {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserLikedImages = async () => {
    try {
      const images = await showCurrentUserLikedImages();
      if (images) {
        setLikedImages((prevImages) => {
          return images.data.likedImages;
        });
      }
    } catch (error) {
      console.error("Error fetching user liked images:", error);
    }
  };

  // recover image from "imageToRecover" state and add it back to liked images.
  const undoRemoveFromLiked = async () => {
    try {
      await addImageToLiked(imageToRecover);
      setRecentlyUnliked(false);
      fetchUserLikedImages();
      toast("Image recovered to end of images list!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error undoing removal from liked:", error);
    }
  };

  /* 
    Create an array with 3 sub-arrays which represent 3 columns on the page.

    Then for each image retrieved from the api, we get the index of the image and determine
    which sub-array it will be placed into. 
    
    For example: 
    image[0] % numOfColumns = 0 (placed in sub-array at index 0) -- 0 % 3 = 0
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
  const numOfColumns = 3;
  const imagesArray = Array.from({ length: numOfColumns }, () => []);
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
                <div
                  className="gallery-image"
                  onMouseEnter={() => {
                    handleMouseEnter(image);
                  }}
                  key={index}
                >
                  {hoveredImage === image ? (
                    <div>
                      {isImageLiked ? (
                        <div
                          onClick={() => {
                            handleRemoveFromLiked(image);
                          }}
                        >
                          <RemoveImageHoverOption />
                        </div>
                      ) : (
                        <></>
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
      </div>
      {likedImages ? (
        <></>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="t-flex t-flex-col">
            <CircularProgress className="t-m-auto t-mb-2" />
          </div>
        </Box>
      )}
      {recentlyUnliked ? (
        <div
          onClick={undoRemoveFromLiked}
          className="undo-container t-w-11 t-text-center t-text-xl t-fixed t-bottom-20 t-left-12 t-cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#F59E0B"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          Undo
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyAccount;
