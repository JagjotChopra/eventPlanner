// components/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import bg from '../../assets/event-home.jpg';

const HeroSectionHome = () => {
    return (
        <section className="herohome" style={heroSectionStyle}>
            <img src={bg} alt="event background" style={backgroundImageStyle} />
            
            <div className="item" style={overlayContainerStyle}>
                <h3 style={subheadingStyle}>Refined Stack Co</h3>
                <h1 style={mainHeadingStyle}>Plan Your Perfect Event with Us</h1>
                <p style={paragraphStyle}>From weddings to corporate gatherings, we’ve got you covered.</p>
                
                <Link
                    to="/booking"
                    style={buttonStyle}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#8f6930'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#a2783a'}
                >
                    BOOK NOW
                </Link>
            </div>
        </section>
    );
};

// Styles
const heroSectionStyle = {
    margin: '0',
    padding: '0',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    position: 'relative',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const backgroundImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: '-1',
    filter: 'brightness(50%)', // Darkens the background image
};

const overlayContainerStyle = {
    textAlign: 'center',
    zIndex: '2',
    maxWidth: '800px',
    padding: '20px',
    background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    borderRadius: '10px',
};

const subheadingStyle = {
    fontSize: '36px',
    letterSpacing: '2px',
    fontWeight: '500',
    marginBottom: '2px',
    color: '#a2783a',
};

const mainHeadingStyle = {
    fontSize: '48px',
    fontWeight: '700',
    marginBottom: '2px',
    letterSpacing: '3px',
    color: '#fff',
};

const paragraphStyle = {
    fontSize: '20px',
    lineHeight: '1.5',
    color: '#f0f0f0',
    marginBottom: '30px',
};

const buttonStyle = {
    padding: '10px 30px',
    backgroundColor: '#a2783a',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '500',
    textDecoration: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    display: 'inline-block',
};

export default HeroSectionHome;
