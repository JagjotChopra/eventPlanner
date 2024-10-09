import React, { useState } from 'react';
import './register.css'; 
import bg from '../../assets/pexels-expect-best-79873-1243337.jpg';
import logo from '../../assets/R-removebg-preview.png';
import check from '../../assets/check.png';
import cross from '../../assets/remove.png';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', phone: '', address: ''
    });
    const { name, email, password, phone, address } = formData;
    const [errors, setErrors] = useState({}); // Track validation errors
    const [showModal, setShowModal] = useState(true);
    const [modelMessage, setModelMessage] = useState({status:"success"});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear errors as user types
    
     };

      // Validation function
    const validateFields = () => {
        const newErrors = {};

        // Password validation (min 6 characters)
        if (!password || password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        // Phone validation (must be digits, 10 characters)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            newErrors.phone = 'Phone number must be 10 digits long.';
        }


        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fieldErrors = validateFields();

        if (Object.keys(fieldErrors).length > 0) {
            // If there are validation errors, set them
            setErrors(fieldErrors);
            return;
        }

    };
    const handleClose = () => {
        setShowModal(false);
    };
    return (<>
            <div className="container">
                <div className="box1">
                    <img src={bg} className="bg-image" alt="background" />
                    <div className="overlay"></div>
                    <h2><span>W</span>elcome To</h2>
                    <img src={logo} className="logo-image" alt="logo" />
                    <p className="sub-heading">Your One-Stop Solution for Hassle-Free Event Planning and Venue Booking.</p>
                </div>
                <div className="box2">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <h3>Create An Account</h3>
                        <hr className="divider" />

                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            placeholder="Name"
                            className='form-input'
                            required
                        />

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
                        {errors.password && <p className="error-text">{errors.password}</p>}

                        <input
                            type="text"
                            name="phone"
                            value={phone}
                            onChange={handleChange}
                            placeholder="Phone"
                            className='form-input'
                            required
                        />
                         {errors.phone && <p className="error-text">{errors.phone}</p>}

                        <input
                            type="text"
                            name="address"
                            value={address}
                            onChange={handleChange}
                            placeholder="Address"
                            className='form-input'
                            required
                        />
                        <button type="submit" className="submit-btn">Register</button><br />
                        <p className="signup-text">Already have an account? <a href="/login" style={{fontWeight:'bold'}}>Login</a></p>
                    </form>
                </div>
            </div>
            {showModal && (
                <div className="modal-overlay">
                    {
                        modelMessage.status == "success" ? <div className="modal-content">
                            <img src={check} style={{width:'80px',height:'80px',marginTop:'30px'}} />
                            <h1 style={{textAlign:'center'}}>Success</h1>
                            <p>{modelMessage.msg}</p>
                            <button className='btn-login' onClick={handleClose} >Ok</button>
                        </div> :
                            <div className="modal-content">
                                <button className="close-btn" onClick={handleClose} >X</button>
                                <img src={cross} style={{width:'80px',height:'80px',marginTop:'30px'}} />
                                <h1 style={{textAlign:'center'}}>Error</h1>
                                <p>{modelMessage.msg}</p>
                            </div>
                    }


                </div>
            )}
            </>
    );
};

export default Register;
