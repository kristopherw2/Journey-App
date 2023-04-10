// // Tours.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ParkCodes from "./ParkCodes";

const Tours = () => {
  const [tours, setTours] = useState([]);
  const [selectedPark, setSelectedPark] = useState("");
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(6);
  const lastTourElementRef = useRef(null);

  const fetchTours = async (parkCode, start, end) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      console.log('Selected parkCode:', parkCode);

      const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/tours/`, {
        headers: { Authorization: `Token ${token}` },
        params: {
          parkCode,
          start,
          end,
        },
      });

      console.log('Tours response:', response);
      const newData = response.data.data.slice(0, limit);
      setTours((prevTours) => [...prevTours, ...newData]);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPark) {
      fetchTours(selectedPark, offset, offset + limit);
    }
  }, [selectedPark, offset, limit]);

  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setOffset((prevOffset) => prevOffset + limit);
        }
      },
      { threshold: 1 }
    );

    if (lastTourElementRef.current) {
      observer.observe(lastTourElementRef.current);
    }

    return () => {
      if (lastTourElementRef.current) {
        observer.unobserve(lastTourElementRef.current);
      }
    };
  }, [loading, limit]);

  const handleParkChange = (e) => {
    const parkCode = e.target.value;
    setSelectedPark(parkCode);
    setOffset(0);
    setTours([]);
  };

  return (
    <div className="tours-container">
      <h2>Tours</h2>
      <div>
        <label htmlFor="parkFilter">Filter by park: </label>
        <select id="parkFilter" onChange={handleParkChange}>
          <option value="">Select a park</option>
          {Object.entries(ParkCodes).map(([code, name]) => (
            <option key={code} value={code}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Loading...</p>}
      <div className="tours-grid">
        {tours.map((tour, index) => (
          <div
            key={tour.id}
            className="tour-card"
            ref={index === tours.length - 1 ? lastTourElementRef : null}
          >
            <h3>{tour.title}</h3>
            <p>{tour.description}</p>
            <p>
              Park: {tour.park.fullName} ({tour.park.states})
            </p>
          </div>
        ))}
      </div>
      {loading && <p>Loading more tours...</p>}
      {!loading && tours.length > limit * (offset + limit) && (
        <button onClick={() => setOffset(offset + limit)}>Load More</button>
      )}
      {tours.length === 0 && !loading && selectedPark !== "" && (
        <p>No tours data available for this park.</p>
      )}
    </div>
  );
};

export default Tours;
















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import ParkCodes from './ParkCodes';

// const Tours = () => {
//   const [tours, setTours] = useState([]);
//   const [parkFilter, setParkFilter] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchTours();
//   }, [parkFilter]);

//   const fetchTours = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("token");
//       const parkCode = Object.keys(ParkCodes).find((key) => ParkCodes[key] === parkFilter);
//       const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/tours/`, {
//         headers: { Authorization: `Token ${token}` },
//         params: { parkCode },
//       });
//       console.log('Tours response:', response);
//       setTours(response.data.data);
//     } catch (error) {
//       console.error("Error fetching tours:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleParkFilterChange = (e) => {
//     setParkFilter(e.target.value);
//   };

//   return (
//     <div className="tours-container">
//       <h2>Tours</h2>
//       <div>
//         <label htmlFor="parkFilter">Filter by park: </label>
//         <select id="parkFilter" value={parkFilter} onChange={handleParkFilterChange}>
//           <option value="">Select a park</option>
//           {Object.entries(ParkCodes).map(([code, name]) => (
//             <option key={code} value={name}>
//               {name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {loading && <p>Loading...</p>}
//       {tours.length === 0 && !loading && parkFilter !== "" && (
//         <p>No tours data available for this park.</p>
//       )}
//       <div className="tours-grid">
//         {tours.map((tour) => (
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



// // Tours.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import ParkCodes from './ParkCodes';

// const Tours = () => {
//   const [tours, setTours] = useState([]);
//   const [filteredTours, setFilteredTours] = useState([]);
//   const [parkFilter, setParkFilter] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/tours/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setTours(response.data.data);
//       } catch (error) {
//         console.error("Error fetching tours:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTours();
//   }, []);

//   useEffect(() => {
//     if (parkFilter) {
//       setLoading(true);
//       filterTours();
//     } else {
//       setFilteredTours([]);
//       setLoading(false);
//     }
//   }, [parkFilter]);

//   const filterTours = () => {
//     const filtered = tours.filter(
//       (tour) =>
//         tour.park.fullName.toLowerCase().includes(parkFilter.toLowerCase())
//     );
//     setFilteredTours(filtered);
//     setLoading(false);
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
//       {loading && <p>Loading...</p>}
//       {filteredTours.length === 0 && !loading && parkFilter !== "" && (
//         <p>No tours data available for this park.</p>
//       )}
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


