import testPhoto from "../../assets/testphoto.jpg";
import pencilEdit from "../../assets/pencil-edit.svg";
import trash from "../../assets/trash.svg";
import Description from "./Description";
import Comments from "./Comments";
import "./Posts.css";
import LeaveComment from "./LeaveComment";

function Posts() {
  return (
    <>
      <div id="post-container">
        <img className="util-btn" id="pencil-btn" src={pencilEdit} />
        <img className="util-btn" id="trash-btn" src={trash} />
        <img src={testPhoto} />
      </div>
      <Description />
      <Comments />
      <LeaveComment />
    </>
  );
}

export default Posts;
