import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import "./App.css";

export default function App() {
  const [allData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    axios.get('http://localhost:5500/api/posts')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError("Failed to load blog posts");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const newPost = {
      poster: e.target[0].value,
      title: e.target[1].value,
      desc: e.target[2].value,
      author: e.target[3].value
    };

    try {
      await axios.post('http://localhost:5500/api/posts', newPost);
      console.log('Post added successfully');
      fetchData(); // Refresh data
      // Clear form
      e.target.reset();
    } catch (err) {
      console.error("Error adding post:", err);
    }
  }

  async function handleUpdate(e, item) {
    e.preventDefault();
    const updatedPost = {
      poster: e.target[0].value || item.poster,
      title: e.target[1].value || item.title,
      desc: e.target[2].value || item.desc,
      author: e.target[3].value || item.author
    };

    try {
      await axios.put(`http://localhost:5500/api/posts/${item._id}`, updatedPost);
      console.log('Post updated successfully');
      fetchData(); // Refresh data
    } catch (err) {
      console.error("Error updating post:", err);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:5500/api/posts/${id}`);
        setData(allData.filter(item => item._id !== id));
      } catch (err) {
        console.error("Error deleting post:", err);
      }
    }
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Blog Admin Panel</h1>
        <p>Manage your blog content efficiently</p>
      </header>

      <div className="admin-content">
        <section className="add-post-section">
          <h2>Add New Post</h2>
          <form onSubmit={handleSubmit} className="post-form">
            <div className="form-group">
              <label htmlFor="poster">Image URL</label>
              <input id="poster" type="text" placeholder="Image URL" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input id="title" type="text" placeholder="Post title" required />
            </div>
            
            <div className="form-group">
              <label htmlFor="desc">Description</label>
              <textarea 
                id="desc" 
                placeholder="Post content" 
                rows="5" 
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input id="author" type="text" placeholder="Author name" required />
            </div>
            
            <button type="submit" className="submit-btn">Add Post</button>
          </form>
        </section>

        <section className="posts-section">
          <h2>Manage Posts</h2>
          
          {loading && <div className="loading">Loading posts...</div>}
          
          {error && <div className="error-message">{error}</div>}
          
          {!loading && !error && allData.length === 0 && (
            <div className="no-posts">No posts found. Add your first post above!</div>
          )}
          
          <div className="posts-grid">
            {allData && allData.map(item => (
              <div key={item._id} className="post-card">
                {item.poster && (
                  <div className="post-image">
                    <img src={item.poster} alt={item.title} />
                  </div>
                )}
                
                <div className="post-content">
                  <h3>{item.title}</h3>
                  <p className="post-desc">{item.desc.length > 150 ? 
                    `${item.desc.substring(0, 150)}...` : item.desc}</p>
                  <p className="post-author">By: {item.author}</p>
                  
                  <div className="post-actions">
                    <Popup 
                      trigger={<button className="update-btn">Edit</button>} 
                      modal
                      contentStyle={{ width: '80%', maxWidth: '500px' }}
                    >
                      {close => (
                        <div className="modal">
                          <button className="close-btn" onClick={close}>&times;</button>
                          <h3>Update Post</h3>
                          <form onSubmit={(e) => {
                            handleUpdate(e, item);
                            close();
                          }} className="post-form">
                            <div className="form-group">
                              <label>Image URL</label>
                              <input type="text" defaultValue={item.poster} placeholder="Image URL" />
                            </div>
                            
                            <div className="form-group">
                              <label>Title</label>
                              <input type="text" defaultValue={item.title} placeholder="Post title" />
                            </div>
                            
                            <div className="form-group">
                              <label>Description</label>
                              <textarea 
                                defaultValue={item.desc} 
                                placeholder="Post content" 
                                rows="5"
                              ></textarea>
                            </div>
                            
                            <div className="form-group">
                              <label>Author</label>
                              <input type="text" defaultValue={item.author} placeholder="Author name" />
                            </div>
                            
                            <div className="modal-actions">
                              <button type="button" className="cancel-btn" onClick={close}>Cancel</button>
                              <button type="submit" className="submit-btn">Update</button>
                            </div>
                          </form>
                        </div>
                      )}
                    </Popup>
                    <button 
                      className="delete-btn" 
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      
      <footer className="admin-footer">
        <p>&copy; {new Date().getFullYear()} Blog Admin Panel</p>
      </footer>
    </div>
  );
}