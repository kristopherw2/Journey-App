import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Tours.css";
import ParkCodes from './ParkCodes';

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [parkFilter, setParkFilter] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/tours/`, {
          headers: { Authorization: `Token ${token}` },
        });
        console.log("Tours response:", response);
        setTours(response.data.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    filterTours();
  }, [parkFilter]);

  const filterTours = () => {
    if (parkFilter === "") {
      setFilteredTours([]);
    } else {
      const filtered = tours.filter(
        (tour) =>
          tour.park.fullName.toLowerCase().includes(parkFilter.toLowerCase())
      );
      setFilteredTours(filtered);
    }
  };

  const handleParkFilterChange = (e) => {
    setParkFilter(e.target.value);
  };

  return (
    <div className="tours-container">
      <h2>Tours</h2>
      <div>
        <label htmlFor="parkFilter">Filter by park: </label>
        <select id="parkFilter" onChange={handleParkFilterChange}>
          <option value="">Select a park</option>
          {Object.entries(ParkCodes).map(([code, name]) => (
            <option key={code} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="tours-grid">
        {filteredTours.map((tour) => (
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




// // Tours.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./Tours.css";
// import ParkCodes from './ParkCodes';

// const Tours = () => {
//   const [tours, setTours] = useState([]);
//   const [filteredTours, setFilteredTours] = useState([]);
//   const [parkFilter, setParkFilter] = useState("");

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/tours/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         console.log("Tours response:", response);
//         setTours(response.data.data);
//         setFilteredTours(response.data.data);
//       } catch (error) {
//         console.error("Error fetching tours:", error);
//       }
//     };

//     fetchTours();
//   }, []);

//   useEffect(() => {
//     filterTours();
//   }, [parkFilter]);

//   const filterTours = () => {
//     const filtered = tours.filter(
//       (tour) =>
//         parkFilter === "" ||
//         tour.park.fullName.toLowerCase().includes(parkFilter.toLowerCase())
//     );
//     setFilteredTours(filtered);
//   };

//   const handleParkFilterChange = (e) => {
//     setParkFilter(e.target.value);
//   };

//   return (
//     <div className="tours-container">
//       <h2>Tours</h2>
//       <div>
//         <label htmlFor="parkFilter">Filter by park: </label>
//         <select id="parkFilter" onChange={handleParkFilterChange}>
//           <option value="">Select a park</option>
//           {Object.entries(ParkCodes).map(([code, name]) => (
//             <option key={code} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div className="tours-grid">
//         {filteredTours.map((tour) => (
//           <div key={tour.id} className="tour-card">
//             <h3>
//               <Link to={`/tours/${tour.id}`}>{tour.title}</Link>
//             </h3>
//             <p>{tour.description}</p>
//             <p>
//               Park: {tour.park.fullName} ({tour.park.states})
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tours;