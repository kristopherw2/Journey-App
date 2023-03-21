import { Outlet, Navigate } from "react-router-dom";

// This component is supposed to protect routes
function PrivateRoutes() {
  //grabs the localStorage Token if there is one
  let auth = localStorage.getItem("token");
  //checks to see if the token is present and will direct to the appropriate page. If no token then goes to landing page
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
