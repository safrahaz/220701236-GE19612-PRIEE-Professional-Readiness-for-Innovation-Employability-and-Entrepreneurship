import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import useLogout from "../Hooks/Uselogout.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  let navigate=useNavigate();
  const logout = useLogout();
  const [cartItems, setCartItems] = useState([]);
  const [email, setemail] = useState("");
   const store =async()=>{
    try{
      let res=await axios.get('http://localhost:3000/food/get_cart');
      if(res.status===200){
        console.log("OK");
      }
      else if(res.status===500){
        toast.error("Check !!!")
      }
    }
    catch(err){
      toast.error(err);
    }
   }

   const delete2=async()=>{
    try{
    let res=await axios.delete('http://localhost:3000/food/delete2');
    if(res.status===200){
      console.log("DOne");
      get();
    }
    else if (res.status===500){
      toast.error("Check the deletion");
    }}
    catch(err){
      toast.error("Check !!!1")
    }
  }

  const sendBill = () => {
    if (!email) {
      toast.error("Please enter an email!");
      return;
    }

    const billDetails = {
      email,
      items: cartItems,
      total: calculateTotal(),
    };

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("ACE SPAD HOTEL", 70, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Near XYZ Road, City, PIN-123456", 70, 26);
    doc.line(10, 30, 200, 30);

    doc.setFontSize(11);
    doc.text(`Bill To: ${billDetails.email}`, 14, 36);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 36);
    doc.line(10, 40, 200, 40);

    let y = 50;
    doc.setFont("helvetica", "bold");
    doc.rect(10, y - 6, 190, 10);
    doc.text("S.No", 14, y);
    doc.text("Item Name", 30, y);
    doc.text("Qty", 120, y);
    doc.text("Price", 140, y);
    doc.text("Total", 170, y);
    y += 10;

    doc.setFont("helvetica", "normal");

    billDetails.items.forEach((item, i) => {
      doc.rect(10, y - 6, 190, 10);
      doc.text(`${i + 1}`, 14, y);
      doc.text(item.name, 30, y);
      doc.text(`${item.quantity}`, 120, y);
      doc.text(`₹${item.price}`, 140, y);
      doc.text(`₹${item.price * item.quantity}`, 170, y);
      y += 10;
    });

    doc.setFont("helvetica", "bold");
    doc.rect(10, y - 6, 190, 10);
    doc.text("Grand Total", 140, y);
    doc.text(`₹${billDetails.total}`, 170, y);

    y += 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Thank you for dining with us!", 70, y);
    doc.line(10, y + 2, 200, y + 2);

    const pdfBlob = doc.output("blob");
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64data = reader.result.split(",")[1];

      try {
        await axios.post("http://localhost:3000/food/bill", {
          email: billDetails.email,
          pdfBase64: base64data,
        });
        toast.success("Bill sent to email!");
        await store();
        await delete2();

      } catch (error) {
        toast.error("Failed to send email!");
      }
    };

    reader.readAsDataURL(pdfBlob);
    setemail("");
  };

  const get = async () => {
    try {
      const res = await axios.get("http://localhost:3000/food/cart");
      if (res.status === 200) {
        setCartItems(res.data.data);
      } else if (res.status === 500) {
        toast.error("Check");
      }
    } catch (err) {
      toast.error("Error fetching cart data!");
    }
  };

  const handleQuantityChange = (index, qty) => {
    const updated = [...cartItems];
    updated[index].quantity = parseInt(qty);
    setCartItems(updated);
  };

  const delete1 = async (name) => {
    try {
      const res = await axios.delete("http://localhost:3000/food/del_cart", {
        params: { name },
      });
      if (res.status === 200) {
        toast.success("Food deleted");
        get();
      } else if (res.status === 500) {
        toast.error("Food not deleted");
      }
    } catch (err) {
      toast.error("Check delete API!");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <>
      <header className="dashboard-header">
        <div className="logo">Saf Hotel</div>
        <div className="header-buttons">
        <button className="logout2-btn" onClick={() => navigate('/Dashboard')}>Home</button>

          <button className="logout-btn" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </header>

      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="no-items">Cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <div className="item-name">{item.name}</div>

              <div className="item-qty">
                <label>Qty:</label>
                <select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                >
                  {[...Array(10).keys()].map((n) => (
                    <option key={n + 1} value={n + 1}>
                      {n + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="item-price">₹ {item.price * item.quantity}</div>

              <button
                className="logout3-btn"
                onClick={() => {
                  delete1(item.name);
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="cart-total">
            <h3>Total: ₹ {calculateTotal()}</h3>
          </div>
        )}

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
            required
          />
        </div>

        <button className="send-btn" onClick={sendBill}>
          Send Bill
        </button>
      </div>
    </>
  );
};

export default Cart;
