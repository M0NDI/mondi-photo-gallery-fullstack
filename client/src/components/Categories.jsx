import "../CSS/Categories.css";

const Categories = ({setUserSearchTerm}) => {
  return (
    <div className="categories-container scroll-menu t-w-full t-mt-3">
      <a href="#home" onClick={() =>{setUserSearchTerm("wallpapers")}}>Wallpapers</a>
      <a href="#news">3D Renders</a>
      <a href="#contact">Nature</a>
      <a href="#about">Architecture & Interiors</a>
      <a href="#home">Experimental</a>
      <a href="#news">Textures & Patterns</a>
      <a href="#contact">Film</a>
      <a href="#about">Animals</a>
      <a href="#home">Street Photography</a>
      <a href="#news">Food & Drink</a>
      <a href="#contact">Travel</a>
      <a href="#about">Fashion & Beauty</a>
      <a href="#home">People</a>
      <a href="#news">Health & Wellness</a>
      <a href="#contact">Sports</a>
      <a href="#about">Spirituality</a>
      <a href="#home">Current Events</a>
      <a href="#news">Business & Work</a>
      <a href="#contact">Art & Culture</a>
    </div>
  );
};

export default Categories;