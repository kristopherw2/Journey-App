import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetail({ onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axios.get(`/api/posts/${id}/`, {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }

    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading post...</div>;
  }

  const deletePost = async () => {
    try {
      await axios.delete(`/api/posts/${id}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      onDelete();
      navigate('/userposts');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>{post.title}</h1>
      <p>Difficulty level: {post.difficulty_level}</p>
      <p>Description: {post.description}</p>
      <p>Latitude: {post.latitude}</p>
      <p>Longitude: {post.longitude}</p>
      <p>Date posted: {post.date_posted}</p>
      {confirmDelete && (
        <div>
          <p>Are you sure you want to delete this post?</p>
          <button onClick={deletePost}>Yes</button>
          <button onClick={() => setConfirmDelete(false)}>No</button>
        </div>
      )}
      {!confirmDelete && (
        <button onClick={() => setConfirmDelete(true)}>Delete Post</button>
      )}
    </div>
  );
}

export default PostDetail;
