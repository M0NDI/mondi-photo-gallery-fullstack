import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Link, useParams } from "react-router-dom";
import { getSingleImage } from "../API/Remote/api";
import { useEffect } from "react";
import { imageReset, addItem } from "../redux/singleImageSlice";
import { useSelector, useDispatch } from "react-redux";
import { saveAs } from "file-saver";
import { addImageToLiked } from "../API/Backend/api";
import "../CSS/PhotoPage.css";

const PhotoPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const singleImage = useSelector((state) => state.singleImage.value);

  const fetchSingleImage = async () => {
    try {
      const image = await getSingleImage(id);
      if (image) {
        dispatch(addItem(image));
      }
      return image;
    } catch (error) {
      console.error("Error fetching single image:", error);
      return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const handleImageDownload = (imagePath, imageSlug) => {
    let url = imagePath;
    saveAs(url, imageSlug);
  };

  const handleLikeImage = async (imageToLike) => {
    const image = await addImageToLiked(imageToLike); /* HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE HERE  */
  };

  useEffect(() => {
    fetchSingleImage();
    dispatch(imageReset());
  }, [id]);

  return (
    <div className="t-h-full t-w-full t-mt-40">
      {singleImage.length > 0 && singleImage[0].urls ? (
        <div className="t-flex t-flex-col t-items-center t-w-full">
          <div className="t-w-full t-flex t-justify-between">
            <div className="t-w-10/12 t-no-underline t-text-zinc-900 t-pl-4 t-mb-4 t-font-medium t-text-xl t-flex t-items-center">
              <Link
                to={singleImage[0].user.links.html}
                className="t-no-underline t-text-zinc-900 t-font-medium t-text-xl t-flex t-items-center"
                target="_blank"
              >
                <img src={singleImage[0].user.profile_image.medium} className="t-rounded-full" />
                <div className="t-pl-3">
                  {singleImage[0].user.first_name} {singleImage[0].user.last_name}
                </div>
              </Link>
            </div>
            <div className="t-flex t-items-center">
              <div className="t-text-xl t-mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="heart-icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="hover-icon-heart t-w-6 t-h-6 t-cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    fill="white"
                    stroke="black"
                  />
                </svg>
              </div>
              <div
                className="dropdown-main dropdown-toggle t-mr-12 t-flex t-items-center t-h-4"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <a className="t-no-underline t-text-zinc-900 t-text-xl">Download</a>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() =>
                        handleImageDownload(singleImage[0].urls.small, singleImage[0].slug)
                      }
                    >
                      Small
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() =>
                        handleImageDownload(singleImage[0].urls.regular, singleImage[0].slug)
                      }
                    >
                      Medium
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() =>
                        handleImageDownload(singleImage[0].urls.full, singleImage[0].slug)
                      }
                    >
                      Original size ({singleImage[0].width} x {singleImage[0].height})
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="photo-main t-flex t-justify-center t-items-center t-w-7/12">
            <img
              src={singleImage[0].urls.regular}
              alt={singleImage.alt_description}
              className="t-w-full t-mt-2"
            />
          </div>
          <div className="t-flex t-justify-start t-flex-col t-m-auto t-w-full t-p-2">
            <div className="t-flex t-text-2xl">
              <div className="t-text-zinc-400 t-text-lg t-ml-4 t-mt-4">
                Views
                <p className="t-text-zinc-900">{singleImage[0].views.toLocaleString()}</p>
              </div>
              <div className="t-text-zinc-400 t-text-lg t-ml-14 t-mt-4">
                Downloads
                <p className="t-text-zinc-900">{singleImage[0].downloads.toLocaleString()}</p>
              </div>
            </div>
            <div className="t-flex t-text-">
              {singleImage[0].description ? (
                <div className="t-flex t-m-4">
                  <p className="t-text-xl">
                    {singleImage[0].description.slice(0, 1).toUpperCase() +
                      singleImage[0].description.slice(1, singleImage[0].description.length)}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="image-details">
              <div className="image-location">
                {singleImage[0].location.name ? (
                  <div className="t-flex">
                    <div className="t-w-5 t-ml-4 t-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                    </div>
                    <div className="t-opacity-75 t-leading-10 t-text-xl t-ml-4">
                      {singleImage[0].location.name}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="image-publish-date">
                {singleImage[0].created_at ? (
                  <div className="t-flex">
                    <div className="t-w-5 t-ml-4 t-flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                    </div>
                    <div className="t-opacity-75 t-leading-10 t-text-xl t-ml-4">
                      Published on {formatDate(singleImage[0].created_at)}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
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

export default PhotoPage;
