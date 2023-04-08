import React, { useState, useEffect } from "react";
import axios from "axios";
import ParkCodes from './ParkCodes';

const Activities = () => {
  const [activitiesParks, setActivitiesParks] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [parkFilter, setParkFilter] = useState("");

  useEffect(() => {
    const fetchActivitiesParks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/parks/`, {
          headers: { Authorization: `Token ${token}` },
        });
        console.log("API response:", response);
        setActivitiesParks(response.data.activities_parks);
        setFilteredActivities([]);
      } catch (error) {
        console.error("Error fetching activities parks data: ", error);
      }
    };

    fetchActivitiesParks();
  }, []);

  const handleChange = (e) => {
    const parkName = e.target.value;
    setParkFilter(parkName);
    if (parkName) {
      const filtered = activitiesParks.filter((activity) => {
        const parkMatch = activity.parks.some((park) => park.fullName.toLowerCase() === parkName.toLowerCase());
        return parkMatch;
      });
      setFilteredActivities(filtered);
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