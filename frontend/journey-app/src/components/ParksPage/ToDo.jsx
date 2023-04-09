import React, { useState } from 'react';
import axios from 'axios';
import ParkCodes from './ParkCodes';

const addTargetBlankToLinks = (htmlString) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const links = doc.getElementsByTagName('a');
  for (const link of links) {
    link.setAttribute('target', '_blank');
  }
  return doc.body.innerHTML;
};

const ToDo = () => {
  const [toDoData, setToDoData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const parkName = e.target.value;
    setSearchTerm(parkName);
    setLoading(true);

    // Fetch to-do data based on the selected park
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/todo/`, {
        headers: { Authorization: `Token ${token}` },
        params: { park_name: parkName },
      });
      setToDoData(response.data.data);
    } catch (error) {
      console.error("Error fetching to-do data:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayImages = (images) => {
    return images.map((image, index) => (
      <div key={index}>
        <img src={image.url} alt={image.altText} title={image.title} />
      </div>
    ));
  };

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
      {loading && <p>Loading...</p>}
      <ul>
        {toDoData.map((item, index) => (
          <li key={index}>
            <h3>{item.title}</h3>
            <p>{item.shortDescription}</p>
            <p>Duration: {item.duration}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: addTargetBlankToLinks(item.durationDescription),
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: addTargetBlankToLinks(item.accessibilityInformation),
              }}
            />
            {displayImages(item.images)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;