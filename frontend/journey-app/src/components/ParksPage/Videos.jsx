// Videos.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ParkCodes from './ParkCodes';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [selectedPark, setSelectedPark] = useState('');
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(6);
  const lastVideoElementRef = useRef(null);

  const fetchVideos = async (parkCode, start, end) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Selected parkCode:', parkCode);


      const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/videos/`, {
        headers: { Authorization: `Token ${token}` },
        params: {
          parkCode,
          limit: end,
        },
      });
      console.log('Videos response:', response);
      setVideos((prevVideos) => [...prevVideos, ...response.data.data.slice(start, end)]);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPark) {
      fetchVideos(selectedPark, offset, offset + limit);
    }
  }, [selectedPark, offset, limit]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      },
      { threshold: 1 }
    );

    if (lastVideoElementRef.current) {
      observer.observe(lastVideoElementRef.current);
    }

    return () => {
      if (lastVideoElementRef.current) {
        observer.unobserve(lastVideoElementRef.current);
      }
    };
  }, [loading, limit]);

  const handleParkChange = (e) => {
    const parkCode = e.target.value;
    setSelectedPark(parkCode);
    setOffset(0);
    setVideos([]);
  };



  return (
    <div className="videos-container">
      <h2 className="videos-header">Videos</h2>
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
      {loading && <p>Loading videos...</p>}
      {!loading && videos.length === 0 && selectedPark !== '' && (
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
              {video.versions.map((version) =>
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

