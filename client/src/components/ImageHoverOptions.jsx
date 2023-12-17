import '../CSS/ImageHoverOptions.css'
import heartIcon from '../assets/images/icons/heartIcon.svg'

const ImageHoverOptions = () => {
  return (
    <div className="image-hover-options t-absolute t-z-20">
      <div className="hover-icon-heart t-cursor-pointer">
        <img src={heartIcon}/>
      </div>
    </div>
  );
};

export default ImageHoverOptions;