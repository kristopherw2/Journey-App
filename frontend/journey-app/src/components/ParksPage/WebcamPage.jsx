import React, { useState, useEffect } from "react";
import axios from "axios";

const WebcamPage = () => {
  const [webcams, setWebcams] = useState([]);
  const [filteredWebcams, setFilteredWebcams] = useState([]);

  useEffect(() => {
    const fetchWebcams = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/parks/", {
          headers: { Authorization: `Token ${token}` },
        });
        console.log("API response:", response);
        setWebcams(response.data.webcams);
        setFilteredWebcams(response.data.webcams);
      } catch (error) {
        console.error("Error fetching webcams data: ", error);
      }
    };

    fetchWebcams();
  }, []);

  const filterWebcams = (e) => {
    const filterText = e.target.value.toLowerCase();
    const filtered = webcams.filter((webcam) =>
      webcam.title.toLowerCase().includes(filterText)
    );
    setFilteredWebcams(filtered);
  };

  return (
    <div>
      <h1>National Park Webcams</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <label htmlFor="webcamSearch">Search by Park Name: </label>
        <input
          id="webcamSearch"
          type="text"
          placeholder=""
          onChange={filterWebcams}
        />
      </div>
      <ul>
        {filteredWebcams.map((webcam) => (
          <li key={webcam.id}>
            <h3>{webcam.title}</h3>
            <p>{webcam.description}</p>
            <iframe
              src={webcam.url}
              title={webcam.title}
              width="640"
              height="480"
              frameborder={0}
              allowFullScreen
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WebcamPage;





// No search below
// // components/WebcamPage/WebcamPage.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const WebcamPage = () => {
//   const [webcams, setWebcams] = useState([]);

//   useEffect(() => {
//     const fetchWebcams = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8000/api/parks/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         console.log("API response:", response);
//         setWebcams(response.data.webcams);
//       } catch (error) {
//         console.error("Error fetching webcams data: ", error);
//       }
//     };

//     fetchWebcams();
//   }, []);

//   return (
//     <div>
//       <h1>National Park Webcams</h1>
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

