import React from 'react'
import axios from 'axios';
import  toast  from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Signup() {
  let [name,setname]=useState("");
  let [email,setemail]=useState("");
  let [phone,setphone]=useState("");
  let [password,setpassword]=useState("");
  let [age,setAge]=useState("");
  let [con_pass,setcon_pass]=useState("");
  let [state,setstate]=useState("");
  let navigate=useNavigate();
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];
  const register = async () => {
    if (!name || !email || !phone || !age || !password || !con_pass || !state) {
      toast.error("All fields are required");
      return;
    }
    try {
      let res = await axios.post('http://localhost:3000/user/signup', {
        name, email, password, con_pass, phone, age, state
      });
  
      if (res.status === 200) {
        toast.success("Account created successfully");
        setname("");
        setemail("");
        setphone("");
        setpassword("");
        setcon_pass("");
        setstate("");
        setAge("");
        navigate('/');
      }
    } catch (err) {
      toast.error("Something went wrong. Try again later.");
    }
  };
  
  return (
    <div className="body1">
         <div className="container">
        <h2>Sign Up</h2>
        <div >
            <input type="text" placeholder="Name" required  value={name} onChange={(e)=>{setname(e.target.value)}}/>
            <input type="email" placeholder="Email" required value={email} onChange={(e)=>{setemail(e.target.value)}}/>
            <input type="tel"  value={phone} onChange={((e)=>{setphone(e.target.value)})} placeholder="Phone Number" required/>
            <input type="number" value={age} onChange={((e)=>{setAge(e.target.value)})} placeholder="Age" required/>
            <input type="password" value={password} onChange={((e)=>{setpassword(e.target.value)})} placeholder="Password" required/>
            <input type="password" placeholder="confirm password" value={con_pass} onChange={((e)=>{setcon_pass(e.target.value)})} required/>
            <select className="input1"  value={state} onChange={((e)=>{setstate(e.target.value)})}>
              <option >--states--</option>{
              states.map((e,i)=>(
                <option key={i} value={e}>{e}</option>
                   
              ))}
            </select>
            <button className="btn" onClick={()=>{register()}} >Sign Up</button>
        </div>
    </div>
    </div>
  )
}

export default Signup
