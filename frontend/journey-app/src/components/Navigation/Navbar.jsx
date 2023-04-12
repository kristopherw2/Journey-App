import { Link, useLocation } from "react-router-dom";
import Signout from "./Signout";
import "./Navbar.css";

function Navbar({ isLoggedIn, onLogout }) {
  const location = useLocation();
  const hideNavbarOnPages = ["/","/signin", "/signup"];

  if (hideNavbarOnPages.includes(location.pathname)) {
    return null; // hide Navbar on signin and signup pages
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/dashboard">
        <img src="/navlogo.png" alt="Logo" className="navbar-brand" />
      </a>
      <div id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/dashboard">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/createpost" className="nav-link">
              Create
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/parks" className="nav-link">
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Signout onLogout={onLogout} />
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

