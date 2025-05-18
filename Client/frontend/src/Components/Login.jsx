import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from 'axios';
import  toast  from 'react-hot-toast';

function Login() {
    let [email,setemail]=useState("");
    let [password,setpassword]=useState("");
    let navigate=useNavigate();
    const login=async()=>{
        try{
            let res=await axios.post('http://localhost:3000/user/login',{email,password})
            if(res.status===200){
                toast.success("Logged successfull");
                sessionStorage.setItem('token',res.data.token);
                sessionStorage.setItem('name',res.data.Name);
                sessionStorage.setItem('email',res.data.Email);

                setemail("");
                setpassword("");
                navigate('/Dashboard');
            }
            else if(res.status===400){
                toast.error("Password wrong");

            }
            else if(res.status===500){
                toast.error("Invalid email");

            }
        }
        catch(err){
             toast.error("Something went wrong try again after some times...")
        }

    }  
 
  return (
    <div className='body'>
        <div className="login-container">
        <div className="login-form" >
            <h2>Login</h2>
            <div className="input-group">
                <label >Email</label>
                <input type="email" id="email" name="email" value={email} onChange={(e)=>{setemail(e.target.value)}} required/>
            </div>
            <div className="input-group">
                <label >Password</label>
                <input type="password" id="password" name="password" value={password} onChange={(e)=>{setpassword(e.target.value)}} required/>
            </div>
            <button onClick={(()=>{login()})} className="login-btn">Login</button>
            <p className="signup-link">Donot have an account? <Link to='/signup' >Sign up</Link></p>
        </div>
    </div>
    </div>
  )
}

export default Login