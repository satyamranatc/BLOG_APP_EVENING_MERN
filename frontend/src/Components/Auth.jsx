import React,{useState,useEffect} from 'react'
import axios from 'axios'
import "./Auth.css"
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;
export default function Auth({setisLogedIn}) {
    let navigate = useNavigate();
    let [LoginForm, setLogiinForm] = useState(true)
    

    async function handleLogin(e)
    {
        e.preventDefault();

        let UserData = {
            username:e.target[0].value,
            password:e.target[1].value
        }
        let Res = await axios.post(API_URL+"/user/login", UserData);
        if (Res.status == 200)
        {
            console.log("User Logged in....")
            localStorage.setItem("token",Res.data.token)
            localStorage.setItem("UserData",JSON.stringify(
                Res.data.userData
            ));
            setisLogedIn(true);
            navigate("/");
        }
        else
        {
            alert("Invalid Credentials")
            e.target.reset();
        }
        
    }
    
    async function handleSignup(e)
    {
        e.preventDefault();

        let UserData = {
            FullName:e.target[0].value,
            profilePic:e.target[1].value,
            username:e.target[2].value,
            password:e.target[3].value
            
        }
        let Res = await axios.post(API_URL+"/user/signup",UserData);
        if (Res.status == 200)
        {
            console.log("User SignUp in....")
            localStorage.setItem("token",Res.data.token)
            localStorage.setItem("UserData",Res.data.userData);
            setisLogedIn(true);
            navigate("/");
        }
        else
        {
            alert("Invalid Credentials")
            e.target.reset();
        }
        
    }

    return (
        <div className="auth-container">
            <section className="auth-tabs">
                <button 
                    className={`auth-tab-btn ${LoginForm ? 'active' : ''}`}
                    onClick={() => setLogiinForm(true)}
                >
                    Login
                </button>
                <button 
                    className={`auth-tab-btn ${!LoginForm ? 'active' : ''}`}
                    onClick={() => setLogiinForm(false)}
                >
                    Register
                </button>
            </section>
            {
                LoginForm ?
                <form className="auth-form" onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form> :
                <form className="auth-form" onSubmit={handleSignup}>
                    <input type="text" placeholder="Full Name" />
                    <input type="text" placeholder="Profile Pic" />
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Register</button>
                </form>
            }
        </div>
  )
}
