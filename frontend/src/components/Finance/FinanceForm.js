import React, { useState } from 'react';
import axios from 'axios';

const FinanceForm = () => {
  const [formData, setFormData] = useState({
    income: '',
    expenses: '',
    savings: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/finance', formData, { withCredentials: true });
      setMessage('Financial data saved successfully!');
      setFormData({ income: '', expenses: '', savings: '' });
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error saving financial data');
    }
  };

  return (
    <div className="form-container metal-card">
      <h2>Financial Entry</h2>
      {message && (
        <div className={`alert ${message.includes('Error') ? 'alert-error' : 'alert-success'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Income ($)</label>
            <input
              type="number"
              value={formData.income}
              onChange={(e) => setFormData({...formData, income: e.target.value})}
              step="0.01"
              required
            />
          </div>
          <div className="form-group">
            <label>Expenses ($)</label>
            <input
              type="number"
              value={formData.expenses}
              onChange={(e) => setFormData({...formData, expenses: e.target.value})}
              step="0.01"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label>Savings ($)</label>
          <input
            type="number"
            value={formData.savings}
            onChange={(e) => setFormData({...formData, savings: e.target.value})}
            step="0.01"
            required
          />
        </div>
        <button type="submit" className="metal-button">
          Save Financial Data
        </button>
      </form>
    </div>
  );
};

export default FinanceForm;