import "../CSS/Categories.css";
import { Link, useNavigate } from "react-router-dom";

const Categories = ({ setUserSearchTerm, handleSubmit, handleCategoryClick }) => {
  const navigate = useNavigate();

  const categoryClickSearch = (newSearchTerm, event) => {
    // Prevent the default behavior of the event
    event.preventDefault();
  
    // Update the search term
    setUserSearchTerm(newSearchTerm);
    console.log(newSearchTerm)
  
    // Redirect the user to the search results page
    navigate(`/s/${newSearchTerm}`);
    handleSubmit();
  };
  

  return (
    <div className="categories-container scroll-menu t-w-full t-mt-3 t-text-center">
      <Link to="/c/wallpapers" onClick={() => categoryClickSearch("wallpapers")}>
        Wallpapers
      </Link>
      <Link to="/c/3d-renders" onClick={() => categoryClickSearch("3d renders")}>
        3D Renders
      </Link>
      <Link to="/c/nature">Nature</Link>
      <Link to="/c/architecture-interiors">Architecture & Interiors</Link>
      <Link to="/c/experimental">Experimental</Link>
      <Link to="/c/textures-patterns">Textures & Patterns</Link>
      <Link to="/c/film">Film</Link>
      <Link to="/c/animals">Animals</Link>
      <Link to="/c/street-photography">Street Photography</Link>
      <Link to="/c/food-drink">Food & Drink</Link>
      <Link to="/c/travel">Travel</Link>
      <Link to="/c/fashion-beauty">Fashion & Beauty</Link>
      <Link to="/c/people">People</Link>
      <Link to="/c/health-wellness">Health & Wellness</Link>
      <Link to="/c/sports">Sports</Link>
      <Link to="/c/spirituality">Spirituality</Link>
      <Link to="/c/current-events">Current Events</Link>
      <Link to="/c/business-work">Business & Work</Link>
      <Link to="/c/art-culture">Art & Culture</Link>
    </div>
  );
};

export default Categories;
