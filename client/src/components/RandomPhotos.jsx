import "../CSS/Images.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { imagesReset, addItems } from "../features/imagesSlice";
import { urlBaseFalse, urlBaseTrue } from "../features/isUrlBaseSlice";
import { useState, useEffect } from "react";
import { GetRandomPhotos } from "../API/Remote/api";
import _ from "lodash";

const RandomPhotos = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [randomImages, setRandomImages] = useState([]);

  const urlBase = useSelector((state) => state.urlBase.value);
  const currentPage = useSelector((state) => state.currentPage.value);

  const randomPhotos = async () => {
    try {
      const photos = await GetRandomPhotos();
      if (photos) {
        setRandomImages((prevPhotos) => [...prevPhotos, ...photos]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setRandomImages([]);
    if (location.pathname === "/") {
      randomPhotos()
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = _.debounce(() => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY / pageHeight >= 0.75) {
        randomPhotos()
      }
    }, 40); // Adjust the debounce delay as needed

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="main-container t-mt-48">
      <div className="gallery-container">
        {!randomImages ? (
          <></>
        ) : (
          randomImages.map((image, index) => (
            <div className="gallery-image" key={index}>
              {image.urls && image.urls.regular && (
                <img src={image.urls.regular} alt={image.alt_description} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RandomPhotos;
