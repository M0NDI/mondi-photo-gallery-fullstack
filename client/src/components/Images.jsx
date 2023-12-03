import "../CSS/Images.css";

const Images = ({ images }) => {
  return (
    <div className="images-main-container">
      <div className="all-images t-mt-12">
        {images ? (
          images.results.map((image) => (
            <div key={image.id} className="search-image outline">
              <img src={image.urls.full} alt="Download Link" className="tw-outline" />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Images;
