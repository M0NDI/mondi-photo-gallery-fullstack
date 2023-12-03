import "../CSS/Navbar.css";
import profileLogo from '../assets/images/profile.svg'

const Navbar = ({handleSubmit, handleInputChange}) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg t-bg-cyan-600 t-fixed t-top-0">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex t-w-full t-h-8" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                onChange={handleInputChange}
              />
              <div className="t-h-full t-w-12 t-flex t-justify-center t-items-center">
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
