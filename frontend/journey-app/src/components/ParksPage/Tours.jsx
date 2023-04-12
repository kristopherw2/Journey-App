import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Tours.css";
import ParkCodes from "./ParkCodes";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [allTours, setAllTours] = useState([]); // New state variable to store the entire response
  const [selectedPark, setSelectedPark] = useState("");
  const [loading, setLoading] = useState(false);
  const lastTourElementRef = useRef(null);

  const fetchTours = async (parkCode) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("Selected parkCode:", parkCode);

      const response = await axios.get(
        `http://${import.meta.env.VITE_BASE_URL}/api/tours/`,
        {
          headers: { Authorization: `Token ${token}` },
          params: {
            park_code: parkCode,
          },
        }
      );
      console.log("Tours response:", response);
      setAllTours(response.data.data); // Save the entire response in allTours
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleParkChange = (e) => {
    const parkCode = e.target.value;
    setSelectedPark(parkCode);
    if (parkCode === "") {
      setTours(allTours); // If no park is selected, display all tours
    } else {
      const filteredTours = allTours.filter(
        (tour) => tour.park.parkCode === parkCode
      );
      setTours(filteredTours); // Display only the tours with the selected park code
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <div className="tours-container">
      <h2>Tours</h2>
      <div>
        <label htmlFor="parkFilter">Filter by park: </label>
        <select
          id="parkFilter"
          value={selectedPark}
          onChange={handleParkChange}
        >
          <option value="">Select a park</option>
          {Object.entries(ParkCodes).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {!loading && tours.length === 0 && selectedPark !== "" && (
        <p>No tours data available for this park.</p>
      )}
      <div className="tours-grid">
        {tours.map((tour, index) => (
          <div
            key={tour.id}
            className="tour-card"
            ref={index === tours.length - 1 ? lastTourElementRef : null}
          >
            <h3>
              <Link to={`/tours/${tour.id}`}>{tour.title}</Link>
            </h3>
            <p>{tour.description}</p>
            <p>
              Park: {tour.park.fullName} ({tour.park.states})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tours;
