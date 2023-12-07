/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import "../CSS/Images.css";

const Images = ({ images }) => {
  return (
    <div className="main-container">
      <div className="gallery-container">
        {!images ? (
          <div className="spinner-border t-absolute t-mt-24" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          // TRY FLEX DIRECTION COL FOR BETTER GRID LAYOUT
          images.map((image, index) => (
            <div className="gallery-items" key={index}>
              <div className="gallery-image">
                <img src={image.urls.regular} alt={images.alt_description} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Images;
