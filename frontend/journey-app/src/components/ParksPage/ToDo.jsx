// ToDo.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ParkCodes from './ParkCodes';

const ToDo = () => {
  const [toDoData, setToDoData] = useState([]);
  const [selectedPark, setSelectedPark] = useState('');
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(6);
  const lastToDoElementRef = useRef(null);

  const fetchToDo = async (parkCode, start, end) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log('Selected parkCode:', parkCode);

      const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/todo/`, {
        headers: { Authorization: `Token ${token}` },
        params: {
          parkCode,
          start,
          end,
        },
      });

      console.log('To Do response:', response);
      const newData = response.data.data.slice(0, limit);
      setToDoData((prevToDoData) => [...prevToDoData, ...newData]);
    } catch (error) {
      console.error('Error fetching to-do data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedPark) {
      fetchToDo(selectedPark, offset, offset + limit);
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

    if (lastToDoElementRef.current) {
      observer.observe(lastToDoElementRef.current);
    }

    return () => {
      if (lastToDoElementRef.current) {
        observer.unobserve(lastToDoElementRef.current);
      }
    };
  }, [loading, limit]);

  const handleParkChange = (e) => {
    const parkCode = e.target.value;
    setSelectedPark(parkCode);
    setOffset(0);
    setToDoData([]);
  };

  return (
    <div>
      <h1>National Park To Do</h1>
      <select onChange={handleParkChange}>
        <option value="">Select a park</option>
        {Object.entries(ParkCodes).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
      {loading && <p>Loading...</p>}
      <ul>
        {toDoData.map((item, index) => (
          <li
            key={index}
            ref={index === toDoData.length - 1 ? lastToDoElementRef : null}
          >
            <h3>{item.title}</h3>
            <p>{item.shortDescription}</p>
            <p>Duration: {item.duration}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: item.durationDescription,
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: item.accessibilityInformation,
              }}
            />
            {item.images.map((image, index) => (
              <div key={index}>
                <img src={image.url} alt={image.altText} title={image.title} />
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;



// // ToDo.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import ParkCodes from './ParkCodes';

// const ToDo = () => {
//   const [toDoData, setToDoData] = useState([]);
//   const [selectedPark, setSelectedPark] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [offset, setOffset] = useState(0);
//   const [limit] = useState(6);
//   const lastToDoElementRef = useRef(null);

//   const fetchToDo = async (parkCode, start, end) => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       console.log('Selected parkCode:', parkCode);

//       const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/todo/`, {
//         headers: { Authorization: `Token ${token}` },
//         params: {
//           parkCode,
//           limit: end,
//         },
//       });

//       console.log('To Do response:', response);
//       setToDoData((prevToDoData) => [...prevToDoData, ...response.data.data.slice(start, end)]);
//     } catch (error) {
//       console.error('Error fetching to-do data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedPark) {
//       fetchToDo(selectedPark, offset, offset + limit);
//     }
//   }, [selectedPark, offset, limit]);

//   useEffect(() => {
//     if (loading) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setOffset((prevOffset) => prevOffset + limit);
//         }
//       },
//       { threshold: 1 }
//     );

//     if (lastToDoElementRef.current) {
//       observer.observe(lastToDoElementRef.current);
//     }

//     return () => {
//       if (lastToDoElementRef.current) {
//         observer.unobserve(lastToDoElementRef.current);
//       }
//     };
//   }, [loading, limit]);

//   const handleParkChange = (e) => {
//     const parkCode = e.target.value;
//     setSelectedPark(parkCode);
//     setOffset(0);
//     setToDoData([]);
//   };

//   return (
//     <div>
//       <h1>National Park To Do</h1>
//       <select onChange={handleParkChange}>
//         <option value="">Select a park</option>
//         {Object.entries(ParkCodes).map(([code, name]) => (
//           <option key={code} value={code}>
//             {name}
//           </option>
//         ))}
//       </select>
//       {loading && <p>Loading...</p>}
//       <ul>
//         {toDoData.map((item, index) => (
//           <li
//             key={index}
//             ref={index === toDoData.length - 1 ? lastToDoElementRef : null}
//           >
//             <h3>{item.title}</h3>
//             <p>{item.shortDescription}</p>
//             <p>Duration: {item.duration}</p>
//             <div
//               dangerouslySetInnerHTML={{
//                 __html: item.durationDescription,
//               }}
//             />
//             <div
//               dangerouslySetInnerHTML={{
//                 __html: item.accessibilityInformation,
//               }}
//             />
//             {item.images.map((image, index) => (
//               <div key={index}>
//                 <img src={image.url} alt={image.altText} title={image.title} />
//               </div>
//             ))}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ToDo;