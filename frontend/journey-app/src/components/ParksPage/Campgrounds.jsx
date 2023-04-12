import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ParkCodes from './ParkCodes';
import './Campgrounds.css';

const Campgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  const [selectedPark, setSelectedPark] = useState('');
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [hasMoreData, setHasMoreData] = useState(true);
  const lastCampgroundElementRef = useRef(null);

  const fetchCampgrounds = async (parkCode, offset, limit) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/campgrounds/`, {
        headers: { Authorization: `Token ${token}` },
        params: {
          parkCode,
          offset,
          limit,
        },
      });

      console.log('Campgrounds response:', response);
      setCampgrounds((prevCampgrounds) => [
        ...prevCampgrounds,
        ...response.data.campgrounds,
      ]);

      if (response.data.campgrounds.length < limit) {
        setHasMoreData(false);
      } else {
        setHasMoreData(true);
      }
    } catch (error) {
      console.error('Error fetching campgrounds data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPark) {
      fetchCampgrounds(selectedPark, offset, limit);
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

    if (lastCampgroundElementRef.current) {
      observer.observe(lastCampgroundElementRef.current);
    }

    return () => {
      if (lastCampgroundElementRef.current) {
        observer.unobserve(lastCampgroundElementRef.current);
      }
    };
  }, [loading, limit, hasMoreData]);

  const handleParkChange = (e) => {
    const parkName = e.target.value;
    const parkCode = Object.keys(ParkCodes).find((key) => ParkCodes[key] === parkName);
    setSelectedPark(parkCode);
    setOffset(0);
    setCampgrounds([]);
    setHasMoreData(true);
  };

  const displayImages = (images) => {
    return images.map((image, index) => (
      <div key={index} className="campground-image-container">
        <img src={image.url} alt={image.altText} className="campground-image" />
        <p>{image.caption}</p>
      </div>
    ));
  };

  return (
    <div className="campgrounds-container">
      <h1 className="campgrounds-header">National Parks Campgrounds</h1>
      <div className="dropdown-wrapper">
        <label htmlFor="parkFilter">Select a park: </label>
        <select id="parkFilter" onChange={handleParkChange}>
          <option value="">Select a park</option>
          {Object.entries(ParkCodes).map(([code, name]) => (
            <option key={code} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Loading...</p>}
      <ul className="campgrounds-list">
        {campgrounds.map((campground, index) => (
          <li
            key={index}
            className="campground-card"
            ref={index === campgrounds.length - 1 ? lastCampgroundElementRef : null}
          >
            <h2>{campground.name}</h2>
            <p>{campground.description}</p>
            <p>Location: {campground.latLong}</p>
            <p>Wheelchair Access: {campground.accessibility?.wheelchairAccess}</p>
            <p>Directions: {campground.directionsOverview}</p>
            <p>
              Reservations:{" "}
              <a href={campground.reservationUrl} target="_blank" rel="noreferrer">
                {campground.reservationUrl ? "Book here" : "Not available"}
              </a>
            </p>
            {displayImages(campground.images)}
          </li>
        ))}
      </ul>
    </div>
  );


}
export default Campgrounds;