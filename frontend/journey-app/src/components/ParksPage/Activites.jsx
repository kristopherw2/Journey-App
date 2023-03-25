import React, { useState, useEffect } from "react";
import axios from "axios";

const Activities = () => {
  const [activitiesParks, setActivitiesParks] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);

  useEffect(() => {
    const fetchActivitiesParks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8000/api/parks/", {
          headers: { Authorization: `Token ${token}` },
        });
        console.log("API response:", response);
        setActivitiesParks(response.data.activities_parks);
        setFilteredActivities(response.data.activities_parks);
      } catch (error) {
        console.error("Error fetching activities parks data: ", error);
      }
    };

    fetchActivitiesParks();
  }, []);

  const filterActivities = (e) => {
    const filterText = e.target.value.toLowerCase();
    const filtered = activitiesParks.filter((activity) =>
      activity.name.toLowerCase().includes(filterText)
    );
    setFilteredActivities(filtered);
  };

  return (
    <div>
      <h1>National Park Activities</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <label htmlFor="activitySearch">Search Activities Here: </label>
        <input
          id="activitySearch"
          type="text"
          placeholder=""
          onChange={filterActivities}
        />
      </div>
      <ul>
        {filteredActivities.map((activity) => (
          <li key={activity.id}>
            <h3>{activity.name}</h3>
            <ul>
              {activity.parks.map((park) => (
                <li key={park.parkCode}>
                  <h4>{park.fullName}</h4>
                  <a href={park.url} target="_blank" rel="noopener noreferrer">
                    {park.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Activities;


// below does not have search just the full list
// // components/ActivitiesPage/Activities.js 
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Activities = () => {
//   const [activitiesParks, setActivitiesParks] = useState([]);

//   useEffect(() => {
//     const fetchActivitiesParks = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:8000/api/parks/", {
//           headers: { Authorization: `Token ${token}` },
//         });
//         console.log("API response:", response);
//         setActivitiesParks(response.data.activities_parks);
//       } catch (error) {
//         console.error("Error fetching activities parks data: ", error);
//       }
//     };

//     fetchActivitiesParks();
//   }, []);

//   return (
//     <div>
//       <h1>National Park Activities</h1>
//       <ul>
//         {activitiesParks.map((activity) => (
//           <li key={activity.id}>
//             <h3>{activity.name}</h3>
//             <ul>
//               {activity.parks.map((park) => (
//                 <li key={park.parkCode}>
//                   <h4>{park.fullName}</h4>
//                   <a href={park.url} target="_blank" rel="noopener noreferrer">
//                     {park.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Activities;
