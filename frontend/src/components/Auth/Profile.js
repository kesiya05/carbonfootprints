import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = ({ user }) => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfileData({
        ...profileData,
        username: user.username,
        email: user.email
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (profileData.newPassword !== profileData.confirmPassword) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      return;
    }

    try {
      const payload = {
        email: profileData.email
      };
      
      if (profileData.newPassword) {
        payload.password = profileData.newPassword;
        payload.currentPassword = profileData.currentPassword;
      }

      await axios.put('/api/profile', payload, { withCredentials: true });
      setMessage({ text: 'Profile updated successfully', type: 'success' });
      setIsEditing(false);
      // Clear password fields
      setProfileData({
        ...profileData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      setMessage({
        text: error.response?.data?.error || 'Failed to update profile',
        type: 'error'
      });
    }
  };

  return (
    <div className="profile-container metal-card">
      <h2>User Profile</h2>
      
      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {message.text}
        </div>
      )}

      {!isEditing ? (
        <div className="profile-view">
          <div className="profile-field">
            <label>Username:</label>
            <p>{profileData.username}</p>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <p>{profileData.email}</p>
          </div>
          <button 
            className="metal-button"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Current Password (to confirm changes)</label>
            <input
              type="password"
              name="currentPassword"
              value={profileData.currentPassword}
              onChange={handleChange}
              required={isEditing}
              placeholder="Enter current password to confirm changes"
            />
          </div>

          <div className="form-group">
            <label>New Password (leave blank to keep current)</label>
            <input
              type="password"
              name="newPassword"
              value={profileData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password (optional)"
            />
          </div>

          {profileData.newPassword && (
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={profileData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="metal-button">
              Save Changes
            </button>
            <button
              type="button"
              className="metal-button secondary"
              onClick={() => {
                setIsEditing(false);
                setMessage({ text: '', type: '' });
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;