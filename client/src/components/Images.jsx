/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect } from "react";
import "../CSS/Images.css";

const Images = ({ images, loading }) => {
  return (
    <div className="main-container">
      <div className="gallery-container t-pt-24">
        {images ? (
          images.map((image, index) => (
            <div className="gallery-items" key={index}>
              
              <div className="gallery-image">
                <img src={image.urls.regular} alt={images.alt_description}/>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Images;