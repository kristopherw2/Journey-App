import React, { useState, useEffect } from "react";
import axios from "axios";
import ParkCodes from './ParkCodes';

const Activities = () => {
  const [activitiesParks, setActivitiesParks] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [parkFilter, setParkFilter] = useState("");

  const handleChange = async (e) => {
    const parkName = e.target.value;
    setParkFilter(parkName);
    if (parkName) {
      try {
        const token = localStorage.getItem("token");
        const parkCode = Object.entries(ParkCodes).find(([, name]) => name === parkName)[0];
        const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/parks/`, {
          headers: { Authorization: `Token ${token}` },
          params: { parkCode },
        });
        console.log("API Activites response:", response);
        setActivitiesParks(response.data.activities_parks);
        setFilteredActivities(response.data.activities_parks);
      } catch (error) {
        console.error("Error fetching activities parks data: ", error);
      }
    } else {
      setFilteredActivities([]);
    }
  };

  return (
    <div>
      <h1>National Park Activities</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <label htmlFor="parkFilter">Filter by park: </label>
        <select id="parkFilter" onChange={handleChange}>
          <option value="">Select a park</option>
          {Object.entries(ParkCodes).map(([code, name]) => (
            <option key={code} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <ul>
        {filteredActivities.map((activity) => (
          <li key={activity.id}>
            <h3>{activity.name}</h3>
            <ul>
              {activity.parks
                .filter((park) => park.fullName.toLowerCase().includes(parkFilter.toLowerCase()))
                .map((park) => (
                  <li key={park.parkCode}>
                    <h4>{park.fullName}</h4>
                    <a href={park.url} target="_blank" rel="noopener noreferrer">
                      {park.name}
                    </a>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;