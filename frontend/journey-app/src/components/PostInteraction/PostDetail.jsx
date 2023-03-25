// src/components/PostDetail/PostDetail.jsx  this is just a prototype i was working on...
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PostDetail({ postId, onDelete }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`/api/posts/${postId}/`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>Loading post...</div>;
  }

  const deletePost = async () => {
    try {
      await axios.delete(`/api/posts/${postId}/`);
      onDelete();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.image_url} alt={post.title} />
      <p>Difficulty: {post.difficulty_level}</p>
      <p>{post.description}</p>
      <p>Latitude: {post.latitude}</p>
      <p>Longitude: {post.longitude}</p>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default PostDetail;
