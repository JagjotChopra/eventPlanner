import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get token from URL
import './Resetpassword.css';
import logo from '../../assets/R-removebg-preview.png';

const ResetPassword = () => {
    const { token } = useParams(); // Token from URL
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [response, setResponse] = useState({}); // State to hold the message


    const handleSubmit = async (e) => {
        e.preventDefault();
       
    };

    return (
            <div className="reset-container">
            <div className="reset-box">
            <img src={logo} className="logo-img" alt="logo" />
            <h3>Reset Password</h3>
            <form onSubmit={handleSubmit} className='reset-form' style={{marginTop:'10px'}}>
                <input
                    type="password"
                    placeholder="New Password"
                    className='reset-input-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    className='reset-input-password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{marginTop:'20px'}}
                />
                <button type="submit" className='submit-btn' style={{marginTop:'20px'}}>Reset Password</button>
                {response &&  response.status=="error"?<p style={{color:'red'}}>{response.message}</p>:<p style={{color:'green'}} >{response.message}</p> } {/* Display the message */}
            </form>
            </div>
        </div>

    );
};

export default ResetPassword;