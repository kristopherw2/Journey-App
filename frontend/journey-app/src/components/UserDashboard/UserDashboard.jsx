import React, { useState, useEffect } from "react";
import Navbar from "../Navigation/Navbar";
import Posts from "./Posts";
import Description from "./Description";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import map from "../../assets/map.jpeg";

function UserDashBoard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };



  return (
    <div>
      <Navbar key={isLoggedIn} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div style={{ marginTop: "75px", position: "fixed", top: 0, left: 0, zIndex: 1 }}>
        <Link to="/userposts" style={{ paddingLeft: "20px" }}>MapIT</Link>
      </div>
      <div style={{ paddingTop: "100px" }}>
        <Posts />
      </div>
    </div>
  );



}

export default UserDashBoard;

