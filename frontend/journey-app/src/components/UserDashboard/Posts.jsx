import testPhoto from "../../assets/testphoto.jpg";
import pencilEdit from "../../assets/pencil-edit.svg"
import trash from "../../assets/trash.svg"
import "./Posts.css";
function Posts() {
  return (
    <div id="post-container">
      <img class="util-btn" src={pencilEdit} />
      <img class="util-btn" src={trash} />
      <img src={testPhoto} />
    </div>
  );
}

export default Posts;
