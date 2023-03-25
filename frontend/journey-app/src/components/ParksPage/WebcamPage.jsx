import React, { useState, useEffect } from "react";
import axios from "axios";

const WebcamPage = () => {
  const [parks, setParks] = useState([]);
  const [selectedPark, setSelectedPark] = useState('');
  const [webcams, setWebcams] = useState([]);

  useEffect(() => {
    const fetchParks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/parks/", {
          headers: { Authorization: `Token ${token}` },
        });
        setParks(response.data.parks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchParks();
  }, []);

  useEffect(() => {
    const fetchWebcams = async (parkCode) => {
      const webcams_url = `http://localhost:8000/api/parks/${parkCode}/webcams/`;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(webcams_url, {
          headers: { Authorization: `Token ${token}` },
        });
        console.log(response.data)
        setWebcams(response.data);
      } catch (error) {
        console.error("Error fetching webcams data: ", error);
      }
    };

    if (selectedPark) {
      fetchWebcams(selectedPark);
    }
  }, [selectedPark]);

  return (
    <div>
      <h1>Webcams</h1>
      <select
        value={selectedPark}
        onChange={(e) => setSelectedPark(e.target.value)}
      >
        <option value="">Select a park</option>
        {parks.map((park) => (
          <option key={park.parkCode} value={park.parkCode}>
            {park.fullName}
          </option>
        ))}
      </select>
      <div>
        {webcams.map((webcam) => (
          <div key={webcam.id}>
            <h3>{webcam.statusMessage || webcam.title}</h3>
            {webcam.isStreaming && (
              <img src={webcam.images[0].url} alt={webcam.images[0].altText} />
            )}
            <p>{webcam.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebcamPage;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const WebcamPage = () => {
//   const [parks, setParks] = useState([]);
//   const [selectedPark, setSelectedPark] = useState('');
//   const [webcams, setWebcams] = useState([]);

//   useEffect(() => {
//     const fetchParks = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8000/api/parks/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setParks(response.data.parks);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchParks();
//   }, []);

//   useEffect(() => {
//     const fetchWebcams = async (parkCode) => {
//       const webcams_url = `http://localhost:8000/api/parks/${parkCode}/webcams/`;
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(webcams_url, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         console.log(response.data.data)
//         setWebcams(response.data.data);
//       } catch (error) {
//         console.error("Error fetching webcams data: ", error);
//       }
//     };


//     fetchWebcams(selectedPark);
//   }, [selectedPark]);

//   return (
//     <div>
//       <h1>Webcams</h1>
//       <select
//         value={selectedPark}
//         onChange={(e) => setSelectedPark(e.target.value)}
//       >
//         <option value="">Select a park</option>
//         {parks.map((park) => (
//           <option key={park.parkCode} value={park.parkCode}>
//             {park.fullName}
//           </option>
//         ))}
//       </select>
//       <div>
//         {webcams.map((webcam) => (
//           <div key={webcam.id}>
//             <h3>{webcam.statusMessage || webcam.title}</h3>
//             {webcam.isStreaming && (
//               <img src={webcam.images[0].url} alt={webcam.images[0].altText} />
//             )}
//             <p>{webcam.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WebcamPage;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const WebcamPage = () => {
//   const [parks, setParks] = useState([]);
//   const [selectedPark, setSelectedPark] = useState(null);
//   const [webcams, setWebcams] = useState([]);

//   useEffect(() => {
//     const fetchParks = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8000/api/parks/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         console.log("API response:", response);
//         setParks(response.data.parks);
//       } catch (error) {
//         console.error("Error fetching parks data: ", error);
//       }
//     };

//     fetchParks();
//   }, []);

//   const handleParkChange = async (e) => {
//     const parkCode = e.target.value;
//     if (parkCode) {
//       setSelectedPark(parkCode);
//       await fetchWebcams(parkCode);
//     } else {
//       setSelectedPark(null);
//       setWebcams([]);
//     }
//   };

//   const fetchWebcams = async (parkCode) => {
//     const api_key = "xBbZChwMOwiRzaLjWde5q4gIYFWnGAz8NG2Pvw1L";
//     const webcams_url = `https://developer.nps.gov/api/v1/webcams?parkCode=${parkCode}&api_key=${api_key}`;
//     try {
//       const response = await axios.get(webcams_url);
//       setWebcams(response.data.data);
//     } catch (error) {
//       console.error("Error fetching webcams data: ", error);
//     }
//   };

//   return (
//     <div>
//       <h1>National Park Webcams</h1>
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <label htmlFor="parkSelect">Select a Park: </label>
//         <select id="parkSelect" value={selectedPark || ''} onChange={handleParkChange}>
//           <option value="">--Select a Park--</option>
//           {parks.map((park) => (
//             <option key={park.parkCode} value={park.parkCode}>
//               {park.fullName}
//             </option>
//           ))}
//         </select>
//       </div>
//       <ul>
//         {webcams.map((webcam) => (
//           <li key={webcam.id}>
//             <h3>{webcam.title}</h3>
//             <p>{webcam.description}</p>
//             <iframe
//               src={webcam.url}
//               title={webcam.title}
//               width="640"
//               height="480"
//               frameBorder={0}
//               allowFullScreen
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WebcamPage;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const WebcamPage = () => {
//   const [webcams, setWebcams] = useState([]);
//   const [filteredWebcams, setFilteredWebcams] = useState([]);

//   useEffect(() => {
//     const fetchWebcams = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8000/api/parks/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         console.log("API response:", response);
//         setWebcams(response.data.webcams);
//         setFilteredWebcams(response.data.webcams);
//       } catch (error) {
//         console.error("Error fetching webcams data: ", error);
//       }
//     };

//     fetchWebcams();
//   }, []);

//   const filterWebcams = (e) => {
//     const filterText = e.target.value.toLowerCase();
//     const filtered = webcams.filter((webcam) =>
//       webcam.title.toLowerCase().includes(filterText)
//     );
//     setFilteredWebcams(filtered);
//   };

//   return (
//     <div>
//       <h1>National Park Webcams</h1>
//       <div style={{ textAlign: "center", marginTop: "20px" }}>
//         <label htmlFor="webcamSearch">Search by Park Name: </label>
//         <input
//           id="webcamSearch"
//           type="text"
//           placeholder=""
//           onChange={filterWebcams}
//         />
//       </div>
//       <ul>
//         {filteredWebcams.map((webcam) => (
//           <li key={webcam.id}>
//             <h3>{webcam.title}</h3>
//             <p>{webcam.description}</p>
//             <iframe
//               src={webcam.url}
//               title={webcam.title}
//               width="640"
//               height="480"
//               frameborder={0}
//               allowFullScreen
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WebcamPage;