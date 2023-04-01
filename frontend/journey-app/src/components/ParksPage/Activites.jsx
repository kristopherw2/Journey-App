import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Activities.css";

const Activities = () => {
  const [parks, setParks] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]);
  const [selectedParkName, setSelectedParkName] = useState("");
  const [activityFilter, setActivityFilter] = useState("");

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/parks/", {
          headers: { Authorization: `Token ${token}` },
        });
        console.log("API response:", response);
        setParks(response.data.parks);
        setFilteredParks(response.data.parks);
      } catch (error) {
        console.error("Error fetching parks data: ", error);
      }
    };

    fetchParks();
  }, []);

  useEffect(() => {
    filterParks();
  }, [selectedParkName, activityFilter]);

  const filterParks = () => {
    const filterText = selectedParkName.toLowerCase();
    const filtered = parks.filter((park) =>
      selectedParkName === "" || park.fullName.toLowerCase() === filterText
    );

    const finalFiltered = filtered.map((park) => ({
      ...park,
      activities: park.activities.filter((activity) =>
        activity.name.toLowerCase().includes(activityFilter.toLowerCase())
      ),
    }));

    setFilteredParks(finalFiltered);
  };

  const handleParkNameChange = (e) => {
    setSelectedParkName(e.target.value);
  };

  const filterActivities = (e) => {
    setActivityFilter(e.target.value);
  };

  return (
    <div className="activities-container">
      <h1 className="activities-header">National Park Activities</h1>
      <div className="activities-select">
        <details>
          <summary>Select a park:</summary>
          <select id="parkSelect" onChange={handleParkNameChange} className="activities-select-dropdown">
            <option value="">All Parks</option>
            {parks.map((park) => (
              <option key={park.parkCode} value={park.fullName}>
                {park.fullName}
              </option>
            ))}
          </select>
        </details>
      </div>

      {selectedParkName === "" && (
        <div className="activities-search">
          <input
            id="activitySearch"
            type="text"
            placeholder="Activities Search:"
            onChange={filterActivities}
            className="activities-search-bar"
          />
        </div>
      )}
      <ul className="activities-list">
        {filteredParks.map((park) => (
          <li key={park.parkCode} className="activities-list-item">
            <h3>{park.fullName}</h3>
            <ul className="activities-sublist">
              {park.activities.map((activity) => (
                <li key={activity.id} className="activities-sublist-item">{activity.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;
