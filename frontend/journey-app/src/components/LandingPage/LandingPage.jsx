// import React from "react";
// import SignIn from "./SignInForm";

// import "./LandingPage.css";
// function LandingPage() {
//   return (
//     <div id="landing-container">
//       {/* <button id="signup-btn" type="button">
//         Sign up
//       </button> */}
//       <SignIn />
//     </div>
//   );
// }

// export default LandingPage;


///chads changes below and the old code is saved as comment above/////

import React from "react";
import SignIn from "./SignInForm";
import "./LandingPage.css";

function LandingPage({ onLogin }) {
  return (
    <div id="landing-container">
      <SignIn onLogin={onLogin} />
    </div>
  );
}

export default LandingPage;

