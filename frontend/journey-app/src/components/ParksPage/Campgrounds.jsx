import React, { useState } from 'react';
import axios from 'axios';
import ParkCodes from './ParkCodes';

const Campgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const parkName = e.target.value;
    setSearchTerm(parkName);
    setLoading(true);

    // Fetch campgrounds based on the selected park
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/campgrounds/`, {
        headers: { Authorization: `Token ${token}` },
        params: { park_name: parkName },
      });
      setCampgrounds(response.data.campgrounds);
    } catch (error) {
      console.error("Error fetching campgrounds data:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayImages = (images) => {
    return images.map((image, index) => (
      <div key={index}>
        <img src={image.url} alt={image.altText} width="200" />
        <p>{image.caption}</p>
      </div>
    ));
  };

  return (
    <div>
      <h1>National Parks Campgrounds</h1>
      <select onChange={handleChange}>
        <option value="">Select a park</option>
        {Object.entries(ParkCodes).map(([code, name]) => (
          <option key={code} value={name}>
            {name}
          </option>
        ))}
      </select>
      {loading && <p>Loading...</p>}
      <ul>
        {campgrounds.map((campground, index) => (
          <li key={index}>
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
};

export default Campgrounds;


