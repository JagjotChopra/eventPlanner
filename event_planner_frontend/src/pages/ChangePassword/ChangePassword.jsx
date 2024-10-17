 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 
  const navigate = useNavigate();

  // JWT token is stored in localStorage after login
  const token = localStorage.getItem('token'); // Fetch the JWT token
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <>
      <div className="reset-container">
        <div className="reset-box">
          <h3>Change Password</h3>
          <form onSubmit={handleSubmit} className='reset-form' style={{ marginTop: '10px' }}>
            <input
              type="password"
              placeholder="New Password"
              className='reset-input-password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className='reset-input-password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ marginTop: '20px' }}
              required
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className='reset-input-password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{ marginTop: '20px' }}
              required
            />
            <button type="submit" className='submit-btn' style={{ marginTop: '20px' }}>Change Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;



