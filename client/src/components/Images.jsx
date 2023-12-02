import "../CSS/Images.css";

import GetImages from "../API/Remote/api";
import { useState } from "react";

const Images = () => {
  const [images, setImages] = useState(null);
  const [userSearchTerm, setUserSearchTerm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getImages = await GetImages(userSearchTerm);
    setImages(getImages);
    console.log(images);
  };

  const handleInputChange = (e) => {
    setUserSearchTerm(e.target.value);
    console.log(userSearchTerm);
  };

  return (
    <div className="images-main-container">
      <form className="flex" onSubmit={handleSubmit}>
        <input
          type="text"
          id="inputPassword5"
          className="form-control"
          onChange={handleInputChange}
        />
      </form>
      <div className="all-images">
        {images ? (
          images.results.map((image) => (
            <div key={image.id} className="search-image outline">
              <img src={image.urls.full} alt="Download Link" className="tw-outline"/>
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default Images;
