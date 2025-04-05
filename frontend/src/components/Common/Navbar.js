import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar metal-card">
      <div className="nav-brand">Carbon Tracker</div>
      <div className="nav-links">
        <Link to="/" className="nav-link">Dashboard</Link>
        <Link to="/carbon" className="nav-link">Carbon</Link>
        <Link to="/finance" className="nav-link">Finance</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <button onClick={onLogout} className="nav-link">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;