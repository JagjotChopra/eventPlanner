// components/Header.js
import React, { useState } from 'react';
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
// import { IoMdArrowDropdownCircle } from "react-icons/io";
// import { FaArrowRightToBracket } from "react-icons/fa6";
import logo from '../../assets/R-removebg-preview.png'; // Adjust path as needed

const HeaderHome = () => {
    // const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    // Function to toggle dropdown visibility
    // const toggleDropdown = () => {
    //     setDropdownOpen(!dropdownOpen);
    // };

    // Function to handle logout
    const logout = () => {
        // const isConfirmed = window.confirm("Are you sure you want to logout?");
        // if (isConfirmed) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        // }
    };

    return (
        <nav style={navStyle}>
            {/* Logo Section */}
            <div style={logoContainerStyle}>
                <img src={logo} alt="logo" style={logoImageStyle} />
                <span onClick={() => window.location.href = '/homepage'} style={logoTextStyle}>Refined Stack Co</span>
            </div>

            {/* Navigation Links */}
            <div className={showMenu ? "navLinks showMenu" : "navLinks"} style={linksContainerStyle}>
                <div className="links" style={linksStyle}  >
                    <Link to="herohome" spy={true} smooth={true} duration={500} style={linkStyle} onMouseEnter={(e) => e.target.style.Color = '#8f6930'}
             onMouseLeave={(e) => e.target.style.Color = '#a2783a'}>Home</Link>
                    <Link to="events" spy={true} smooth={true} duration={500} style={linkStyle} onMouseEnter={(e) => e.target.style.Color = '#8f6930'}
             onMouseLeave={(e) => e.target.style.Color = '#a2783a'}>Events</Link>
                    <Link to="venue" spy={true} smooth={true} duration={500} style={linkStyle} onMouseEnter={(e) => e.target.style.Color = '#8f6930'}
             onMouseLeave={(e) => e.target.style.Color = '#a2783a'}>Venues</Link>
                    <Link to="food" spy={true} smooth={true} duration={500} style={linkStyle} onMouseEnter={(e) => e.target.style.Color = '#8f6930'}
             onMouseLeave={(e) => e.target.style.Color = '#a2783a'}>Food</Link>
                    <Link onClick={logout} style={linkStyle} onMouseEnter={(e) => e.target.style.Color = '#8f6930'}
             onMouseLeave={(e) => e.target.style.Color = '#a2783a'}>Login/Signup</Link>
                    {/* User Dropdown Section */}
                    {/* <div style={dropdownContainerStyle} onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                        <span style={dropdownToggleStyle}>
                            User <IoMdArrowDropdownCircle />
                        </span>
                        {dropdownOpen && (
                            <ul style={dropdownMenuStyle}>
                                <li><Link to="/userdashboard" style={dropdownLinkStyle}>User Profile</Link></li>
                                <li style={logoutButtonStyle} onClick={logout}>
                                    Login/Signup <FaArrowRightToBracket />
                                </li>
                            </ul>
                        )}
                    </div> */}
                </div>
            </div>

            {/* Hamburger Icon for Mobile */}
            <div className="hamburger" onClick={() => setShowMenu(!showMenu)} style={hamburgerStyle}>
                <GiHamburgerMenu />
            </div>
        </nav>
    );
};

// Styles
const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    background: '#5B3413',
    position: 'fixed',
    width: '100%',
    top: '0',
    zIndex: '1000',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: "Cinzel Decorative",
};
const logoContainerStyle = { display: 'flex', alignItems: 'center' };
const logoImageStyle = { width: '75px', height: '75px', marginRight: '10px' };
const logoTextStyle = { 
    fontSize: '24px', 
    fontWeight: 'bold', 
    color: '#fff', 
    letterSpacing: '2px' ,
    cursor: 'pointer' 
};
const linksContainerStyle = { display: 'flex', alignItems: 'center', gap: '30px' };
const linksStyle = { display: 'flex', gap: '20px', marginRight: '80px',  } ;
const linkStyle = {
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    color: '#fff',
    letterSpacing: '1px',
    transition: 'color 0.3s ease', 
    cursor: 'pointer'
};
// const dropdownContainerStyle = { position: 'relative' };
// const dropdownToggleStyle = { color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' };
// const dropdownMenuStyle = {
//     position: 'absolute',
//     top: '30px',
//     right: 0,
//     backgroundColor: '#fff',
//     borderRadius: '5px',
//     boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
//     listStyleType: 'none',
//     padding: '10px',
//     minWidth: '150px',
// };
// const dropdownLinkStyle = { color: 'black', textDecoration: 'none', fontSize: '16px', padding: '10px 0', display: 'block' };
// const logoutButtonStyle = {
//     color: 'black',
//     margin: '10px 0',
//     background: '#f1f1f1',
//     padding: '10px 15px',
//     fontSize: '16px',
//     fontWeight: 'bold',
//     cursor: 'pointer',
//     borderRadius: '5px',
//     textAlign: 'center',
// };
const hamburgerStyle = { display: 'none', cursor: 'pointer', fontSize: '24px', color: '#a2783a' };

export default HeaderHome;
