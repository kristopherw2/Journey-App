import React, { useState } from 'react';
import axios from 'axios';
import ParkCodes from './ParkCodes';

const Experiences = () => {
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = async (e) => {
    const parkName = e.target.value;

    if (!parkName) {
      setFilteredData([]);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/todo/`, {
        headers: { Authorization: `Token ${token}` },
        params: {
          parkName: parkName,
        },
      });
      const data = response.data.data.filter((item) => {
        return item.relatedParks.some((park) =>
          park.fullName.toLowerCase().includes(parkName.toLowerCase())
        );
      });
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching to do data:', error);
    }
  };

  return (
    <div>
      <h1>Unique Experiences in the National Parks</h1>
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

export default Experiences;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ParkCodes from './ParkCodes';

// const Experiences = () => {
//   const [toDoData, setToDoData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchToDoData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/todo/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setToDoData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching to do data:", error);
//       }
//     };

//     fetchToDoData();
//   }, []);

//   const handleChange = (e) => {
//     const parkName = e.target.value;
//     setSearchTerm(parkName);
//   };

//   const filteredData = searchTerm
//     ? toDoData.filter(item =>
//       item.relatedParks.some(park =>
//         park.fullName.toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     )
//     : toDoData;

//   return (
//     <div>
//       <h1>Unique Experiences in the National Parks</h1>
//       <select onChange={handleChange}>
//         <option value="">Select a park</option>
//         {Object.entries(ParkCodes).map(([code, name]) => (
//           <option key={code} value={name}>
//             {name}
//           </option>
//         ))}
//       </select>
//       <ul>
//         {filteredData.map((item, index) => (
//           <li key={index}>
//             <h3>{item.title}</h3>
//             <p>{item.shortDescription}</p>
//             <p>Duration: {item.duration}</p>
//             <p>{item.durationDescription}</p>
//             <p>Accessibility Information: {item.accessibilityInformation}</p>
//             {item.images.map((image, imgIndex) => (
//               <img
//                 key={imgIndex}
//                 src={image.url}
//                 alt={image.altText}
//                 title={image.title}
//               />
//             ))}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Experiences;