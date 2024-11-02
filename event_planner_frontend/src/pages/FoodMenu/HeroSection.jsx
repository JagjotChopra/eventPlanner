import React from "react";
import { Link } from "react-scroll";
import './FoodMenu.css';
import bg from '../../assets/event-food.jpg';

const HeroSection = () => {
  return (
    <section className="hero" style={{
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
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      }}>
        
      <img src={bg} alt="restaurant" style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: '0',
          left: '0',
          zIndex: '-1',
          filter: 'brightness(50%)' // Darkens the background image
        }} />
        
      <div className="item" style={{
          textAlign: 'center',
          zIndex: '2',
          maxWidth: '800px',
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent overlay behind the text
          borderRadius: '10px'
        }}>
        <h3 style={{
            fontSize: '36px',
            letterSpacing: '2px',
            fontWeight: '500',
            marginBottom: '2px',
            color: '#a2783a'
          }}>Refined Stack Co</h3>
          
        <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '2px',
            letterSpacing: '3px',
            color: '#fff'
          }}>Food & Drinks</h1>
          
        <p style={{
            fontSize: '20px',
            lineHeight: '1.5',
            color: '#f0f0f0',
            marginBottom: '30px'
          }}>
          State-of-the-art-catering.
        </p>
        
        <Link to="contact" spy={true} smooth={true} duration={500} style={{
            padding: '15px 30px',
            backgroundColor: '#a2783a',
            color: '#fff',
            fontSize: '18px',
            fontWeight: '500',
            textDecoration: 'none',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
            display: 'inline-block'
          }} onMouseEnter={(e) => e.target.style.backgroundColor = '#8f6930'}
             onMouseLeave={(e) => e.target.style.backgroundColor = '#a2783a'}>
          BOOK NOW
        </Link>
        
      </div>
      

    </section>
    
  );
};

export default HeroSection;