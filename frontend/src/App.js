import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './components/Auth/AuthPage';
import Dashboard from './components/Dashboard/Dashboard';
import CarbonForm from './components/Carbon/CarbonForm';
import FinanceForm from './components/Finance/FinanceForm';
import Profile from './components/Auth/Profile';
import Navbar from './components/Common/Navbar';
import NotFound from './components/Common/NotFound';
import { useAuth } from './contexts/AuthContext';
import './styles.css';

function App() {
  const { currentUser } = useAuth();

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={!currentUser ? <AuthPage /> : <Navigate to="/" />} />
        
        {/* Protected routes */}
        <Route path="/" element={currentUser ? <Dashboard /> : <Navigate to="/auth" />} />
        <Route path="/carbon" element={currentUser ? <CarbonForm /> : <Navigate to="/auth" />} />
        <Route path="/finance" element={currentUser ? <FinanceForm /> : <Navigate to="/auth" />} />
        <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/auth" />} />
        
        {/* 404 handling */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;