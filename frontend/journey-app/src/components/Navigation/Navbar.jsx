import "./Navbar.css";
function Navbar() {
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
            <li class="nav-item">
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
