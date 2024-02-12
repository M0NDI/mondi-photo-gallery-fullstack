import "../CSS/ImageHoverOptions.css";
import { useSelector } from "react-redux";

const LikeImageHoverOption = () => {
  // redux states
  const isImageLiked = useSelector((state) => state.isImageLiked.value);

  return (
    <div className="image-hover-options t-absolute t-z-20">
      <div className={`hover-icon-heart t-cursor-pointer`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="heart-icon"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            fill={isImageLiked ? "none" : "none"}
            stroke={isImageLiked ? "red" : "white"}
          />
        </svg>
      </div>
    </div>
  );
};

export default LikeImageHoverOption;
