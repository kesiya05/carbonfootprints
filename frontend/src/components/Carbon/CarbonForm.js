import React, { useState } from 'react';
import axios from 'axios';

const CarbonForm = () => {
  const [formData, setFormData] = useState({
    electricity: '',
    gas: '',
    water: '',
    waste: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/carbon', formData, { withCredentials: true });
      setMessage('Carbon data saved successfully!');
      setFormData({ electricity: '', gas: '', water: '', waste: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving carbon data');
    }
  };

  return (
    <div className="form-container metal-card">
      <h2>Carbon Footprint Entry</h2>
      {message && <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>{message}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Electricity (kWh)</label>
            <input
              type="number"
              value={formData.electricity}
              onChange={(e) => setFormData({...formData, electricity: e.target.value})}
              step="0.1"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Gas (therms)</label>
            <input
              type="number"
              value={formData.gas}
              onChange={(e) => setFormData({...formData, gas: e.target.value})}
              step="0.1"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Water (gallons)</label>
            <input
              type="number"
              value={formData.water}
              onChange={(e) => setFormData({...formData, water: e.target.value})}
              step="0.1"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Waste (kg)</label>
            <input
              type="number"
              value={formData.waste}
              onChange={(e) => setFormData({...formData, waste: e.target.value})}
              step="0.1"
              required
            />
          </div>
        </div>

        <button type="submit" className="metal-button">
          Save Carbon Data
        </button>
      </form>
    </div>
  );
};

export default CarbonForm;