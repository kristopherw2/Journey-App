import React, { useState, useEffect } from "react";
import axios from "axios";

const Activities = () => {
  const [activitiesParks, setActivitiesParks] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);

  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    const fetchActivitiesParks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/parks/`, {
          headers: { Authorization: `Token ${token}` },
        });
        console.log("API response:", response);
        setActivitiesParks(response.data.activities_parks);
        setFilteredActivities(response.data.activities_parks);
      } catch (error) {
        console.error("Error fetching activities parks data: ", error);
      }
    };

    fetchActivitiesParks();
  }, []);

  const filterActivities = (e) => {
    const filterText = e.target.value.toLowerCase();

    setSearchText(filterText);

    const filtered = activitiesParks.filter((activity) => {
      const activityMatch = activity.name.toLowerCase().includes(filterText);
      const parkMatch = activity.parks.some((park) => park.fullName.toLowerCase().includes(filterText));
      return activityMatch || parkMatch;
    });

    setFilteredActivities(filtered);
  };

  return (
    <div>
      <h1>National Park Activities</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>

        <label htmlFor="activitySearch">Search Activities and Parks Here: </label>

        <input
          id="activitySearch"
          type="text"
          placeholder=""

          value={searchText}

          onChange={filterActivities}
        />
      </div>
      <ul>
        {filteredActivities.map((activity) => (
          <li key={activity.id}>
            <h3>{activity.name}</h3>
            <ul>

              {activity.parks
                .filter((park) => park.fullName.toLowerCase().includes(searchText.toLowerCase()))
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



