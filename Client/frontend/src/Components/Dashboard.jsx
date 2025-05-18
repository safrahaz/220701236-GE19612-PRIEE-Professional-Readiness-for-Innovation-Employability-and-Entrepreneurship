import React, { useState, useEffect } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../Hooks/Uselogout";
const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [cart,setcart]=useState(0);
  let logout=useLogout();

  const get = async () => {
    const params = { state: "Tiffin" };
    try {
      const res = await axios.get('http://localhost:3000/food/get', { params });
      if (res.status === 200) {
        setData(res.data.data);
      } else if (res.status === 500) {
        toast.error("Fetching error");
      }
    } catch (err) {
      toast.error("Error!!!!");
    }
  };
  const delete3=async(name)=>{
    const params = {name:name};
    try{
      const res = await axios.delete('http://localhost:3000/food/delete3', { params });
      if(res.status===200)
        {
        console.log("successfull");
        get();
      }
      else if (res.status===500){
        console.log("Unsuccessfull");
      }


    }
    catch(err){
      console.log("Error!")
    }
    }
  
  
  const addtocart = async (name,price) => {
     const email=sessionStorage.getItem('email');
     console.log(email);
    try {
      const res = await axios.post('http://localhost:3000/food/addcart', { name,price,email,state:"Tiffin" });
      if (res.status === 200) {
         toast.success("food added successfully in the cart")
      } else if (res.status === 500) {
        toast.error(" error");
      }
    } catch (err) {
      toast.error("Error!!!!");
    }
  }


  useEffect(() => {
    get();
  }, []);

  return (
    <div className="dashboard-container">
   
      <header className="dashboard-header">
        <div className="logo">ACE Hotel</div>
        <div className="header-buttons">
        <button className="logout2-btn" onClick={() => navigate('/Orders')}>Orders</button>
        <button className="logout2-btn" onClick={() => navigate('/Reports')}>Reports</button>
          <button className="logout2-btn" onClick={() => navigate('/Addfood')}>Add Food</button>
          <button className="logout1-btn" onClick={()=>{
            navigate('/Cart')
          }}>Cart:{cart}</button>
          <button className="logout-btn" onClick={()=>{
            logout();
          }}>Logout</button>
        </div>
      </header>

  
      <nav className="dashboard-nav">
        <button className="nav-link active">Tiffin</button>
        <Link to='/Lunch'><button className="nav-link">Lunch</button></Link>
        <Link to='/Dinner'><button className="nav-link">Dinner</button></Link>
      </nav>

   
      <main className="food-grid">
        {data.length === 0 ? (
          <div className="no-food">No Food Available</div>
        ) : (
          data.map((item, index) => (
            <div key={index} className="food-card">
              <img
                src={item.imglink}
                alt="Food"
                className="food-image"
              />
              <div className="food-details">
                <h3>Food Item: {item.fname}</h3>
                <p>Price: ₹{item.price}</p>
                <button className="cart-btn" onClick={()=>{
                    setcart(prev=>prev+1)
                    addtocart(item.fname,item.price);
                }}>Add to Cart</button>
                 <button className="cart1-btn" onClick={()=>{
                    delete3(item.fname);
                }}>Delete</button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Dashboard;
