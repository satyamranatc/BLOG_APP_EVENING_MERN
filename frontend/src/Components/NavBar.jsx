import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Popup from 'reactjs-popup';
const NavBar = ({isLogedIn,setisLogedIn}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [userData, setUserData] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(()=>{
    if(localStorage.getItem("token")){
      setisLogedIn(true);
      setUserData(JSON.parse(localStorage.getItem("UserData")));
      console.log(JSON.parse(localStorage.getItem("UserData")));
    }
    else{
      setisLogedIn(false);
    }

  },[])

  return (
    <header className="header">
    <nav className="nav-container">
      <div className="logo">BlogSphere</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/about">About</Link></li>
        {
          isLogedIn?
          <>
          <div>
            <h2>{userData.FullName}</h2>
            <button onClick={()=>{
              localStorage.removeItem("token");
              localStorage.removeItem("UserData");
              setisLogedIn(false);
              setUserData(null);
              console.log("User Logged Out....")
            }} >
              LogOut
            </button>
          </div>
          </>:
          <>
            <li><Link to="/login">Login</Link></li>
          </>

        }
      </ul>
    </nav>
  </header>
  );
};

export default NavBar;