import React, { useEffect, useState } from "react";
import axios from "axios";

const UserPosts = () => {
  // Declare a state variable 'posts' and initialize it with an empty array
  const [posts, setPosts] = useState([]);

  // useEffect hook runs the provided function when the component mounts
  useEffect(() => {
    // Define an async function to fetch user posts
    const fetchPosts = async () => {
      try {
        // Send a GET request to the API endpoint with the Authorization header
        const response = await axios.get("http://localhost:8000/api/userposts/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true, //need this when using the Cookie/id stealth
        });

        console.log("Response data: ", response.data); // Log the response data to the console
        // Update the 'posts' state variable with the fetched data
        console.log("Response data THIS IS THE GOODS: ", response.data.results);
        setPosts(response.data.results);
      } catch (error) {
        // Log any error that occurs during the API request
        console.error("Error fetching user's posts: ", error);
      }
    };

    // Call the fetchPosts function to fetch user posts
    fetchPosts();
  }, []); // Empty dependency array ensures the effect only runs once, when the component mounts

  // Render the component with fetched posts
  return (
    <div>
      <h1>Your Posts</h1>
      <ul>
        {/* Iterate through the 'posts' array and render a list item for each post */}
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>Difficulty Level: {post.difficulty_level}</p>
            <p>{post.description}</p>
            <img src={post.image} alt={post.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPosts;



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
//           },
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
//             <img src={post.image} alt={post.title} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserPosts;

