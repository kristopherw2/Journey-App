// Videos.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ParkCodes from "./ParkCodes";
import "./Videos.css";

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedPark, setSelectedPark] = useState("");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(6);
  const lastVideoElementRef = useRef(null);

  // Define a function to fetch videos for a given park from the API
  const fetchVideos = async (parkCode, start, end) => {
    setLoading(true); // Set loading to true while fetching videos
    try {
      const token = localStorage.getItem("token");
      console.log("Selected parkCode:", parkCode);

      // Make a GET request to the API endpoint to retrieve videos for the selected park
      const response = await axios.get(
        `http://${import.meta.env.VITE_BASE_URL}/api/videos/`,
        {
          headers: { Authorization: `Token ${token}` },
          params: {
            parkCode,
            limit: end,
          },
        }
      );
      console.log("Videos response:", response);

      // Update the videos state variable by concatenating the new videos to the existing ones
      setVideos((prevVideos) => [
        ...prevVideos,
        ...response.data.data.slice(start, end),
      ]);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false); // Set loading back to false when the fetch is done
    }
  };

  // Use the useEffect hook to fetch videos whenever the selectedPark, offset, or limit state variables change
  useEffect(() => {
    if (selectedPark) {
      fetchVideos(selectedPark, offset, offset + limit);
    }
  }, [selectedPark, offset, limit]);

  // Use the useEffect hook to set up an IntersectionObserver for infinite scrolling
  useEffect(() => {
    if (loading) return; // If loading is true, do nothing

    // Create an IntersectionObserver object to monitor the last video element in the videos grid
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prevOffset) => prevOffset + limit); // If the last video element is in view, update the offset state variable to trigger the next fetch of videos
        }
      },
      { threshold: 1 }
    );

    if (lastVideoElementRef.current) {
      observer.observe(lastVideoElementRef.current);
    }

    // Clean up the observer when the component unmounts
    return () => {
      if (lastVideoElementRef.current) {
        observer.unobserve(lastVideoElementRef.current);
      }
    };
  }, [loading, limit]);

  // Define a function to handle changes to the selected park in the dropdown menu
  const handleParkChange = (e) => {
    const parkCode = e.target.value;
    setSelectedPark(parkCode); // Update the selectedPark state variable
    setOffset(0); // Reset the offset state variable
    setVideos([]); // Clear the videos state variable
  };

  return (
    <div className="videos-container">
      <h2 className="videos-header">Videos</h2>
      <div className="dropdown-wrapper">
        <div>
          <label htmlFor="parkFilter">Select a park: </label>
          <select id="parkFilter" value={selectedPark} onChange={handleParkChange}>
            <option value="">Select a park</option>
            {Object.entries(ParkCodes).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && <p>Loading videos...</p>}
      {!loading && videos.length === 0 && selectedPark !== "" && (
        <p>Sorry, no videos are available for this park.</p>
      )}
      <div className="videos-grid">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="video-card"
            ref={index === videos.length - 1 ? lastVideoElementRef : null}
          >
            <h3>{video.title}</h3>
            <video width="320" height="240" controls>
              {video.versions.map(
                (version) =>
                  version.heightPixels === 720 && (
                    <source src={version.url} type={version.fileType} />
                  )
              )}
              Your browser does not support the video tag.
            </video>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
