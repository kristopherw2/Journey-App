import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Tours.css"


const Tours = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/tours/", {
          headers: { Authorization: `Token ${token}` },
        });
        console.log("Tours response:", response);
        setTours(response.data.data);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="tours-container">
      <h2>Tours</h2>
      <div className="tours-grid">
        {tours.map((tour) => (
          <div key={tour.id} className="tour-card">
            <h3>{tour.title}</h3>
            <p>{tour.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tours;
