// BlogPost.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './BlogPost.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load blog post');
        setLoading(false);
      }
    }
    
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-post-container">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/" className="back-button">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      {post && (
        <>
          <div className="post-header">
            <img 
              src={post.poster} 
              alt={post.title} 
              className="post-poster"
            />
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <p className="post-author">By {post.author}</p>
              <p className="post-date">
                Posted on {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="post-content">
            {post.desc}
          </div>
          
          <Link to="/" className="back-button">Back to Home</Link>
        </>
      )}
    </div>
  );
}