import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../../assets/pexels-expect-best-79873-1243337.jpg';
import logo from '../../assets/R-removebg-preview.png';

import ForgotPassword from '../ForgotPassword/forgotpassword';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '', password: ''
    });
    const { email, password } = formData;
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

   
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

       
        try {
            const res = await axios.post('http://localhost:9000/api/v1/user/login', formData);
    
    
            if (res && res.status === 200) {
                localStorage.setItem('token', res.data.token);
               // alert(res.data.msg);
               if(res.data.role=="client"){
                navigate('/changepassword');
            }
            if(res.data.role=="admin"){
                navigate('/adminDashboard');
            }
            } else {
                alert('Unexpected response from server.');
                console.log('Server response:', res);
            }
        } catch (err) {
            if (err.response) {
                alert(`Error: ${err.response.data.msg || 'Unknown error occurred'}`);
            } else if (err.request) {
                alert('No response from the server. Please check if the backend is running.');
            } else {
                alert('An error occurred while trying to log in. Please try again later.');
            }
            
            console.error('Error during login:', err);
        }

        
    };

    return (
        <div className="container">
            <div className="box2">
                <form onSubmit={handleSubmit} className="register-form">
                    <h3>Log In</h3>
                    <hr className="divider" />
                    
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        placeholder="Email"
                        className='form-input' 
                        required
                    />
                    
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                        placeholder="Password"
                        className='form-input'
                        required
                    />
                    <p style={{textAlign:'right',color: '#007bff',fontWeight: 'bold',cursor:'pointer'}} className="signup-text" onClick={() => setShowModal(true)} >Forgot Password?</p>
                   <button type="submit" className="submit-btn">Login</button><br />
                    <p className="signup-text">Don't have an account? <Link to='/register'>Sign Up</Link></p>
                </form>
            </div>
            <div className="box1">
                <img src={bg} className="bg-image" alt="background" />
                <div className="overlay"></div>
                <h2><span>W</span>elcome To</h2>
                <img src={logo} className="logo-image" alt="logo" />
                <p className="sub-heading">Your One-Stop Solution for Hassle-Free Event Planning and Venue Booking</p>
            </div>

            {/* Modal for Forgot Password */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h3>Forgot Password</h3>
                        <p>Enter your email address to reset your password</p>
                        <ForgotPassword/>
                    
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;