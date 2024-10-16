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
        if (password !== confirmPassword) {
            setResponse({message:'Passwords do not match',status:'error'});
            return;
        }
        else if (!password || password.length < 6) {
             setResponse({message:'Password must be at least 6 characters long',status:'error'});
        }
        else{
            try {
                // No need to assign the result to a variable if it's not used
                const res = await axios.post(`http://localhost:9000/api/v1/user/reset-password?token=${token}`, { password });
                setResponse(res.data);
            } catch (error) {
                setResponse(error.response.data);
            }
        }
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
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    className='reset-input-password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{marginTop:'20px'}}
                    required
                />
                <button type="submit" className='submit-btn' style={{marginTop:'20px'}}>Reset Password</button>
                {response &&  response.status=="error"?<p style={{color:'red'}}>{response.message}</p>:<p style={{color:'green'}} >{response.message}</p> } {/* Display the message */}
            </form>
            </div>
        </div>

    );
};

export default ResetPassword;