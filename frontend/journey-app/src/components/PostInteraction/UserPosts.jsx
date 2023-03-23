import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Map from "./Map";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/api/userposts/?limit=10&page=${page}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setPosts((prevPosts) => [...prevPosts, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching user's posts: ", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
      fetchPosts();
    }
  }, []);

  useEffect(() => {
    fetchPosts();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchPosts, handleScroll]);

  return (
    <div>
      <h1>Your Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>Difficulty Level: {post.difficulty_level}</p>
            <p>{post.description}</p>
            <img src={`http://localhost:8000${post.image_url}`} alt={post.title} />
            <Map lat={post.latitude} lng={post.longitude} />
          </li>
        ))}
      </ul>
      {loading && <p>Loading more posts...</p>}
    </div>
  );
};

export default UserPosts;





// // ok Infinity scroll with the correct geotag loc is working below
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Map from "./Map"; // Import the Map component

// const UserPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     // Fetch initial posts
//     fetchPosts();
//     // Initialize an event listener for the scroll event
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       // Clean up the event listener on unmounting
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const fetchPosts = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:8000/api/userposts/?limit=10&page=${page}`, {
//         headers: {
//           Authorization: `Token ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });

//       setPosts((prevPosts) => [...prevPosts, ...response.data.results]);
//       setPage((prevPage) => prevPage + 1);
//     } catch (error) {
//       console.error("Error fetching user's posts: ", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScroll = () => {
//     if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
//       fetchPosts();
//     }
//   };

//   return (
//     <div>
//       <h1>Your Posts</h1>
//       <ul>
//         {posts.map((post) => (
//           <li key={post.id}>
//             <h3>{post.title}</h3>
//             <p>Difficulty Level: {post.difficulty_level}</p>
//             <p>{post.description}</p>
//             <img src={`http://localhost:8000${post.image_url}`} alt={post.title} />
//             {/* Display the map with the geotag for the post */}
//             <Map lat={post.latitude} lng={post.longitude} />
//           </li>
//         ))}
//       </ul>
//       {/* Display a loading indicator while fetching more posts */}
//       {loading && <p>Loading more posts...</p>}
//     </div>
//   );
// };

// export default UserPosts;






// below works perfect pre map rendering
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const UserPosts = () => {
//   // Declare a state variable 'posts' and initialize it with an empty array
//   const [posts, setPosts] = useState([]);

//   // useEffect hook runs the provided function when the component mounts
//   useEffect(() => {
//     // Define an async function to fetch user posts
//     const fetchPosts = async () => {
//       try {
//         // Send a GET request to the API endpoint with the Authorization header
//         const response = await axios.get("http://localhost:8000/api/userposts/", {
//           headers: {
//             Authorization: `Token ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//           withCredentials: true, //need this when using the Cookie/id stealth
//         });

//         console.log("Response data: ", response.data); // Log the response data to the console
//         // Update the 'posts' state variable with the fetched data
//         console.log("Response data THIS IS THE GOODS: ", response.data.results);
//         setPosts(response.data.results);
//       } catch (error) {
//         // Log any error that occurs during the API request
//         console.error("Error fetching user's posts: ", error);
//       }
//     };

//     // Call the fetchPosts function to fetch user posts
//     fetchPosts();
//   }, []); // Empty dependency array ensures the effect only runs once, when the component mounts

//   // Render the component with fetched posts
//   return (
//     <div>
//       <h1>Your Posts</h1>
//       <ul>
//         {/* Iterate through the 'posts' array and render a list item for each post */}
//         {posts.map((post) => (
//           <li key={post.id}>
//             <h3>{post.title}</h3>
//             <p>Difficulty Level: {post.difficulty_level}</p>
//             <p>{post.description}</p>
//             <img src={`http://localhost:8000${post.image_url}`} alt={post.title} />

//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserPosts;