/* eslint-disable react/jsx-key */
import "../CSS/Images.css";

const Images = ({ images }) => {
  return (
    <div className="gallery-container t-mt-4">
      {images ? (
        images.results.map((image) => (
          <div className="gallery-items">
            <div key={image.id} className="image">
              <img src={image.urls.raw} alt="Download Link" key={image.id} />
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Images;
