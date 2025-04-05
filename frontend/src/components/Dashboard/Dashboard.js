import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './Dashboard.css';

Chart.register(...registerables);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [carbonData, setCarbonData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/dashboard?range=${timeRange}`, {
          withCredentials: true
        });
        setCarbonData(response.data.carbon);
        setFinanceData(response.data.finance);
        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="time-range-selector">
          <button 
            className={timeRange === 'week' ? 'active' : ''}
            onClick={() => setTimeRange('week')}
          >
            Week
          </button>
          <button
            className={timeRange === 'month' ? 'active' : ''}
            onClick={() => setTimeRange('month')}
          >
            Month
          </button>
          <button
            className={timeRange === 'year' ? 'active' : ''}
            onClick={() => setTimeRange('year')}
          >
            Year
          </button>
        </div>
      </div>

      <div className="stats-grid">
        {/* Carbon Stats */}
        <div className="stat-card">
          <h3>Carbon Footprint</h3>
          <p>1234 kg CO2</p>
        </div>

        {/* Finance Stats */}
        <div className="stat-card">
          <h3>Net Cash Flow</h3>
          <p>$1,234</p>
        </div>
      </div>

      <div className="chart-container">
        <h2>Carbon Emissions</h2>
        <Bar 
          data={{
            labels: ['Electricity', 'Gas', 'Water', 'Waste'],
            datasets: [{
              label: 'CO2 Emissions',
              data: [300, 200, 150, 100],
              backgroundColor: [
                'rgba(46, 125, 50, 0.7)',
                'rgba(2, 119, 189, 0.7)',
                'rgba(0, 150, 136, 0.7)',
                'rgba(198, 40, 40, 0.7)'
              ]
            }]
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;