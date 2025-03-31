// BlogFeed.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./BlogFeed.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function BlogFeed() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get(`${API_URL}/posts`);
        setPosts(response.data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load posts. Please try again later.');
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div className="dark-theme">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Modern Thoughts</h1>
          <p>Exploring ideas in technology, design, and creativity</p>
          <Link to="/blog" className="cta-button">Explore Articles</Link>
        </div>
      </section>

      {/* Blog Feed Section */}
      <section className="featured-posts">
        <h2 className="section-title">Latest Articles</h2>
        
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading articles...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.length === 0 ? (
              <div className="no-posts">
                <p>No articles available at the moment</p>
              </div>
            ) : (
              posts.map(post => (
                <article key={post._id} className="post-card">
                  <div className="post-image" style={{ backgroundImage: `url(${post.poster})` }}></div>
                  <div className="post-content">
                    <span className="post-category">{post.category}</span>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">
                      {post.desc.length > 120 ? `${post.desc.substring(0, 120)}...` : post.desc}
                    </p>
                    <div className="post-meta">
                      <span className="post-author">By {post.author}</span>
                      <span className="post-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <Link to={`/post/${post._id}`} className="read-more">Read More</Link>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
}