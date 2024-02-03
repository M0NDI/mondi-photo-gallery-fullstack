import "../CSS/ImageHoverOptions.css";
import { useSelector } from "react-redux";

const RemoveImageHoverOption = () => {
  // redux states
  const isImageLiked = useSelector((state) => state.isImageLiked.value);

  return (
    <div className="image-hover-options t-absolute t-z-20">
      <div className={`hover-icon-heart t-cursor-pointer ${isImageLiked ? "imageIsLiked" : ""}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          fill={isImageLiked ? "none" : "none"}
          stroke={isImageLiked ? "red" : "white"}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>
    </div>
  );
};

export default RemoveImageHoverOption;