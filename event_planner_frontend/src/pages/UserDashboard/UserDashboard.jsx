import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';


const UserDashboard = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        role: '',
        address: ''
    });
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();
    // const [error, setError] = useState({ status: false, message: '' });
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:9000/api/v1/user/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                
                if (response.status === 200) {
                    setUser(response.data.data);
                }
            } catch (error) {
                console.error('Error Fetching Event category Data:', error);
                // Handle different response statuses
                if (error.response) {
                    // const { status } = error.response;
                    // let message;

                    // // Set messages based on response status
                    // switch (status) {
                    // case 401:
                    //     message = "Invalid token or no token provided.";
                    //     break;
                    // case 403:
                    //     message = "Access denied. You do not have permission to perform this action.";
                    //     break;
                    // default:
                    //     message = "An error occurred.";
                    //     break;
                    // }

                    alert("Need To Login Again"); // Show the message to the user
                    localStorage.removeItem('token');
                    navigate('/login');
                
                } else {
                    //setError({ status: true, message: "Server is Down. Please Try Later" });
                    alert("Server is Down. Please Try Later");
                }
            }
            // setError({status:true,message:"Error Occured"})
        };

        fetchUser();
    }, [navigate]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:9000/api/v1/user/profile', user, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            setEditMode(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile. Please try again.");
        }
    };

    return (
        <div style={{
            maxWidth: '500px',
            margin: '20vh auto',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: '#FFFFFF',
            fontFamily: 'Arial, sans-serif',
            color: '#333',
            
        }}>
            <h3 style={{
                textAlign: 'center',
                color: '#5B3413',
                fontSize: '1.8em',
                marginBottom: '20px'
            }}>User Profile</h3>
        
            {!editMode ? (
                <div style={{
                    marginBottom: '20px'
                }}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <p><strong>Address:</strong> {user.address}</p>
        
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '10px',
                        marginTop: '20px'
                    }}>
                        <button 
                            onClick={() => setEditMode(true)} 
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#7a4e06',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                transition: 'background-color 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#AE5B22'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#7a4e06'}
                        >
                            Edit Profile
                        </button>
                        
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: '600', display: 'block', marginBottom: '5px' }}>Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={user.name} 
                            onChange={handleChange} 
                            style={{
                                width: '96%',
                                padding: '10px',
                                border: '1px solid #4d3104',
                                borderRadius: '4px',
                                fontSize: '1em',
                                marginRight: '20px'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' , }}>
                        <label style={{ fontWeight: '600', display: 'block', marginBottom: '5px' }}>Email:</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={user.email} 
                            onChange={handleChange} 
                            style={{
                                width: '96%',
                                padding: '10px',
                                
                                borderRadius: '4px',
                                fontSize: '1em',
                                border: '1px solid #4d3104'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ fontWeight: '600', display: 'block', marginBottom: '5px' }}>Phone:</label>
                        <input 
                            type="text" 
                            name="phone" 
                            value={user.phone} 
                            onChange={handleChange} 
                            style={{
                                width: '96%',
                                padding: '10px',
                                border: '1px solid #4d3104',
                                borderRadius: '4px',
                                fontSize: '1em'
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: '600', display: 'block', marginBottom: '5px' }}>Address:</label>
                        <input 
                            type="text" 
                            name="address" 
                            value={user.address} 
                            onChange={handleChange} 
                            style={{
                                width: '96%',
                                padding: '10px',
                                border: '1px solid #4d3104',
                                borderRadius: '4px',
                                fontSize: '1em'
                            }}
                        />
                    </div>
        
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <button 
                            type="submit" 
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#28A745',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                width: '48%',
                                transition: 'background-color 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#28A745'}
                        >
                            Save Changes
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setEditMode(false)} 
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#DC3545',
                                color: '#FFFFFF',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                width: '48%',
                                transition: 'background-color 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#C82333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#DC3545'}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>

    );
};

export default UserDashboard;
