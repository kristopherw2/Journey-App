import React, { useState, useEffect } from "react";
import Navbar from "../Navigation/Navbar";
import Posts from "./Posts";
import Description from "./Description";
import Comments from "./Comments";

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
      <Posts />
    </div>
  );
}

export default UserDashBoard;

