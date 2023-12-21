import { useParams } from "react-router-dom";
import { getSingleImage } from "../API/Remote/api";
import { useEffect, useState } from "react";

const PhotoPage = () => {
  const { id } = useParams();

  const [singleImage, setSingleImage] = useState(null);

  const fetchSingleImage = async () => {
    const image = await getSingleImage(id);
    setSingleImage(image);
    console.log(image);
    return image;
  };

  useEffect(() => {
    fetchSingleImage();
  }, [id]);

  return (
    <div>
      {singleImage ? ( // Conditionally render the image component
        <div className="t-pt-40">
          <img src={singleImage.urls.regular} alt={singleImage.alt_description} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PhotoPage;
