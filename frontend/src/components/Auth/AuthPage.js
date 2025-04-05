import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPage.css'; // Make sure to create this CSS file

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/api/login' : '/api/register';
      const payload = isLogin
        ? { 
            username: formData.username, 
            password: formData.password 
          }
        : {
            username: formData.username,
            email: formData.email,
            password: formData.password
          };

      const { data } = await axios.post(endpoint, payload, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      if (data.error) throw new Error(data.error);

      // Store auth state and redirect
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.message ||
        (isLogin ? 'Login failed. Please check your credentials.' : 'Registration failed. The username or email may already be taken.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container metal-card">
      <h2>{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
      <p className="auth-subtitle">
        {isLogin ? 'Sign in to continue to EcoTrack' : 'Join EcoTrack to start tracking your carbon footprint'}
      </p>
      
      {error && (
        <div className="alert alert-error">
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}

      <form onSubmit={handleAuth}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            placeholder="Enter your username"
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            placeholder="Enter your password"
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>
        )}

        <button 
          type="submit" 
          className="btn primary-btn"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <i className="fas fa-spinner fa-spin"></i> Processing...
            </>
          ) : isLogin ? (
            'Sign In'
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <div className="auth-switch">
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <button 
              className="link-btn"
              onClick={() => {
                setIsLogin(false);
                setError('');
              }}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button 
              className="link-btn"
              onClick={() => {
                setIsLogin(true);
                setError('');
              }}
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;