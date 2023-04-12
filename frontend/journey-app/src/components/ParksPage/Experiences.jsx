// Experiences.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ParkCodes from './ParkCodes';
import './Experiences.css';


const Experiences = () => {
  const [toDoData, setToDoData] = useState([]);
  const [selectedPark, setSelectedPark] = useState('');
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(6);
  const [hasMoreData, setHasMoreData] = useState(true);
  const lastToDoElementRef = useRef(null);

  const fetchToDo = async (parkCode, offset, limit) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Selected parkCode:', parkCode);

      const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/todo/`, {
        headers: { Authorization: `Token ${token}` },
        params: {
          parkCode,
          limit: offset + limit,
        },
      });

      console.log('To Do response:', response);
      setToDoData((prevToDoData) => [
        ...prevToDoData,
        ...response.data.data.slice(offset, offset + limit),
      ]);

      if (response.data.data.length < limit) {
        setHasMoreData(false);
      } else {
        setHasMoreData(true);
      }
    } catch (error) {
      console.error('Error fetching to-do data:', error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (selectedPark) {
      fetchToDo(selectedPark, offset, limit);
    }
  }, [selectedPark, offset, limit]);


  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreData) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      },
      { threshold: 1 }
    );

    if (lastToDoElementRef.current) {
      observer.observe(lastToDoElementRef.current);
    }

    return () => {
      if (lastToDoElementRef.current) {
        observer.unobserve(lastToDoElementRef.current);
      }
    };
  }, [loading, limit, hasMoreData]);

  const handleParkChange = (e) => {
    const parkCode = e.target.value;
    setSelectedPark(parkCode);
    setOffset(0);
    setToDoData([]);
    setHasMoreData(true);
  };


  return (
    <div className="experiences-container">
      <h2 className="experiences-header">National Park Experiences</h2>
      <div className={`dropdown-container ${selectedPark ? 'park-selected' : ''}`}>
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
      {loading && <p>Loading...</p>}
      {!loading && toDoData.length === 0 && selectedPark !== "" && (
        <p>No to-do data available for this park.</p>
      )}
      <div className="experiences-grid">
        {toDoData.map((item, index) => (
          <div
            key={index}
            className="experience-card"
            ref={index === toDoData.length - 1 ? lastToDoElementRef : null}
          >
            <h3>{item.title}</h3>
            <p>{item.shortDescription}</p>
            <p>Duration: {item.duration}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: item.durationDescription,
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: item.accessibilityInformation,
              }}
            />
            {item.images.map((image, index) => (
              <div key={index}>
                <img src={image.url} alt={image.altText} title={image.title} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiences;