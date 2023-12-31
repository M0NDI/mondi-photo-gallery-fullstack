/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import "../CSS/Images.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageHoverOptions from "./ImageHoverOptions";
import { Link } from "react-router-dom";
import { imagesReset } from "../features/imagesSlice";

const Images = () => {
  const dispatch = useDispatch();
  
  const images = useSelector((state) => state.images.value);

  const [hoveredImage, setHoveredImage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const numColumns = 3;
  const columns = Array.from({ length: numColumns }, () => []);

  // Distribute images across columns
  images.forEach((image, index) => {
    const columnIndex = index % numColumns;
    columns[columnIndex].push(image);
  });

  const handleMouseEnter = (event) => {
    const image = event;
    setHoveredImage(image);
    console.log(hoveredImage);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  // prevent images from search results from displaying
  useEffect(() => {
    if (location.pathname === "/my-profile") {
      dispatch(imagesReset());
    }
  }, [location.pathname]);

  return (
    <div className="main-container t-mt-44">
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
                {hoveredImage === image ? <ImageHoverOptions /> : <></>}
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
      <div className="page-overlay"></div>
    </div>
  );
};

export default Images;