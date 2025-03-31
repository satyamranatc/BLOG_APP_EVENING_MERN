// App.jsx
import React from 'react';
import "./App.css";
import NavBar from "./Components/NavBar.jsx";
import Home from "./Pages/Home.jsx";
import BlogFeed from "./Pages/Blog/BlogFeed.jsx";
import BlogPost from "./Pages/Blog/BlogPost.jsx";
import About from "./Pages/About.jsx";
import NotFound from "./Pages/NotFound.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogFeed />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}