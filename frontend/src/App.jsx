// App.jsx
import React,{useState} from 'react';
import "./App.css";
import NavBar from "./Components/NavBar.jsx";
import Home from "./Pages/Home.jsx";
import BlogFeed from "./Pages/Blog/BlogFeed.jsx";
import BlogPost from "./Pages/Blog/BlogPost.jsx";
import About from "./Pages/About.jsx";
import NotFound from "./Pages/NotFound.jsx";
import Auth from "./Components/Auth.jsx";
import {BrowserRouter, Routes, Route} from "react-router-dom";

export default function App() {
  const [isLogedIn, setisLogedIn] = useState(false);
  return (
    <div className="app-container">
      <BrowserRouter>
        <NavBar isLogedIn={isLogedIn} setisLogedIn= {setisLogedIn}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogFeed />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Auth setisLogedIn= {setisLogedIn} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}