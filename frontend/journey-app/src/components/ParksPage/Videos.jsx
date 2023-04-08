import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ParkCodes from './ParkCodes';
import './Videos.css';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [originalVideos, setOriginalVideos] = useState([]);
  const [selectedPark, setSelectedPark] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/videos/`, {
          headers: { Authorization: `Token ${token}` },
        });
        console.log('Videos response:', response);
        setOriginalVideos(response.data.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleParkChange = (e) => {
    const parkName = e.target.value;
    setSelectedPark(parkName);
    const filteredVideos = originalVideos.filter((video) =>
      video.tags.some((tag) => tag.toLowerCase().includes(parkName.toLowerCase()))
    );
    setVideos(filteredVideos);
  };

  return (
    <div className="videos-container">
      <h2 className="videos-header">Videos</h2>
      <div>
        <label htmlFor="parkFilter">Select a park: </label>
        <select id="parkFilter" value={selectedPark} onChange={handleParkChange}>
          <option value="">Select a park</option>
          {Object.entries(ParkCodes).map(([code, name]) => (
            <option key={code} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="videos-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <h3>{video.title}</h3>
            <video width="320" height="240" controls>
              {video.versions.map((version) =>
                version.heightPixels === 720 && <source src={version.url} type={version.fileType} />
              )}
              Your browser does not support the video tag.
            </video>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Videos.css'

// const Videos = () => {
//   const [videos, setVideos] = useState([]);
//   const [originalVideos, setOriginalVideos] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/videos/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         console.log("Videos response:", response);
//         setVideos(response.data.data);
//         setOriginalVideos(response.data.data);
//       } catch (error) {
//         console.error('Error fetching videos:', error);
//       }
//     };

//     fetchVideos();
//   }, []);

//   const handleSearch = () => {
//     const filteredVideos = originalVideos.filter((video) =>
//       video.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//     setVideos(filteredVideos);
//   };


//   const handleReset = () => {
//     setSearchTerm('');
//     setVideos(originalVideos);
//   };

//   return (
//     <div className="videos-container">
//       <h2 className="videos-header">Videos</h2>
//       <div>
//         <input
//           type="text"
//           placeholder="Search by tag"
//           value={searchTerm}
//           onChange={(event) => setSearchTerm(event.target.value)}
//         />
//         <button className="button-small" onClick={handleSearch}>Search</button>
//         <button className="button-small" onClick={handleReset}>Reset</button>
//       </div>
//       <div className="videos-grid">
//         {videos.map((video) => (
//           <div key={video.id} className="video-card">
//             <h3>{video.title}</h3>
//             <video width="320" height="240" controls>
//               {video.versions.map((version) => (
//                 version.heightPixels === 720 && (
//                   <source src={version.url} type={version.fileType} />
//                 )
//               ))}
//               Your browser does not support the video tag.
//             </video>
//             <p>{video.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Videos;