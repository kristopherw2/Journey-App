// Navbar.js
import "./Navbar.css";
import { Link } from "react-router-dom";
import Signout from "./Signout";

function Navbar({ isLoggedIn, onLogout }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <div id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home
              </a>
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
    </>
  );
}

export default Navbar;