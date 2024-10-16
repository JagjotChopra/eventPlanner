import React, { useState } from 'react';
import axios from 'axios';
import './forgotpassword.css'; // Importing the external CSS

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: ''
    });
    const [response, setResponse] = useState({}); // State to hold the message

    const { email } = formData;

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send the email to the backend
            const res = await axios.post('http://localhost:9000/api/v1/user/forgotpassword', { email });
            setResponse(res.data);
        } catch (error) {
           // console.log(error.response);
          setResponse(error.response.data)
           // setMessage(error.response?.data?.message || 'Server error');
        }

    };

    return (
        
            <form onSubmit={handleSubmit} className="forgot-form">
                <input
                    type="email"
                    name="email" // Add the 'name' attribute so handleChange works correctly
                    placeholder="Enter your email"
                    className="form-input"
                    required
                    value={email}
                    onChange={handleChange} // Call handleChange to update formData
                />
                <button type="submit" className="submit-btn">Send Reset Link</button>
                {response &&  response.status=="error"?<p style={{color:'red'}}>{response.message}</p>:<p style={{color:'green'}} >{response.message}</p> } {/* Display the message */}
            </form>
    );
};

export default ForgotPassword;
