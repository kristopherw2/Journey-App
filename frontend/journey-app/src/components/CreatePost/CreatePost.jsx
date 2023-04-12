import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import "./CreatePost.css";
import Cookies from "js-cookie";

const CreatePost = () => {
  const [navigate, setNavigate] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      latitude: "",
      longitude: "",
      difficulty_level: "",
    },
    onSubmit: async (values) => {
      console.log("Submitting form");
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("image", values.image);
      formData.append("latitude", values.latitude);
      formData.append("longitude", values.longitude);
      formData.append("difficulty_level", values.difficulty_level);

      try {
        console.log("Submitting form data: ", formData);

        const response = await axios.post(
          "http://localhost:8000/api/posts/",
          formData,
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        console.log("Form submission successful: ", response);
        formik.resetForm();
        setNavigate(true);
      } catch (error) {
        console.error("Error submitting form data: ", error);
      }
    },
  });

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("image", file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/extract_location/",
        formData,
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
      formik.setFieldValue("latitude", latitude);
      formik.setFieldValue("longitude", longitude);
    } catch (error) {
      console.error("Error extracting location:", error);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      formik.setFieldValue("previewImage", reader.result);
    };
  };

  return navigate ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="wrapper">
        <div className="box header">
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="title" style={{color: "black", fontWeight: "bold"}}>Title:</label>
            <input
            type="text"
            id="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          </form>
        </div>
          <div className="box content">
          <div className="file-upload-container">
            {!formik.values.previewImage && (
              <>
                <label htmlFor="image" className="file-upload-label" style={{color: "black", fontWeight: "bold"}}>
                  Select an Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
              </>
            )}
              {formik.values.previewImage && (
                <>
              <img
                src={formik.values.previewImage}
                alt="Preview"
                style={{ maxWidth: "100%", borderRadius: "20px" }}
              />
              <p/>
              <button
                type="button"
                style={{ maxWidth: '50vw', display: 'block', margin: 'auto' }}
                onClick={() => {
                formik.setFieldValue('image', '');
                formik.setFieldValue('previewImage', '');
              }}
              >
            Clear Image
            </button>
            </>
          )}
          </div>
        </div>
          <div className="box sidebar">
            <label htmlFor="description" style={{color: "black", fontWeight: 'bold'}}>Description:</label>
            <textarea
              id="description"
              // rows="10"
              // cols="18"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>
        <div className="box footer">
        <div>
          <label htmlFor="difficulty_level" style={{color: "black", fontWeight:"bold"}}>Difficulty (optional):</label>
        </div>

          <div>
            <select
              id="difficulty_level"
              value={formik.values.difficulty_level}
              onChange={formik.handleChange}
              style={{ marginBottom: "10px"}}
            >
              <option value="">Select difficulty</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            className="save-journey-btn"
            style={{ fontSize: "14px", padding: "8px 16px", color: "primary" }}
          >
            Save your journey
          </button>
          </div>
        </div>
    </div>
  );
};
export default CreatePost;