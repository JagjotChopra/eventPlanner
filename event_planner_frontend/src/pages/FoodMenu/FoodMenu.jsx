import React, { useState } from "react";
import { Link } from "react-scroll";
import { GiHamburgerMenu } from "react-icons/gi";
import './FoodMenu.css';
import logo from '../../assets/R-removebg-preview.png';
const Navbar = () => {
  const [show, setShow] = useState(false);
  // Function to handle logout
  const logout = () => {
    // const isConfirmed = window.confirm("Are you sure you want to logout?");
    // if (isConfirmed) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    // }
};
  return (
    <nav style={{
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
  }}>
  
  <div style={{
      display: 'flex',
      alignItems: 'center',
      
    }}>
      <a href="/homepage">
      <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#5B3413',
            textDecoration: 'none'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src={logo}
          alt="logo"
          style={{
            width: '75px',
            height: '75px',
            marginRight: '10px',
          }}
        />
        <div
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fff',
            letterSpacing: '2px'
          }}
        >
          Refined Stack Co
        </div>
      </div>
    </div> </a>
  </div>
  
  <div className={show ? "navLinks showmenu" : "navLinks"} style={{
      display: 'flex',
      alignItems: 'center',
      gap: '30px'
    }}>
    <div className="links" style={{
        display: 'flex',
        gap: '20px',
        marginRight: '80px'
      }}>
      <Link to="hero" spy={true} smooth={true} duration={500} style={{
          textDecoration: 'none',
          fontSize: '18px',
          fontWeight: '500',
          color: '#fff',
          letterSpacing: '1px',
          transition: 'color 0.3s ease'
        }} onMouseEnter={(e) => e.target.style.color = '#a2783a'}
           onMouseLeave={(e) => e.target.style.color = '#fff'}>
        HOME
      </Link>
      <Link to="services" spy={true} smooth={true} duration={500} style={{
          textDecoration: 'none',
          fontSize: '18px',
          fontWeight: '500',
          color: '#fff',
          letterSpacing: '1px',
          transition: 'color 0.3s ease'
        }} onMouseEnter={(e) => e.target.style.color = '#a2783a'}
           onMouseLeave={(e) => e.target.style.color = '#fff'}>
        SERVICES
      </Link>
      <Link to="about" spy={true} smooth={true} duration={500} style={{
          textDecoration: 'none',
          fontSize: '18px',
          fontWeight: '500',
          color: '#fff',
          letterSpacing: '1px',
          transition: 'color 0.3s ease'
        }} onMouseEnter={(e) => e.target.style.color = '#a2783a'}
           onMouseLeave={(e) => e.target.style.color = '#fff'}>
        ABOUT
      </Link>
      <Link onClick={logout} style={{
          textDecoration: 'none',
          fontSize: '18px',
          fontWeight: '500',
          color: '#fff',
          letterSpacing: '1px',
          transition: 'color 0.3s ease'
        }} onMouseEnter={(e) => e.target.style.Color = '#8f6930'}
             onMouseLeave={(e) => e.target.style.Color = '#a2783a'}>Login/Signup</Link>
    </div>
  </div>
  
  <div className="hamburger" onClick={() => setShow(!show)} style={{
      display: 'none',
      cursor: 'pointer',
      fontSize: '24px',
      color: '#a2783a'
    }}>
    <GiHamburgerMenu />
  </div>
</nav>

  );
};

export default Navbar;