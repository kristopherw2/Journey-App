import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LandingPage from "./components/LandingPage/LandingPage";
import SignUpForm from "./components/LandingPage/SignUpForm";
import UserDashBoard from "./components/UserDashboard/UserDashboard";
import SignInForm from "./components/LandingPage/SignInForm";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/dashboard" element={<UserDashBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
