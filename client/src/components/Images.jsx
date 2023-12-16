/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import "../CSS/Images.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Images = () => {
  const images = useSelector((state) => state.images.value);

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

  return (
    <div className="main-container t-mt-44">
      <div className="gallery-container">
        {columns.map((column, columnIndex) => (
          <div className={`column-${columnIndex + 1}`} key={columnIndex}>
            {column.map((image, index) => (
              <div className="gallery-image" key={index}>
                {image.urls && image.urls.regular && (
                  <img src={image.urls.regular} alt={image.alt_description} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;