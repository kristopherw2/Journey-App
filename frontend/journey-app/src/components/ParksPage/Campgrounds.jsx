import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Campgrounds = () => {
  const [campgrounds, setCampgrounds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const parkCodes = {
    "acad": "Acadia National Park",
    "arch": "Arches National Park",
    "bibe": "Big Bend National Park",
    "blca": "Black Canyon of the Gunnison National Park",
    "brca": "Bryce Canyon National Park",
    "cany": "Canyonlands National Park",
    "care": "Carlsbad Caverns National Park",
    "cave": "Caverns of Sonora",
    "chis": "Channel Islands National Park",
    "cong": "Congaree National Park",
    "crla": "Crater Lake National Park",
    "cuva": "Cuyahoga Valley National Park",
    "dena": "Denali National Park and Preserve",
    "deva": "Death Valley National Park",
    "drto": "Dry Tortugas National Park",
    "ever": "Everglades National Park",
    "fiis": "Fire Island National Seashore",
    "flfo": "Florissant Fossil Beds National Monument",
    "gaar": "Gates of the Arctic National Park and Preserve",
    "glac": "Glacier National Park",
    "glba": "Glacier Bay National Park and Preserve",
    "grca": "Grand Canyon National Park",
    "grsa": "Great Sand Dunes National Park and Preserve",
    "grsm": "Great Smoky Mountains National Park",
    "grte": "Grand Teton National Park",
    "guco": "Guadalupe Mountains National Park",
    "gumo": "Guadalupe Mountains National Park",
    "hale": "Haleakalā National Park",
    "havo": "Hawai'i Volcanoes National Park",
    "hosp": "Hot Springs National Park",
    "indu": "Indiana Dunes National Park",
    "isro": "Isle Royale National Park",
    "jotr": "Joshua Tree National Park",
    "katm": "Katmai National Park and Preserve",
    "kefj": "Kenai Fjords National Park",
    "kica": "Kings Canyon National Park",
    "klse": "Klondike Gold Rush National Historical Park",
    "kova": "Kobuk Valley National Park",
    "lacl": "Lake Clark National Park and Preserve",
    "lavo": "Lassen Volcanic National Park",
    "maca": "Mammoth Cave National Park",
    "meve": "Mesa Verde National Park",
    "mora": "Mount Rainier National Park",
    "noca": "North Cascades National Park",
    "olym": "Olympic National Park",
    "pefo": "Petrified Forest National Park",
    "pinn": "Pinnacles National Park",
    "redw": "Redwood National and State Parks",
    "romo": "Rocky Mountain National Park",
    "sagu": "Saguaro National Park",
    "seki": "Sequoia National Park",
    "shen": "Shenandoah National Park",
    "thro": "Theodore Roosevelt National Park",
    "viis": "Virgin Islands National Park",
    "voya": "Voyageurs National Park",
    "whsa": "White Sands National Park",
    "wica": "Wind Cave National Park",
    "wrst": "Wrangell-St. Elias National Park and Preserve",
    "Yellowstone National Park": "yell",
    "yose": "Yosemite National Park",
    "zion": "Zion National Park"
  }



  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/campgrounds/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setCampgrounds(response.data.campgrounds);
        console.log(response.data.campgrounds, "campgrounds data")
      } catch (error) {
        console.error("Error fetching campgrounds data:", error);
      }
    };

    fetchCampgrounds();
  }, []);


  const handleChange = (e) => {
    const parkName = e.target.value;
    setSearchTerm(parkName);
  };

  const filteredCampgrounds = campgrounds.filter(campground => {
    const parkName = parkCodes[campground.parkCode] || campground.parkCode;
    return parkName.toLowerCase().includes(searchTerm.toLowerCase()) || campground.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const displayImages = (images) => {
    return images.map((image, index) => (
      <div key={index}>
        <img src={image.url} alt={image.altText} width="200" />
        <p>{image.caption}</p>
      </div>
    ));
  };

  return (
    <div>
      <h1>National Parks Campgrounds</h1>
      <select onChange={handleChange}>
        <option value="">Select a park</option>
        {Object.entries(parkCodes).map(([code, name]) => (
          <option key={code} value={name}>
            {name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Search by park name or campground name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredCampgrounds.map((campground, index) => (
          <li key={index}>
            <h2>{campground.name}</h2>
            <p>{campground.description}</p>
            <p>Location: {campground.latLong}</p>
            <p>Wheelchair Access: {campground.accessibility?.wheelchairAccess}</p>
            <p>Directions: {campground.directionsOverview}</p>
            <p>
              Reservations:{" "}
              <a href={campground.reservationUrl} target="_blank" rel="noreferrer">
                {campground.reservationUrl ? "Book here" : "Not available"}
              </a>
            </p>
            {displayImages(campground.images)}
          </li>
        ))}
      </ul>
    </div >
  );
};

export default Campgrounds;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Campgrounds = () => {
//   const [campgrounds, setCampgrounds] = useState([]);

//   useEffect(() => {
//     const fetchCampgrounds = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`http://${import.meta.env.VITE_BASE_URL}/api/campgrounds/`, {
//           headers: { Authorization: `Token ${token}` },
//         });
//         setCampgrounds(response.data.campgrounds);
//         console.log(response.data.campgrounds, "campgrounds data")
//       } catch (error) {
//         console.error("Error fetching campgrounds data:", error);
//       }
//     };

//     fetchCampgrounds();
//   }, []);

//   return (
//     <div>
//       <h1>National Parks Campgrounds</h1>
//       <ul>
//         {campgrounds.map((campground, index) => (
//           <li key={index}>
//             <h2>{campground.name}</h2>
//             <p>{campground.description}</p>
//             <p>Location: {campground.latLong}</p>
//             <p>Wheelchair Access: {campground.accessibility?.wheelchairAccess}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Campgrounds;


