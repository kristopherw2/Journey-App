import React, { useState, useEffect } from "react";
import axios from "axios";

const Parks = () => {
  const [webcams, setWebcams] = useState([]);
  const [activitiesParks, setActivitiesParks] = useState([]);

  useEffect(() => {
    const fetchParksData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/parks/", {
          headers: { Authorization: `Token ${token}` },
        });
        console.log("API response:", response); // Log the response object
        setWebcams(response.data.webcams);
        setActivitiesParks(response.data.activities_parks);
      } catch (error) {
        console.error("Error fetching parks data: ", error);
      }
    };

    fetchParksData();
  }, []);

  useEffect(() => {
    console.log("Webcams state:", webcams); // Log the webcams state after setting it
  }, [webcams]);

  return (
    <div>
      <h1>National Parks</h1>
      <h2>Webcams</h2>
      <ul>
        {webcams.map((webcam) => (
          <li key={webcam.id}>
            <h3>{webcam.title}</h3>
            <p>{webcam.description}</p>
            <iframe
              src={webcam.url}
              title={webcam.title}
              width="640"
              height="480"
              frameBorder="0"
              allowFullScreen
            />
          </li>
        ))}
      </ul>
      <h2>Activities Parks</h2>
      <ul>
        {activitiesParks.map((activity) => (
          <li key={activity.id}>
            <h3>{activity.name}</h3>
            <ul>
              {activity.parks.map((park) => (
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

export default Parks;
