import testPhoto from "../../assets/testphoto.jpg";
import pencilEdit from "../../assets/pencil-edit.svg";
import trash from "../../assets/trash.svg";
import Description from "./Description";
import Comments from "./Comments";
import "./Posts.css";
import "./UpdateForm.css";
import LeaveComment from "./LeaveComment";
import { useEffect, useState } from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../utils/Loader";
import EndMessage from "../../utils/EndMessage";

function Posts() {
  const [userPosts, setUserPosts] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState("");
  const [originalDesc, setOriginalDesc] = useState("");
  const [show, setShow] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [noMore, setNoMore] = useState(true);
  const [nextPage, setNextPage] = useState(2);

  const my_token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${my_token}`,
    },
    withCredentials: true,
  };

  useEffect(() => {
    axios
      .get(`http://${import.meta.env.VITE_BASE_URL}/api/userposts/`, options)
      .then((response) => {
        setUserPosts(response.data.results);
        setDataUpdated(false);
      });
  }, [dataUpdated]);

  let copiedUserPosts = [...userPosts];

  const handleDelete = (e) => {
    console.log(
      `Trying to Delete a post : ${e.target.getAttribute("post_id")}`
    );
    let item_id = e.target.getAttribute("post_id");
    axios
      .delete(
        `${`http://${
          import.meta.env.VITE_BASE_URL
        }/api/userposts/`}${item_id}/`,
        options
      )
      .then(() => {
        setDataUpdated(true);
        alert("Successfully Deleted Your Post!");
      });
  };

  // Function to get the value entered in the update form
  const handleOnChange = (event) => setOriginalDesc(event.target.value);

  const handleUpdate = (e) => {
    console.log(
      `Trying to Update a post : ${e.target.getAttribute("post_id")}`
    );
    let item_id = e.target.getAttribute("post_id");
    getPostDetailsByID(item_id);
    setShow(true);
  };

  // Function that calls the POST API to update the post
  const getPostDetailsByID = async (item_id) => {
    try {
      const response = await axios.get(
        `${`http://${
          import.meta.env.VITE_BASE_URL
        }/api/userposts/`}${item_id}/`,
        options
      );
      console.log("Able to Get Data");
      console.log(response.data);
      setItemToUpdate(response.data);
      setOriginalDesc(response.data.description);
    } catch (err) {
      console.log(err);
      alert(`Oops Something Wrong: ${err}`);
    }
  };

  const handleClickSaveUpdate = (e) => {
    console.log(e.target.getAttribute("post_id"));
    console.log(originalDesc);
    axios
      .patch(
        `${`http://${
          import.meta.env.VITE_BASE_URL
        }/api/userposts/`}${e.target.getAttribute("post_id")}/`,
        {
          description: originalDesc,
        },
        options
      )
      .then((response) => {
        setItemToUpdate(response.data);
        setDataUpdated(true);
        setShow(false);
        alert("Post Successfully Updated!");
      });
  };

  //Function to close the Edit Modal
  const handleClose = () => {
    setShow(false);
  };

  const fetchPosts = async () => {
    let data;
    return axios
      .get(
        `http://${
          import.meta.env.VITE_BASE_URL
        }/api/userposts/?page=${nextPage}`,
        options
      )
      .then((response) => {
        // setUserPosts([...userPosts, ...response.data.results]);
        return response.data.results;
      });
  };

  const fetchData = async () => {
    const loadPages = await fetchPosts();
    console.log(loadPages);
    setUserPosts([...userPosts, ...loadPages]);
    if (loadPages.length === 0 || loadPages.length < 20) {
      setNoMore(false);
    }

    setNextPage(nextPage + 1);
  };

  return copiedUserPosts.map((item) => {
    return (
      <InfiniteScroll
        dataLength={userPosts.length} //This is important field to render the next data
        next={fetchData}
        hasMore={noMore}
        loader={<Loader />}
        endMessage={null}
      >
        <div name={item.id} id="post-container">
          <h3>{item.title}</h3>
          <img
            className="util-btn"
            id="pencil-btn"
            post_id={item.id}
            src={pencilEdit}
            onClick={handleUpdate}
          />
          <img
            className="util-btn"
            id="trash-btn"
            post_id={item.id}
            src={trash}
            onClick={handleDelete}
          />
          <img
            src={`http://${import.meta.env.VITE_BASE_URL}:8000/${
              item.image_url
            }`}
          />
        </div>
        <Description description={item.description} />
        <div id="modal-container">
          <UpdateForm
            show={show}
            handleClose={handleClose}
            originalDesc={originalDesc}
            handleOnChange={handleOnChange}
            handleClickSaveUpdate={handleClickSaveUpdate}
            itemToUpdate={itemToUpdate}
          />
        </div>
      </InfiniteScroll>
    );
  });
}

export default Posts;
