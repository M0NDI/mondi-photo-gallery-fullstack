import "../CSS/Categories.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import state reducers
import { resetSearchTerm, updateSearchTerm } from "../features/userSearchTermSlice";
import { increment, pageReset } from "../features/currentPageSlice";
import { imagesReset } from "../features/imagesSlice";
import { useEffect } from "react";

const Categories = ({ handleSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state selectors
  const userSearchTerm = useSelector((state) => state.userSearchTerm.value);
  const currentPage = useSelector((state) => state.currentPage.value);

  const categoryClickSearch = async (newSearchTerm, e) => {
    e.preventDefault();
    dispatch(pageReset());
    dispatch(imagesReset());
    // Reset the page to 1 when a new search or category is selected
    dispatch(updateSearchTerm(newSearchTerm));
    navigate(`/s/${newSearchTerm}`);
    // Await the completion of the async operation in handleSubmit
    if (currentPage == 1) {
      await handleSubmit(newSearchTerm, currentPage, e);
    } else {
      dispatch(pageReset());
      await handleSubmit(newSearchTerm, currentPage, e);
    }
  };

  useEffect(() => {
    dispatch(pageReset());
    dispatch(imagesReset());
  }, [userSearchTerm]);

  return (
    <div className="categories-container scroll-menu t-w-full t-mt-3 t-text-center">
      <Link to="/c/wallpapers" onClick={(e) => categoryClickSearch("wallpapers", e)}>
        Wallpapers
      </Link>
      <Link to="/c/3d-renders" onClick={(e) => categoryClickSearch("3d renders", e)}>
        3D Renders
      </Link>
      <Link to="/c/nature" onClick={(e) => categoryClickSearch("nature", e)}>
        Nature
      </Link>
      <Link
        to="/c/architecture-interiors"
        onClick={(e) => categoryClickSearch("architecture & interior", e)}
      >
        Architecture & Interiors
      </Link>
      <Link to="/c/experimental" onClick={(e) => categoryClickSearch("Experimental", e)}>
        Experimental
      </Link>
      <Link
        to="/c/textures-patterns"
        onClick={(e) => categoryClickSearch("Textures & Patterns", e)}
      >
        Textures & Patterns
      </Link>
      <Link to="/c/film" onClick={(e) => categoryClickSearch("Film", e)}>
        Film
      </Link>
      <Link to="/c/animals" onClick={(e) => categoryClickSearch("Animals", e)}>
        Animals
      </Link>
      <Link
        to="/c/street-photography"
        onClick={(e) => categoryClickSearch("Street Photography", e)}
      >
        Street Photography
      </Link>
      <Link to="/c/food-drink" onClick={(e) => categoryClickSearch("Food & Drink", e)}>
        Food & Drink
      </Link>
      <Link to="/c/travel" onClick={(e) => categoryClickSearch("Travel", e)}>
        Travel
      </Link>
      <Link to="/c/fashion-beauty" onClick={(e) => categoryClickSearch("Fashion & Beauty", e)}>
        Fashion & Beauty
      </Link>
      <Link to="/c/people" onClick={(e) => categoryClickSearch("People", e)}>
        People
      </Link>
      <Link to="/c/health-wellness" onClick={(e) => categoryClickSearch("Health & Wellness", e)}>
        Health & Wellness
      </Link>
      <Link to="/c/sports" onClick={(e) => categoryClickSearch("Sports", e)}>
        Sports
      </Link>
      <Link to="/c/spirituality" onClick={(e) => categoryClickSearch("Spirituality", e)}>
        Spirituality
      </Link>
      <Link to="/c/current-events" onClick={(e) => categoryClickSearch("Current Events", e)}>
        Current Events
      </Link>
      <Link to="/c/business-work" onClick={(e) => categoryClickSearch("Business & Work", e)}>
        Business & Work
      </Link>
      <Link to="/c/art-culture" onClick={(e) => categoryClickSearch("Art & Culture", e)}>
        Art & Culture
      </Link>
    </div>
  );
};

export default Categories;
