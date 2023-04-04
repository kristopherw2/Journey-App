import React, { useState, useEffect } from "react";
import axios from "axios";
import './WebcamPage.css';

const WebcamPage = () => {
  const [webcams, setWebcams] = useState([]);
  const [selectedWebcam, setSelectedWebcam] = useState(null);

  useEffect(() => {
    const fetchWebcams = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/webcams/`, {
          headers: { Authorization: `Token ${token}` },
        });
        console.log("API response:", response);
        const activeWebcams = response.data.filter(
          (webcam) => webcam.status === "Active" && webcam.isStreaming !== false
        );
        setWebcams(activeWebcams);
      } catch (error) {
        console.error("Error fetching webcams data: ", error);
      }
    };

    fetchWebcams();
  }, []);


  const handleWebcamChange = (e) => {
    const webcamId = e.target.value;
    if (webcamId) {
      setSelectedWebcam(webcamId);
    } else {
      setSelectedWebcam(null);
    }
  };

  const selectedWebcamData = webcams.find((webcam) => webcam.id === selectedWebcam);

  return (
    <div className="container">
      <h1>National Park Webcams</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <label htmlFor="webcamSelect">Select a Webcam: </label>
        <select id="webcamSelect" value={selectedWebcam || ''} onChange={handleWebcamChange}>
          <option value="">--Select a Webcam--</option>
          {webcams.map((webcam) => (
            <option key={webcam.id} value={webcam.id}>
              {webcam.title}
            </option>
          ))}
        </select>
      </div>
      {selectedWebcamData && (
        <div>
          <h3>{selectedWebcamData.title}</h3>
          <p>{selectedWebcamData.description}</p>
          <iframe
            src={selectedWebcamData.url}
            title={selectedWebcamData.title}
            width="640"
            height="480"
            frameBorder={0}
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};

export default WebcamPage;