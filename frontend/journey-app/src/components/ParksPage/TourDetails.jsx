// TourDetails.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./TourDetails.css";

const TourDetails = () => {
  const [tour, setTour] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/tours/`, {
          headers: { Authorization: `Token ${token}` },
        });
        const tourData = response.data.data.find((t) => t.id === id);
        if (tourData) {
          setTour(tourData);
        }
      } catch (error) {
        console.error("Error fetching tour details:", error);
      }
    };

    fetchTour();
  }, [id]);

  if (!tour) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tour-details-container">
      <h2>{tour.title}</h2>
      <p>{tour.description}</p>
      <p>Park: {tour.park.fullName} ({tour.park.states})</p>
      <p>Duration: {tour.durationMin} - {tour.durationMax} {tour.durationUnit}</p>
      <div className="tour-images">
        {tour.images.map((image, index) => (
          <div key={index} className="tour-image">
            <a href={image.url} target="_blank" rel="noreferrer">
              <img src={image.url} alt={image.altText} />
              <p>Click for fullscreen</p>
            </a>
            <p>Photo credit: {image.credit}</p>
          </div>
        ))}
      </div>
      <div className="tour-activities">
        <h3>Activities:</h3>
        <ul>
          {tour.activities.map((activity) => (
            <li key={activity.id}>{activity.name}</li>
          ))}
        </ul>
      </div>
      <div className="tour-topics">
        <h3>Topics:</h3>
        <ul>
          {tour.topics.map((topic) => (
            <li key={topic.id}>{topic.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TourDetails;
