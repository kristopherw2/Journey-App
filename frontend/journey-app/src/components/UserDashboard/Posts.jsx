import testPhoto from "../../assets/testphoto.jpg";
import pencilEdit from "../../assets/pencil-edit.svg";
import trash from "../../assets/trash.svg";
import Description from "./Description";
import Comments from "./Comments";
import "./Posts.css";
import LeaveComment from "./LeaveComment";
import { useEffect, useState } from "react";
import axios from "axios";

function Posts() {
  const [userPosts, setUserPosts] = useState([]);
  const my_token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-type": "Application/json",
      Authorization: `Token ${my_token}`,
    },
  };
  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/userposts/";
    axios.get(url, options).then((response) => {
      setUserPosts(response.data.results);
    });
  }, []);

  let copiedUserPosts = [...userPosts];

  return copiedUserPosts.map((item) => {
    return (
      <>
        <div name={item.id} id="post-container">
          <h3>{item.title}</h3>
          <img className="util-btn" id="pencil-btn" src={pencilEdit} />
          <img className="util-btn" id="trash-btn" src={trash} />
          <img src={testPhoto} />
        </div>
        <Description description={item.description} />
        {/* This will be added Later
          <Comments />
          <LeaveComment />       */}
      </>
    );
  });
}

export default Posts;
