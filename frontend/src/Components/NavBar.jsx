import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
    <nav className="nav-container">
      <div className="logo">BlogSphere</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>
    </nav>
  </header>
  );
};

export default NavBar;