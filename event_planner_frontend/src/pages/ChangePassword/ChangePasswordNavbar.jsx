import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/R-removebg-preview.png';
import { FaArrowRightToBracket } from "react-icons/fa6";

const NavbarChangeDashboard = () => {
    const logout = () => {
        // Ask for confirmation
        const isConfirmed = window.confirm("Are you sure you want to logout?");
        
        // If the user confirms, proceed with logout
        if (isConfirmed) {
            // Remove token from local storage
            localStorage.removeItem('token'); // Replace 'token' with your actual token key
            
            // Optionally, redirect the user to a different page (e.g., login page)
            window.location.href = '/login'; // Update the path as needed
        }
    };

    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '15px 30px',
            backgroundColor: '#5B3413',
            color: '#ECF0F1',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
            borderRadius: '8px',
        }}>
            {/* Left Section: Logo and Title */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
            }}>
                <img src={logo} alt="logo" style={{
                    width: '75px',
                    height: '75px',
                    marginRight: '15px', // Adjust spacing
                }} />
                
                <Link
                    to="/homepage"
                    style={{
                        color: '#ECF0F1',
                        fontSize: '24px',
                        fontWeight: '600',
                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                        cursor: 'pointer',
                        margin: 0,
                        transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#DC5B25'}
                    onMouseLeave={(e) => e.target.style.color = '#ECF0F1'}
                >
                    Refined Stack Co
                </Link>
            </div>
        
            {/* Right Section: Links */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                marginRight:'70px'
            }}>
                <Link
                    to="/userdashboard"
                    style={{
                        padding: '10px 20px',
                        color: '#ECF0F1',
                        backgroundColor: '#3498DB',
                        textDecoration: 'none',
                        borderRadius: '6px',
                        fontWeight: '500',
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                        marginRight: '20px'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#2980B9';
                        e.target.style.color = '#F39C12';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#3498DB';
                        e.target.style.color = '#ECF0F1';
                    }}
                >
                    User Profile
                </Link>
                <button 
                    onClick={logout} 
                    style={{
                        color: 'black',
                        background: "white",
                        padding: "10px 15px",
                        fontSize: "16px",
                        fontWeight: "bolder",
                        cursor: 'pointer',
                        borderRadius: "20px",
                        border: 'none', // Remove default border
                        display: 'flex', // Align icon and text
                        alignItems: 'center', // Center the icon vertically
                        marginLeft: "10px" // Adjust spacing from the Change Password link
                    }}
                >
                    Logout <FaArrowRightToBracket style={{ marginLeft: '5px' }} />
                </button>
            </div>
        </nav>
    );
};

export default NavbarChangeDashboard;
