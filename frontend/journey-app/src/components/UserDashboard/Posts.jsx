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

function Posts() {
  const [userPosts, setUserPosts] = useState([]);
  const [itemToUpdate, setItemToUpdate] = useState("")
  const [originalDesc, setOriginalDesc] =useState("")
  const [show, setShow] = useState(false)
  const [dataUpdated, setDataUpdated] = useState(false)



  const my_token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-type": "application/json",
      "Authorization": `Token ${my_token}`
    },
    withCredentials: true, 
  };

  const url = "http://127.0.0.1:8000/api/userposts/";

  useEffect(() => {
    // const url = "http://127.0.0.1:8000/api/userposts/";
    axios.get(url, options).then((response) => {
      setUserPosts(response.data.results);
      setDataUpdated(false)
    });
  }, [dataUpdated]);

  let copiedUserPosts = [...userPosts];

  const handleDelete = (e) => {
    console.log(`Trying to Delete a post : ${e.target.getAttribute('post_id')}`)
    let item_id = e.target.getAttribute('post_id')
    axios
      .delete(`${url}${item_id}/`,options)
      .then(() =>  {
        setDataUpdated(true)
        alert("Successfully Deleted Your Post!")
      })
    }

   // Function to get the value entered in the update form
   const handleOnChange = (event) => setOriginalDesc(event.target.value);

  const handleUpdate = (e) => {
    console.log(`Trying to Update a post : ${e.target.getAttribute('post_id')}`)
    let item_id = e.target.getAttribute('post_id')
    getPostDetailsByID(item_id)
    setShow(true)
    }

  // Function that calls the POST API to update the post
  const getPostDetailsByID = async (item_id) => {
    try {
      const response = await axios.get(`${url}${item_id}/`, options)
      console.log("Able to Get Data")
      console.log(response.data)
      setItemToUpdate(response.data)
      setOriginalDesc(response.data.description)
    } catch (err) {
      console.log(err)
      alert(`Oops Something Wrong: ${err}`)
    }
  };

  const handleClickSaveUpdate = (e) => {
    console.log(e.target.getAttribute('post_id'))
    console.log(originalDesc)
    axios
      .patch(`${url}${e.target.getAttribute('post_id')}/`, {
        description: originalDesc
      }, options)
      .then((response) => {
        console.log("Updating API")
        console.log(response.data)
        setItemToUpdate(response.data);
        setDataUpdated(true)
        console.log(dataUpdated)
        setShow(false)
        alert("Post Successfully Updated!")
      });
    }

  //Function to close the Edit Modal 
  const handleClose = () => {
    setShow(false)
  } 

  
  return copiedUserPosts.map((item) => {
    return (
      <>
        <div name={item.id} id="post-container">
          <h3>{item.title}</h3>
          <img className="util-btn" 
            id="pencil-btn" 
            post_id ={item.id} 
            src={pencilEdit} 
            onClick={handleUpdate}/>
          <img className="util-btn" 
            id="trash-btn" 
            post_id ={item.id} 
            src={trash} 
            onClick={handleDelete} />
          <img src={testPhoto} />
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
        {/* This will be added Later
          <Comments />
          <LeaveComment />       */}
      </>
    );
  });
}

export default Posts;
