import "./Navbar.css";
import { useState } from "react";
import { Link, Navigate, redirect } from "react-router-dom";

function Navbar() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    // return <Navigate to="/signin" replace={true} />;
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/signin" replace={false} />;
  }
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">
          Navbar
        </a>
        <div id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">
                Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Create
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Explore
              </a>
            </li>
            <li class="nav-item" onClick={logout}>
              <a class="nav-link disabled" href="#">
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
//     <div className="footer-container">
//       <div className="footer">
//         <Link to="/" className="animated-button-link left">Home Page</Link>
//         <Link to="/disclaimers" className="animated-button-link">Disclaimers</Link>
//         <Signout className="signout" onSignout={() => navigate('/login')} />
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
//     <button className="animated-button-link signout-button" onClick={handleSignout}>
//       Sign out
//     </button>
//   );
// };

// export default Signout;
