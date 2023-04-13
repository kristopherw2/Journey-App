import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = () => {
  const [navigate, setNavigate] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      photo: "",
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
      formData.append("photo", values.photo);
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
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is required";
      }
      if (!values.description) {
        errors.description = "Description is required";
      }
      if (!values.difficulty_level) {
        errors.difficulty_level = "Difficulty level is required";
      }
      return errors;
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
          withCredentials: true,
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

    const formData2 = new FormData();
    formData2.append("file", file);
    formData2.append("upload_preset", "nwwq4hji");

    console.log("Calling Cloudinary");

    axios
      .post("https://api.cloudinary.com/v1_1/dnstta9dr/image/upload", formData2)

      .then((response) => {
        setImageURL(response.data.url);
        console.log("URL FROM CLOUDINARY");
        console.log(response.data.url);
        formik.setFieldValue("photo", response.data.url);
      })
      .catch((error) => {});
  };

  return (
    <div style={{ 
      backgroundImage: "url(./createbg.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: 'rgba(0,0,0,0.8)',
    }}>
    <div className="wrapper">
      {navigate && <Navigate to="/dashboard" />}
      <form onSubmit={formik.handleSubmit}>
        <div className="box header">
          {/* <form onSubmit={formik.handleSubmit}> */}
          <label htmlFor="title" style={{ color: "black", fontWeight: "bold" }}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title" // added name attribute
            value={formik.values.title}
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="error">{formik.errors.title}</div>
          )}
          {/* </form> */}
        </div>
        <div className="box content">
          <div className="file-upload-container">
            {!formik.values.previewImage && (
              <>
                <label
                  htmlFor="image"
                  className="file-upload-label"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Select an Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image" // added name attribute
                  accept="image/*"
                  onChange={handleImageSelect}
                  onBlur={formik.handleBlur} // added onBlur event
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
                <p />
                <button
                  type="button"
                  style={{ maxWidth: "50vw", display: "block", margin: "auto" }}
                  onClick={() => {
                    formik.setFieldValue("image", "");
                    formik.setFieldValue("previewImage", "");
                  }}
                >
                  Clear Image
                </button>
              </>
            )}
          </div>
        </div>
        <div className="box sidebar">
          <label
            htmlFor="description"
            style={{ color: "black", fontWeight: "bold" }}
          >
            Description:
          </label>
          <textarea
            id="description"
            rows="10"
            cols="18"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <div className="error">{formik.errors.description}</div>
          )}
        </div>
        <div className="box footer">
          <div>
            <label
              htmlFor="difficulty_level"
              style={{ color: "black", fontWeight: "bold" }}
            >
              Difficulty (optional):
            </label>
          </div>

          <div>
            <select
              id="difficulty_level"
              name="difficulty_level" // added name attribute
              value={formik.values.difficulty_level}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={{ marginBottom: "10px" }}
            >
              <option value="">Select difficulty</option>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.difficulty_level &&
            formik.errors.difficulty_level && (
              <div className="error">{formik.errors.difficulty_level}</div>
            )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              type="submit"
              className="save-journey-btn"
              style={{
                fontSize: "14px",
                padding: "8px 16px",
                color: "primary",
              }}
            >
              Save your journey
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
  );
};
export default CreatePost;
