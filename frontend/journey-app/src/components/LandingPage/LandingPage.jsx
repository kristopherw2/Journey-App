import React from "react";
import SignIn from "./SignInForm";

import "./LandingPage.css";
function LandingPage() {
  return (
    <div id="landing-container">
      {/* <button id="signup-btn" type="button">
        Sign up
      </button> */}
      <SignIn />
    </div>
  );
}

export default LandingPage;
