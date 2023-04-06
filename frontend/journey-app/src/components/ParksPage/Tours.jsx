// Tours.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Tours.css";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [stateFilter, setStateFilter] = useState("");
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
        setFilteredTours(response.data.data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      }
    };

    fetchTours();
  }, []);

  useEffect(() => {
    filterTours();
  }, [stateFilter, parkFilter]);

  const filterTours = () => {
    const filtered = tours.filter(
      (tour) =>
        (stateFilter === "" ||
          tour.park.states.toLowerCase().includes(stateFilter.toLowerCase())) &&
        (parkFilter === "" ||
          tour.park.fullName.toLowerCase().includes(parkFilter.toLowerCase()))
    );
    setFilteredTours(filtered);
  };

  const handleStateFilterChange = (e) => {
    setStateFilter(e.target.value);
  };

  const handleParkFilterChange = (e) => {
    setParkFilter(e.target.value);
  };

  return (
    <div className="tours-container">
      <h2>Tours</h2>
      <div>
        <label htmlFor="stateFilter">Filter by state: </label>
        <input
          id="stateFilter"
          type="text"
          placeholder="State code (e.g., AK)"
          onChange={handleStateFilterChange}
        />
        <label htmlFor="parkFilter">Filter by park name: </label>
        <input
          id="parkFilter"
          type="text"
          placeholder="Park name"
          onChange={handleParkFilterChange}
        />
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






// const Tours = () => {
//   const [tours, setTours] = useState([]);
//   const [filteredTours, setFilteredTours] = useState([]);
//   const [stateFilter, setStateFilter] = useState("");
//   const [parkFilter, setParkFilter] = useState("");

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8000/api/tours/", {
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
//   }, [stateFilter, parkFilter]);

//   const filterTours = () => {
//     const filtered = tours.filter(
//       (tour) =>
//         (stateFilter === "" ||
//           tour.park.states.toLowerCase().includes(stateFilter.toLowerCase())) &&
//         (parkFilter === "" ||
//           tour.park.fullName.toLowerCase().includes(parkFilter.toLowerCase()))
//     );
//     setFilteredTours(filtered);
//   };

//   const handleStateFilterChange = (e) => {
//     setStateFilter(e.target.value);
//   };

//   const handleParkFilterChange = (e) => {
//     setParkFilter(e.target.value);
//   };

//   return (
//     <div className="tours-container">
//       <h2>Tours</h2>
//       <div>
//         <label htmlFor="stateFilter">Filter by state: </label>
//         <input
//           id="stateFilter"
//           type="text"
//           placeholder="State code (e.g., AK)"
//           onChange={handleStateFilterChange}
//         />
//         <label htmlFor="parkFilter">Filter by park name: </label>
//         <input
//           id="parkFilter"
//           type="text"
//           placeholder="Park name"
//           onChange={handleParkFilterChange}
//         />
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





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./Tours.css"


// const Tours = () => {
//   const [tours, setTours] = useState([]);

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8000/api/tours/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         console.log("Tours response:", response);
//         setTours(response.data.data);
//       } catch (error) {
//         console.error('Error fetching tours:', error);
//       }
//     };

//     fetchTours();
//   }, []);

//   return (
//     <div className="tours-container">
//       <h2>Tours</h2>
//       <div className="tours-grid">
//         {tours.map((tour) => (
//           <div key={tour.id} className="tour-card">
//             <h3>{tour.title}</h3>
//             <p>{tour.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Tours;
