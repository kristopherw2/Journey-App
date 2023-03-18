import React, { useState } from "react";
import axios from "axios";
import "./CreatePost.css";

const CreatePost = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("difficulty", difficulty);
    formData.append("user", 1);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/posts/",
        formData
      );
      const newPost = response.data;
      addPost(newPost);

      setTitle("");
      setDescription("");
      setImage("");
      setLatitude("");
      setLongitude("");
      setDifficulty("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageSelect = async (event) => {
    const file = event.target.files[0];
    setImage(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/extract_location/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { latitude, longitude } = response.data;
      setLatitude(latitude);
      setLongitude(longitude);
    } catch (error) {
      console.error("Error extracting location:", error);
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  return (
    <div class="wrapper">
      <div class="box header">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </div>
      <div className="box content">
        <div className="file-upload-container">
          {!previewImage && (
            <>
              <label htmlFor="image" className="file-upload-label">
                Choose an Image
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
          {!previewImage && (
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          )}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
      </div>

      <div className="box sidebar">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          rows="10"
          cols="22"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div class="box footer">
        <div>
          <label htmlFor="difficulty">Difficulty (optional):</label>
        </div>
        <div>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
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
            style={{ fontSize: "14px", padding: "8px 16px" }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
