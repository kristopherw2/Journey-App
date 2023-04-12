import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Tours.css";
import ParkCodes from "./ParkCodes";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [selectedPark, setSelectedPark] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTours = async (parkCode) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log("Selected parkCode:", parkCode);

      const response = await axios.get(
        `http://${import.meta.env.VITE_BASE_URL}/api/tours/`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log("Tours response:", response);

      const filteredTours = response.data.data.filter(
        (tour) => tour.park.parkCode === parkCode
      );

      setTours(filteredTours);
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleParkChange = (e) => {
    const parkCode = e.target.value;
    setSelectedPark(parkCode);
    fetchTours(parkCode);
  };

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
        {tours.map((tour) => (
          <div key={tour.id} className="tour-card">
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

