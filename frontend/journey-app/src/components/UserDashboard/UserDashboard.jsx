import Navbar from "../Navigation/Navbar";
import Posts from "./Posts";
import Description from "./Description";
import Comments from "./Comments";
function UserDashBoard() {
  return (
    <div>
      <Navbar />
      <Posts />
      <Description />
      <Comments />
    </div>
  );
}

export default UserDashBoard;
