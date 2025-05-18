import React from 'react'
import axios from 'axios';
import  toast  from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Addfood() {
  let [fname,setfname]=useState("");
  let [price,setprice]=useState(0);
  let [imglink,setimglink]=useState("");
  let [state,setstate]=useState("");
  let navigate=useNavigate();
  const states = [
    "Tiffin","Lunch","Dinner"
  ];
  const register = async () => {
    if (!fname.trim()) {
      toast.error("Please enter the food name.");
      return;
    }
    if (!imglink.trim()) {
      toast.error("Please provide a valid image link.");
      return;
    }
    if (!price || isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }
    if (!state) {
      toast.error("Please select a state (Tiffin/Lunch/Dinner).");
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/food/add', {
        fname, price, state, imglink
      });

      if (res.data) {
        toast.success("Food added successfully");
        setfname("");
        setprice(0);
        setstate("");
        setimglink("");
        navigate('/Dashboard');
      } else {
        toast.error("Something went wrong.");
      }
    } catch (err) {
      toast.error("Error while adding food.");
    }
  };

  return (
    <div className="body1">
        
         <div className="container">
            
        <h2>Add food</h2>
        <div >
            <input type="text" placeholder="Food name" required  value={fname} onChange={(e)=>{setfname(e.target.value)}}/>
            <input type="text" placeholder="img link" value={imglink} onChange={((e)=>{setimglink(e.target.value)})} required/>
            <input type="number" placeholder="price$" value={price} onChange={((e)=>{setprice(e.target.value)})} required/>            <select className="input1"  value={state} onChange={((e)=>{setstate(e.target.value)})}>
              <option >--Type--</option>{
              states.map((e,i)=>(
                <option key={i} value={e}>{e}</option>
                   
              ))}
            </select>
            <button className="btn" onClick={()=>{register()}} >ADD</button>
            <button className="btn1" onClick={()=>{navigate('/Dashboard')}} >Back to home</button>

        </div>
    </div>
    </div>
  )
}

export default Addfood
