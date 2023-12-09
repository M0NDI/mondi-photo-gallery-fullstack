/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import "../CSS/Images.css";
import { useSelector } from "react-redux";

const Images = () => {
  const images = useSelector((state) => state.images.value);

  return (
    <div className="main-container">
      <div className="gallery-container">
        {!images ? (
          <div className="spinner-border t-absolute t-mt-24" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          images.map((image, index) => (
            <div className="gallery-items" key={index}>
              <div className="gallery-image" key={index}>
                {image.urls && image.urls.regular && (
                  <img src={image.urls.regular} alt={image.alt_description} />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Images;
