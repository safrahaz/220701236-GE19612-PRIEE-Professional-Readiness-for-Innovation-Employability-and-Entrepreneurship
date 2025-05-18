import React, { useEffect, useState } from 'react';
import useLogout from '../Hooks/Uselogout';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import axios from 'axios';


const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

function ReportPage() {
    let navigate=useNavigate();
    let logout=useLogout();
  const [selectedYear, setSelectedYear] = useState('2025');
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const fetchReportData = async () => {
    try {
      const res = await axios.get('http://localhost:3000/food/get_order', {
        params: { year: selectedYear }
      });
      if (res.status === 200) {
        setData(res.data.data || []);
      }
    } catch (err) {
      console.error('Fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [selectedYear]);

  useEffect(() => {
    const summary = { Tiffin: 0, Lunch: 0, Dinner: 0 };
  
    data.forEach(item => {
      const state = item.state?.toLowerCase();
      const price = Number(item.price);
  
      if (!isNaN(price)) {
        if (state === 'tiffin') summary.Tiffin += price;
        else if (state === 'lunch') summary.Lunch += price;
        else if (state === 'dinner') summary.Dinner += price;
      }
    });
  
    console.log("Summary counts:", summary);
  
    const formatted = Object.entries(summary).map(([key, value]) => ({
      name: key,
      value,
    }));
  
    setChartData(formatted);
  }, [data]);
  

  return (
    <div className="report-page">
      <header className="dashboard-header">
        <div className="logo">Saf Hotel</div>
        <div className="header-buttons">
          <button className="logout2-btn" onClick={() => navigate('/Dashboard')}>Home</button>
          <button className="logout1-btn" onClick={() => navigate('/Cart')}>Cart</button>
          <button className="logout-btn" onClick={logout}>Logout</button>
          <select
          className="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
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
       
      </header>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Bar Chart - Quantity by State</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Pie Chart - Quantity by State</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ReportPage;
