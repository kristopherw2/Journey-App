import Navbar from "../Navigation/Navbar";
import testPhoto from "../../assets/testphoto.jpg";
import testMap from "../../assets/map.jpeg";
import "./PostInteraction.css";
function PostInteraction() {
  return (
    <div className="interaction-container">
      <Navbar />
      <img src={testPhoto} />
      <img id="map-interaction" src={testMap} />
    </div>
  );
}

export default PostInteraction;
