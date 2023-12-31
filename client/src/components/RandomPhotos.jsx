import "../CSS/Images.css";
import ImageHoverOptions from "./ImageHoverOptions";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { imagesReset, addItems } from "../features/imagesSlice";
import { urlBaseFalse, urlBaseTrue } from "../features/isUrlBaseSlice";
import { useState, useEffect } from "react";
import { getRandomPhotos } from "../API/Remote/api";
import lodash from "lodash";

const RandomPhotos = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const [randomImages, setRandomImages] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);

  const urlBase = useSelector((state) => state.urlBase.value);
  const currentPage = useSelector((state) => state.currentPage.value);

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

  const handleMouseEnter = (event) => {
    const image = event;
    setHoveredImage(image);
    console.log(hoveredImage);
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
    </div>
  );
};

export default RandomPhotos;
