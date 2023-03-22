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
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route exact path="/signup" element={<SignUpForm />} />
          <Route exact path="/signin" element={<SignInForm />} />

          <Route element={<PrivateRoutes />}>
            <Route exact path="/dashboard" element={<UserDashBoard />} />
            <Route exact path="/post" element={<PostInteraction />} />
            <Route exact path="/createpost" element={<CreatePost />} />
            <Route exact path="/userposts" element={<UserPosts />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
