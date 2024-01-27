import { Link } from "react-router-dom";
import "../CSS/ImageHoverOptions.css";
import { useDispatch, useSelector } from "react-redux";

const RemoveImageHoverOption = () => {
  // redux states
  const isImageLiked = useSelector((state) => state.isImageLiked.value);
  const isUserLoggedIn = useSelector((state) => state.isUserLoggedIn.value);

  return (
    <div className="image-hover-options t-absolute t-z-20">
      <div className={`hover-icon-heart t-cursor-pointer ${isImageLiked ? "imageIsLiked" : ""}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          fill={isImageLiked ? "none" : "none"}
          stroke={isImageLiked ? "red" : "white"}
          className=""
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  );
};

export default RemoveImageHoverOption;
