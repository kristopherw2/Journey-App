import "./Navbar.css";
import { useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";

function Navbar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [redirect, setRedirect] = useState(false);

  //removes token from localStorage and redirects user to signin
  const logout = () => {
    localStorage.removeItem("token");
    setRedirect(true);
  };

  //checks if redirect is true then sends user to signin page
  if (redirect) {
    return <Navigate to="/signin" replace={false} />;
  }
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
              <Link to="/createpost" className="nav-link"> {/* Chad added a Link component */}
                Create
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Explore
              </a>
            </li>
            <li className="nav-item" onClick={logout}>
              <a className="nav-link disabled" href="#">
                Signout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Signout from './Signout';
// import '../styles/Footer.css'

// const Footer = () => {
//   const navigate = useNavigate();

//   return (
//     <div className=ame="footer-container">
//       <div className=ame="footer">
//         <Link to="/" className=ame="animated-button-link left">Home Page</Link>
//         <Link to="/disclaimers" className=ame="animated-button-link">Disclaimers</Link>
//         <Signout className=ame="signout" onSignout={() => navigate('/login')} />
//       </div>
//     </div>
//   );
// };

// export default Footer;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/Footer.css';

// const Signout = ({ onSignout }) => {
//   const navigate = useNavigate();

//   const handleSignout = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: {
//           Authorization: `Token ${token}`
//         }
//       };
//       await axios.post('http://127.0.0.1:8000/accounts/signout/', null, config);
//       localStorage.removeItem('token');
//       onSignout();
//       navigate('/');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <button className=ame="animated-button-link signout-button" onClick={handleSignout}>
//       Sign out
//     </button>
//   );
// };

// export default Signout;
