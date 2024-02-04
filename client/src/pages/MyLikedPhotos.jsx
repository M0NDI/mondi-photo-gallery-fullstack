import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  addImageToLiked,
  removeImageFromLiked,
  showCurrentUserLikedImages,
} from "../API/Backend/api";
import { useDispatch, useSelector } from "react-redux";
import RemoveImageHoverOption from "../components/RemoveImageHoverOption";
import { setImageLikedTrue, setImageLikedFalse } from "../redux/isImageLikedSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import "../CSS/MyLikedPhotos.css";

const MyAccount = () => {
  const dispatch = useDispatch();

  const [likedImages, setLikedImages] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [imageToRecover, setImageToRecover] = useState(null);
  const [recentlyUnliked, setRecentlyUnliked] = useState(false);
  const [recentlyUnlikedIndex, setRecentlyUnlikedIndex] = useState(null);
  const isImageLiked = useSelector((state) => state.isImageLiked.value);

  const handleMouseEnter = async (image) => {
    setHoveredImage(image);
    await showCurrentUserLikedImages();
    dispatch(setImageLikedTrue());
  };

  const handleRemoveFromLiked = async (imageToRemove) => {
    const remove = await removeImageFromLiked(imageToRemove);
    setLikedImages((prevLikedImages) => prevLikedImages.filter((image) => image !== imageToRemove));
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
    } else {
      toast("Cannot perform action because you are not logged in", {
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

  const fetchUserLikedImages = async () => {
    try {
      const images = await showCurrentUserLikedImages();
      if (images) {
        setLikedImages(images.data.likedImages);
      }
    } catch (error) {
      console.error("Error fetching user liked images:", error);
    }
  };

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
          className="undo-container t-w-12 t-text-center t-text-xl t-fixed t-bottom-20 t-left-20 t-cursor-pointer"
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
