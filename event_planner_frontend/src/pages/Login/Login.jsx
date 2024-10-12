import React, { useState } from 'react';
import axios from 'axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import bg from '../../assets/pexels-expect-best-79873-1243337.jpg';
import logo from '../../assets/R-removebg-preview.png';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '', password: ''
    });
    const { email, password } = formData;
    const navigate = useNavigate();

   
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

       
            try {
                const res = await axios.post('http://localhost:9000/api/v1/user/login', formData);
                if (res.status === 201) { // Assuming 201 is the status code for successful login
                    localStorage.setItem('token', res.data.token);//Here storage the token
                    alert(res.data.msg);
                    navigate('/home');
                }
            } catch (err) {
                alert('Error during login');
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
                    <p style={{textAlign:'right'}}>Forgot Password ?</p>
                   <button type="submit" className="submit-btn">Login</button><br />
                    <p className="signup-text">Don't have an account? <a href="/Register">Sign Up</a></p>
                </form>
            </div>
            <div className="box1">
                <img src={bg} className="bg-image" alt="background" />
                <div className="overlay"></div>
                <h2><span>W</span>elcome To</h2>
                <img src={logo} className="logo-image" alt="logo" />
                <p className="sub-heading">Your One-Stop Solution for Hassle-Free Event Planning and Venue Booking</p>
            </div>
        </div>
    );
};

export default Login;