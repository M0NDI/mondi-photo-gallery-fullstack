import "../CSS/Navbar.css";
import profileLogo from '../assets/images/profile.svg'
import mondiLogo from '../assets/images/mondi-logo.png'

const Navbar = ({handleSubmit, handleInputChange}) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg t-fixed t-top-0 t-justify-evenly">
        <div className="container-fluid">
          <img src={mondiLogo} className="t-w-24"/>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 t-flex t-justify-evenly t-w-72 t-text-xl">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
            <form className="d-flex t-w-full t-h-full" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control t-shadow-2xl"
                type="search"
                placeholder="Search"
                onChange={handleInputChange}
              />
              <div className="t-h-full t-w-12 t-flex t-justify-center t-items-center t-ml-4">
                <img src={profileLogo} className="t-h-3/4 t-cursor-pointer"/>
              </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
