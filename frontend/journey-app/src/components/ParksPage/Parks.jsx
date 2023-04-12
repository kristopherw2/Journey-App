// components/ParksPage/Parks.js
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Parks.css"; // Import CSS for styling the links

const Parks = () => {
  return (
    <div style={{
      backgroundImage: "url(./parksbg.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center left",
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: 'rgba(0,0,0,0.8)',
    }}>
      <center>


        <Container>
          <h1 className="parks-title" style={{ textAlign: "center", maxfontSize: "2.5em" }}>Explore the U.S. National Parks</h1>
          <div className="parks-links">
            <Link to="/webcams" className="parks-link">
              <div className="parks-link-card" style={{ backgroundImage: "url('/explore.jpeg')", backgroundPosition: "center 30%", textAlign: "left" }}>
                <h2>Webcams</h2>
              </div>
            </Link>
            <Link to="/activities" className="parks-link">
              <div className="parks-link-card" style={{ backgroundImage: "url('/explore2.jpeg')", backgroundPosition: "center 60%", textAlign: "left" }}>
                <h2>Activities</h2>
              </div>
            </Link>
            <Link to="/tours" className="parks-link">
              <div className="parks-link-card" style={{ backgroundImage: "url('/explore3.jpeg')", backgroundPosition: "center 88%", textAlign: "left" }}>
                <h2>Tours</h2>
              </div>
            </Link>
            <Link to="/videos" className="parks-link">
              <div className="parks-link-card" style={{ backgroundImage: "url('/explore4.jpeg')", backgroundPosition: "center 65%", backgroundSize: "90%", textAlign: "left" }}>
                <h2>Videos</h2>
              </div>
            </Link>
            <Link to="/campgrounds" className="parks-link campgrounds-link">
              <div className="parks-link-card" style={{ backgroundImage: "url('/explore5.jpg')", textAlign: "left", backgroundPosition: "center 20%" }}>
                <h2>Camping</h2>
              </div>
            </Link>
            <Link to="/experiences" className="parks-link">
              <div className="parks-link-card" style={{ backgroundImage: "url('/explore6.jpg')", textAlign: "left", backgroundPosition: "center 18%" }}>
                <h2>To Do</h2>
              </div>
            </Link>
          </div>
        </Container>
      </center>
    </div>
  );
};

export default Parks;
