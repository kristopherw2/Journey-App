import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUpForm from "./components/LandingPage/SignUpForm";
import UserDashBoard from "./components/UserDashboard/UserDashboard";
import SignInForm from "./components/LandingPage/SignInForm";
import PostInteraction from "./components/PostInteraction/PostInteraction";
import CreatePost from "./components/CreatePost/CreatePost";
import UserPosts from "./components/PostInteraction/UserPosts";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/signin" element={<SignInForm />} />
          <Route exact path="/dashboard" element={<UserDashBoard />} />
          <Route exact path="/post" element={<PostInteraction />} />
          <Route exact path="/createpost" element={<CreatePost />} />
          <Route exact path="/userposts" element={<UserPosts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
