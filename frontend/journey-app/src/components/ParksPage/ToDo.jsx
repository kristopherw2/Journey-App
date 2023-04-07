import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ParkCodes from './ParkCodes';

const ToDo = () => {
  const [toDoData, setToDoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchToDoData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/todo/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setToDoData(response.data.data[0].data);
      } catch (error) {
        console.error("Error fetching to do data:", error);
      }
    };

    fetchToDoData();
  }, []);

  const handleChange = (e) => {
    const parkName = e.target.value;
    setSearchTerm(parkName);
  };

  const filteredData = toDoData.filter(item => {
    return item.relatedParks.some(park =>
      park.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <h1>National Park To Do</h1>
      <select onChange={handleChange}>
        <option value="">Select a park</option>
        {Object.entries(ParkCodes).map(([code, name]) => (
          <option key={code} value={name}>
            {name}
          </option>
        ))}
      </select>
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p>{item.shortDescription}</p>
            <p>Duration: {item.duration}</p>
            <p>{item.durationDescription}</p>
            <p>Accessibility Information: {item.accessibilityInformation}</p>
            {item.images.map((image, imgIndex) => (
              <img
                key={imgIndex}
                src={image.url}
                alt={image.altText}
                title={image.title}
              />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
