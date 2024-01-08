import { useParams } from "react-router-dom";
import { getSingleImage } from "../API/Remote/api";
import { useEffect } from "react";
import { imageReset, addItem } from "../redux/singleImageSlice";
import { useSelector, useDispatch } from "react-redux";

const PhotoPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch()

  const singleImage = useSelector((state) => state.singleImage.value)

  const fetchSingleImage = async () => {
    try {
      const image = await getSingleImage(id);
      if (image) {
        dispatch(addItem(image));
        console.log(image);
        console.log(singleImage)
      }
      return image;
    } catch (error) {
      console.error("Error fetching single image:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchSingleImage();
    dispatch(imageReset())
  }, [id]);

  return (
    <div>
      {singleImage.length > 0 && singleImage[0].urls ? (
        <div className="t-pt-40 t-flex t-absolute">
          <img src={singleImage[0].urls.regular} alt={singleImage.alt_description} className="t-w-1/3 t-outline"/>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PhotoPage;