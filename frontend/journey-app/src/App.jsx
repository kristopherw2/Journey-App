import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUpForm from "./components/LandingPage/SignUpForm";
import UserDashBoard from "./components/UserDashboard/UserDashboard";
import SignInForm from "./components/LandingPage/SignInForm";
import PostInteraction from "./components/PostInteraction/PostInteraction";
import CreatePost from "./components/CreatePost/CreatePost";
import UserPosts from "./components/PostInteraction/UserPosts"; // Not used rather than UserDashboard but keeping code as reference
import PrivateRoutes from "./utils/PrivateRoutes";
import Navbar from "./components/Navigation/Navbar";
import React, { useState } from "react";
import Parks from "./components/ParksPage/Parks";
import WebcamPage from "./components/ParksPage/WebcamPage";
import Activities from "./components/ParksPage/Activites";
import Videos from "./components/ParksPage/Videos";
import Tours from "./components/ParksPage/Tours";
import TourDetails from "./components/ParksPage/TourDetails";
import PostDetail from "./components/PostInteraction/PostDetail";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
  };
  return (
    <div className="App">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />{" "}
        {/* Include Navbar component */}
        <Routes>
          <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/signin" element={<SignInForm />} />

          <Route element={<PrivateRoutes />}>
            <Route exact path="/dashboard" element={<UserDashBoard />} />
            <Route exact path="/post" element={<PostInteraction />} />
            <Route exact path="/createpost" element={<CreatePost />} />
            <Route exact path="/userposts" element={<UserPosts />} />
            <Route exact path="/parks" element={<Parks />} />
            <Route exact path="/webcams" element={<WebcamPage />} />
            <Route exact path="/activities" element={<Activities />} />
            <Route exact path="/videos" element={<Videos />} />
            <Route exact path="/tours" element={<Tours />} />
            <Route exact path="/tours/:id" element={<TourDetails />} />
            <Route path="/userposts/:id" element={<PostDetail onDelete={() => { }} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
