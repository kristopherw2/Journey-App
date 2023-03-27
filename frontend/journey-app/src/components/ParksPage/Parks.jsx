// components/ParksPage/Parks.js
import { Link } from "react-router-dom";
import "./Parks.css"; // Import CSS for styling the links

const Parks = () => {
  return (
    <div>
      <h1>Explore the U.S. National Parks</h1>
      <div className="parks-links">
        <Link to="/webcams" className="parks-link">
          <div className="parks-link-card" style={{ backgroundImage: "url('/explore.jpeg')" }}>
            <h2>Webcams</h2>
          </div>
        </Link>
        <Link to="/activities" className="parks-link">
          <div className="parks-link-card" style={{ backgroundImage: "url('/explore2.jpeg')" }}>
            <h2>Activities</h2>
          </div>
        </Link>
        <Link to="/tours" className="parks-link">
          <div className="parks-link-card" style={{ backgroundImage: "url('/explore3.jpeg')" }}>
            <h2>Tours</h2>
          </div>
        </Link>
        <Link to="/videos" className="parks-link">
          <div className="parks-link-card" style={{ backgroundImage: "url('/explore4.jpeg')" }}>
            <h2>Videos</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Parks;