// Post.jsx
import pencilEdit from "../../assets/pencil-edit.svg";
import trash from "../../assets/trash.svg";
import mapMarker from "../../assets/map-marker.png";
import Description from "./Description";
import "./Posts.css";
import "./UpdateForm.css";
import { useEffect, useState } from "react";
import axios from "axios";
import UpdateForm from "./UpdateForm";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../../utils/Loader";
import MapModal from "./MapModal";

function Posts() {
  const [userPosts, setUserPosts] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState("");
  const [originalDesc, setOriginalDesc] = useState("");
  const [originalLevel, setOriginalLevel] = useState("");
  const [originalTitle, setOriginalTitle] = useState("");
  const [show, setShow] = useState(false);
  const [showMap, setShowMap] = useState(false);
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
        console.log(response.data.results, "these are the results")
        console.log(response.data.results[0].latitude, response.data.results[0].longitude, "this is the latitude and longitude");

        setDataUpdated(false);
      });
  }, [dataUpdated]);

  let copiedUserPosts = [...userPosts];

  const handleMap = (e) => {
    console.log(
      `Viewing Map for post id : ${e.target.getAttribute("post_id")}`
    );
    let item_id = e.target.getAttribute("post_id");
    // getPostDetailsByID(item_id);
    setShowMap(true);
  };

  const handleDelete = (e) => {
    console.log(
      `Trying to Delete a post : ${e.target.getAttribute("post_id")}`
    );
    let item_id = e.target.getAttribute("post_id");
    axios
      .delete(
        `${`http://${import.meta.env.VITE_BASE_URL
        }/api/userposts/`}${item_id}/`,
        options
      )
      .then(() => {
        setDataUpdated(true);
        alert("Successfully Deleted Your Post!");
      });
  };

  // Function to get the value entered in the update form
  const handleOnChangeDesc = (event) => setOriginalDesc(event.target.value);
  const handleOnChangeTitle = (event) => setOriginalTitle(event.target.value);
  const handleOnChangeLevel = (event) => setOriginalLevel(event.target.value);

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
        `${`http://${import.meta.env.VITE_BASE_URL
        }/api/userposts/`}${item_id}/`,
        options
      );
      console.log("Able to Get Data");
      console.log(response.data);
      setItemToUpdate(response.data);
      setOriginalDesc(response.data.description);
      setOriginalLevel(response.data.difficulty_level);
      setOriginalTitle(response.data.title);
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
        `${`http://${import.meta.env.VITE_BASE_URL
        }/api/userposts/`}${e.target.getAttribute("post_id")}/`,
        {
          title: originalTitle,
          description: originalDesc,
          difficulty_level: originalLevel,
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

  const handleCloseMap = () => {
    setShowMap(false);
  };

  const fetchPosts = async () => {
    console.log(userPosts);
    return axios
      .get(
        `http://${import.meta.env.VITE_BASE_URL
        }/api/userposts/?page=${nextPage}`,
        options
      )
      .then((response) => {
        return response.data.results;
      });
  };

  const fetchData = async () => {
    const loadPages = await fetchPosts();
    console.log(loadPages, "load pages is firing");
    setUserPosts([...userPosts, ...loadPages]);
    if (loadPages.length === 0) {
      setNoMore(false);
    }

    setNextPage(nextPage + 1);
  };

  const postItems = copiedUserPosts.map((item) => {
    return (
      <>
        <div name={item.id} id="post-container">
          <h3>{item.title}</h3>
          <img
            className="util-map"
            id="map-btn"
            post_id={item.id}
            src={mapMarker}
            onClick={handleMap}
          />
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
            src={item.photo}
          />

        </div>
        <Description description={item.description} />
        <div id="modal-container">
          <UpdateForm
            show={show}
            handleClose={handleClose}
            originalDesc={originalDesc}
            originalLevel={originalLevel}
            originalTitle={originalTitle}
            handleOnChangeDesc={handleOnChangeDesc}
            handleOnChangeTitle={handleOnChangeTitle}
            handleOnChangeLevel={handleOnChangeLevel}
            handleClickSaveUpdate={handleClickSaveUpdate}
            itemToUpdate={itemToUpdate}
          />
          <div>
            <MapModal
              showMap={showMap}
              handleCloseMap={handleCloseMap}
              lat={item.latitude}
              long={item.longitude}
            />
          </div>
        </div>
      </>
    );
  });

  return (
    <InfiniteScroll
      dataLength={userPosts.length} //This is important field to render the next data
      next={fetchData}
      hasMore={noMore}
      loader={<Loader />}
      endMessage={null}
    >
      {postItems}
    </InfiniteScroll>
  );
}

export default Posts;
