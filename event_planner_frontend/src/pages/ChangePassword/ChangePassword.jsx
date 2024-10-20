 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [response, setResponse] = useState({});
  const navigate = useNavigate();

  // JWT token is stored in localStorage after login
  const token = localStorage.getItem('token'); // Fetch the JWT token
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [])
  
  const validatePasswordForm = (oldPassword, newPassword, confirmPassword) => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return 'All fields are required';
    }
    if (newPassword !== confirmPassword) {
      return 'New and Confirm passwords do not match';
    }
    if (newPassword.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validatePasswordForm(oldPassword, newPassword, confirmPassword);

    if (validationError) {
      setResponse({status:'error',message:validationError});
    }
    else{
      try {
        // Send request with JWT token in the headers
        const verifyRes = await axios.post(
          'http://localhost:9000/api/v1/user/verify-password',
          { oldPassword },
          { headers: { Authorization: `Bearer ${token}` } }  // Send token in headers
        );
  
        if (verifyRes.data.message === 'Old password verified') {
          // Update password
          const updateRes = await axios.post(
            'http://localhost:9000/api/v1/user/update-password',
            { newPassword },
            { headers: { Authorization: `Bearer ${token}` } }  // Send token in headers
          );
  
          setResponse({status:'success',message:updateRes.data.message}); 
        }
      } catch (error) {
        console.log(error);
        if(error.response.data.message=="Token has expired"||error.response.data.message=="Invalid token"){
          alert(error.response.data.message+". "+"Please Login Again"); 
          navigate('/login');
        }
        else{
          setResponse({status:'error',message:error.response.data.message}); 
        }
        
      }
    }

   
  };

  return (
    <>
      <div className="reset-container">
        <div className="reset-box">
          <h3>Change Password</h3>
          <form onSubmit={handleSubmit} className='reset-form' style={{ marginTop: '10px' }}>
            <input
              type="password"
              placeholder="Old Password"
              className='reset-input-password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
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
            {response && response.status === "error" ? <p style={{ color: 'red' }}>{response.message}</p> : <p style={{ color: 'green' }} >{response.message}</p>} 
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;



