import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import "./CreatePost.css";
import Cookies from "js-cookie";
import {Button, Form} from 'react-bootstrap'


const CreatePost2 = () => {
  const [navigate, setNavigate] = useState(false);
  const {imageURL, setImageURL} = useState("")


  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "nwwq4hji");


    console.log("Calling Cloudinary")

    axios.post("https://api.cloudinary.com/v1_1/dnstta9dr/image/upload", formData)
    .then((response) =>{
      // setImageURL(response.data.url)
      console.log("URL FROM CLOUDINARY")
      console.log(response.data.url)
      // formik.setFieldValue("photo", response.data.url);

    })

    if (file) {
      try {
        console.log("Calling Extract")
        const response = await axios.post(
          `http://${import.meta.env.VITE_BASE_URL}/api/extract_location/`,
          file,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // Added this line
          }
        );
  
        const { latitude, longitude } = response.data;
        console.log("Extracted location:", latitude, longitude);
        // formik.setFieldValue("latitude", latitude);
        // formik.setFieldValue("longitude", longitude);
      } catch (error) {
        console.error("Error extracting location:", error);
      }
    }

    





  };

  return navigate ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="wrapper">
      <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Add a photo to your post</Form.Label>
            <Form.Control type="file" onChange= {handleImageSelect}/> <br />
          </Form.Group>
    </div>
  );
};
export default CreatePost2;
