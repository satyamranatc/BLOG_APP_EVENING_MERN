// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

export default function Home() {
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

      {/* Featured Posts Section */}
      <section className="featured-posts">
        <h2 className="section-title">Featured Articles</h2>
        <div className="posts-grid">
          {/* Post 1 */}
          <article className="post-card">
            <div className="post-image" style={{ backgroundImage: 'url(https://source.unsplash.com/random/600x400?tech)' }}></div>
            <div className="post-content">
              <span className="post-category">Technology</span>
              <h3 className="post-title">The Future of AI in Web Development</h3>
              <p className="post-excerpt">How artificial intelligence is transforming the way we build websites and applications...</p>
              <Link to="#" className="read-more">Read More</Link>
            </div>
          </article>

          {/* Post 2 */}
          <article className="post-card">
            <div className="post-image" style={{ backgroundImage: 'url(https://source.unsplash.com/random/600x400?design)' }}></div>
            <div className="post-content">
              <span className="post-category">Design</span>
              <h3 className="post-title">Minimalist Design Principles</h3>
              <p className="post-excerpt">Learn how to create impactful designs with less elements and more intention...</p>
              <Link to="#" className="read-more">Read More</Link>
            </div>
          </article>

          {/* Post 3 */}
          <article className="post-card">
            <div className="post-image" style={{ backgroundImage: 'url(https://source.unsplash.com/random/600x400?code)' }}></div>
            <div className="post-content">
              <span className="post-category">Development</span>
              <h3 className="post-title">Optimizing React Performance</h3>
              <p className="post-excerpt">Essential techniques to make your React applications faster and more efficient...</p>
              <Link to="#" className="read-more">Read More</Link>
            </div>
          </article>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About BlogSphere</h4>
            <p>A platform for sharing modern ideas and innovations in the digital world.</p>
          </div>
          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><Link to="#">Technology</Link></li>
              <li><Link to="#">Design</Link></li>
              <li><Link to="#">Development</Link></li>
              <li><Link to="#">Creativity</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-icons">
              <Link to="#" className="social-icon">Twitter</Link>
              <Link to="#" className="social-icon">GitHub</Link>
              <Link to="#" className="social-icon">Dribbble</Link>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} BlogSphere. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}