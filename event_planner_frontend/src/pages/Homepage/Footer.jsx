import React from "react";

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={columnStyle}>
          <h3 style={headingStyle}>Refined Stack Co</h3>
          <p style={textStyle}>
            Built with one thing in mind: <br />
            The complete satisfaction of our customers.
          </p>
        </div>
        <div style={columnStyle}>
          <h3 style={headingStyle}>Visit Us</h3>
          <p style={textStyle}>
            Refined Stack Co <br />
            2638 Steeles Avenue East <br />
            Brampton, Ontario L6S 6J9
          </p>
        </div>
        <div style={columnStyle}>
          <h3 style={headingStyle}>Contact</h3>
          <p style={textStyle}>
            E: info@refinedstackco.com <br />
            P: 226-977-4873
          </p>
        </div>
        <div style={columnStyle}>
          <h3 style={headingStyle}>Connect</h3>
          <p style={textStyle}>Connect with us on Social Media.</p>
          <div style={socialIconsStyle}>
            <span style={iconStyle}>📘</span> {/* Replace with actual icon */}
            <span style={iconStyle}>📷</span> {/* Replace with actual icon */}
          </div>
        </div>
      </div>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: '#5B3413', // Brown color to match
  color: '#fff',
  padding: '30px 20px',
  fontFamily: "'Poppins', sans-serif",
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: '1200px',
  margin: '0 auto',
  flexWrap: 'wrap',
};

const columnStyle = {
  flex: '1',
  padding: '10px',
  minWidth: '200px',
};

const headingStyle = {
  fontSize: '18px',
  fontWeight: '600',
  marginBottom: '10px',
  color: '#a2783a'
};

const textStyle = {
  fontSize: '16px',
  lineHeight: '1.6',
};

const socialIconsStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
};

const iconStyle = {
  fontSize: '24px',
  cursor: 'pointer',
};

export default Footer;
