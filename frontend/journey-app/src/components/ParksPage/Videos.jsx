import React, { useState } from 'react';
import axios from 'axios';
import ParkCodes from './ParkCodes';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedPark, setSelectedPark] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (parkCode) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/videos/`, {
        headers: { Authorization: `Token ${token}` },
        params: {
          parkCode,
          limit: 50,
        },
      });
      console.log('Videos response:', response);
      setVideos(response.data.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleParkChange = (e) => {
    const parkName = e.target.value;
    setSelectedPark(parkName);
    const parkCode = Object.keys(ParkCodes).find((key) => ParkCodes[key] === parkName);
    if (parkCode) {
      fetchVideos(parkCode);
    } else {
      setVideos([]);
    }
  };

  return (
    <div className="videos-container">
      <h2 className="videos-header">Videos</h2>
      <div>
        <label htmlFor="parkFilter">Select a park: </label>
        <select id="parkFilter" value={selectedPark} onChange={handleParkChange}>
          <option value="">Select a park</option>
          {Object.entries(ParkCodes).map(([code, name]) => (
            <option key={code} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Loading videos...</p>}
      {!loading && videos.length === 0 && selectedPark !== '' && <p>Sorry, no videos are available for this park.</p>}
      <div className="videos-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <h3>{video.title}</h3>
            <video width="320" height="240" controls>
              {video.versions.map((version) =>
                version.heightPixels === 720 && <source src={version.url} type={version.fileType} />
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