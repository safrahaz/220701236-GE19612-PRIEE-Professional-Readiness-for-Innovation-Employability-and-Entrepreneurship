import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../Hooks/Uselogout';
import toast from 'react-hot-toast';
import axios from 'axios';


function Order() {
  const logout = useLogout();
  const navigate = useNavigate();
  let [data,setdata]=useState([]);

  const [selectedYear, setSelectedYear] = useState('2025');


  let params={year:selectedYear}
   const get_order=async()=>{
    try{
        let res=await axios.get('http://localhost:3000/food/get_order',{params})
        if(res.status===200){
            setdata(res.data.data);
        }
        else if(res.status===500){
            toast.error("Error");
        }
           
    }
    catch(err){
        toast.error("Check !!!2")

    }
   }
 useEffect(()=>{
    get_order();
 })
  return (
    <div className="order-page">
      <header className="dashboard-header">
        <div className="logo">Saf Hotel</div>
        <div className="header-buttons">
          <button className="logout2-btn" onClick={() => navigate('/Dashboard')}>Home</button>
          <button className="logout1-btn" onClick={() => navigate('/Cart')}>Cart</button>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="order-body">
        <div className="year-filter">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            {[...Array(11)].map((_, i) => {
              const year = 2020 + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        <div className="report-list">
          {data.length === 0 ? (
            <p>No reports found for {selectedYear}</p>
          ) : (
            data.map((item, index) => (
              <div className="report-item" key={index}>
                <p><strong>Name:</strong> {item.name}</p>
                <p><strong>Price:</strong> ₹{item.price}</p>
                <p><strong>Quantity:</strong> ₹{item.quantity}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Year:</strong> {item.year}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
