import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { MdCategory, MdLocationOn, MdEventAvailable, MdPassword } from "react-icons/md";
import logo from '../../assets/R-removebg-preview.png';
import Footer from '../Homepage/Footer';

const AdminDashboard = () => {
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const [venueDropdownOpen, setVenueDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleCategoryDropdown = () => {
        setCategoryDropdownOpen(!categoryDropdownOpen);
        setVenueDropdownOpen(false);
    };

    const toggleVenueDropdown = () => {
        setVenueDropdownOpen(!venueDropdownOpen);
        setCategoryDropdownOpen(false);
    };

    const logout = () => {
        const isConfirmed = window.confirm("Are you sure you want to logout?");
        if (isConfirmed) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const DashboardTiles = () => {
      const tiles = [
          {
              title: 'Event Categories',
              icon: <MdCategory size={40} />,
              links: [
                  { path: 'adminAddCategory', text: 'Add Category' },
                  { path: 'adminManageCategory', text: 'Manage Categories' }
              ],
              backgroundColor: '#5A451!', // Saddle Brown
              hoverColor: '#723A0F',
              gradient: 'linear-gradient(145deg, #8B4513, #A0522D)'
          },
          {
              title: 'Event Venues',
              icon: <MdLocationOn size={40} />,
              links: [
                  { path: 'adminAddVenue', text: 'Add Venue' },
                  { path: 'adminManageVenue', text: 'Manage Venues' }
              ],
              backgroundColor: '#D2691E', // Chocolate
              hoverColor: '#B85A1A',
              gradient: 'linear-gradient(145deg, #D2691E, #CD853F)'
          },
          {
              title: 'Bookings',
              icon: <MdEventAvailable size={40} />,
              links: [
                  { path: 'adminBooking', text: 'Manage Bookings' }
              ],
              backgroundColor: '#B8860B', // Dark Goldenrod
              hoverColor: '#9A7009',
              gradient: 'linear-gradient(145deg, #B8860B, #DAA520)'
          },
          {
              title: 'Settings',
              icon: <MdPassword size={40} />,
              links: [
                  { path: 'adminChangePassword', text: 'Change Password' }
              ],
              backgroundColor: '#A0522D', // Sienna
              hoverColor: '#884421',
              gradient: 'linear-gradient(145deg, #A0522D, #B8860B)'
          }
      ];
  
      const tileStyles = {
          tilesContainer: {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              maxWidth: '1400px',
              margin: '0 auto',
              padding: '30px'
          },
          tile: {
              padding: '25px',
              borderRadius: '15px',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
          },
          tileIcon: {
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: '50%',
              padding: '15px',
              marginBottom: '20px',
              transition: 'transform 0.3s ease'
          },
          tileTitle: {
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          },
          tileLinks: {
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%'
          },
          tileLink: {
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '12px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: 'white',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255,255,255,0.1)',
              fontWeight: '500',
              letterSpacing: '0.5px'
          }
      };

        return (
          <div style={tileStyles.tilesContainer}>
          {tiles.map((tile, index) => (
              <div 
                  key={index} 
                  style={{
                      ...tileStyles.tile,
                      background: tile.gradient
                  }}
                  onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                  }}
              >
                  <div style={tileStyles.tileIcon}>
                      {tile.icon}
                  </div>
                  <h3 style={tileStyles.tileTitle}>{tile.title}</h3>
                  <div style={tileStyles.tileLinks}>
                      {tile.links.map((link, linkIndex) => (
                          <Link 
                              key={linkIndex}
                              to={link.path}
                              style={tileStyles.tileLink}
                              onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                                  e.currentTarget.style.transform = 'scale(1.02)';
                              }}
                              onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                  e.currentTarget.style.transform = 'scale(1)';
                              }}
                          >
                              {link.text}
                          </Link>
                      ))}
                  </div>
              </div>
          ))}
      </div>
    );
  };

    return (
        <div style={styles.mainContainer}>
            {/* Existing Navbar */}
            <nav className="navbar">
                <div style={logoContainerStyle}>
                    <img src={logo} alt="logo" style={logoImageStyle} />
                    <h3 onClick={() => navigate('/homepage')} style={logoTextStyle}>Refined Stack Co</h3>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/adminDashboard" className="navbar-link">Dashboard</Link></li>

                    <li className="navbar-dropdown" onMouseEnter={toggleCategoryDropdown} onMouseLeave={() => setCategoryDropdownOpen(false)}>
                        <span className="navbar-link dropdown-toggle">
                            Event Category <IoMdArrowDropdownCircle />
                        </span>
                        {categoryDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li><Link to="adminAddCategory" className="navbar-link">Add Category</Link></li>
                                <li><Link to="adminManageCategory" className="navbar-link">Manage Event Category</Link></li>
                            </ul>
                        )}
                    </li>

                    <li className="navbar-dropdown" onMouseEnter={toggleVenueDropdown} onMouseLeave={() => setVenueDropdownOpen(false)}>
                        <span className="navbar-link dropdown-toggle">
                            Event Venue <IoMdArrowDropdownCircle />
                        </span>
                        {venueDropdownOpen && (
                            <ul className="dropdown-menu">
                                <li><Link to="adminAddVenue" className="navbar-link">Add Venue</Link></li>
                                <li><Link to="adminManageVenue" className="navbar-link">Manage Event Venue</Link></li>
                            </ul>
                        )}
                    </li>
                    <li><Link to="adminBooking" className="navbar-link">Event Booking</Link></li>
                    <li><Link to="adminChangePassword" className="navbar-link">Change Password</Link></li>
                    <li style={{color:'black',marginLeft:"20px",background:"white",padding:"10px 15px",fontSize:"16px",fontWeight:"bolder",cursor:'pointer',borderRadius:"20px"}} onClick={logout}>Logout <FaArrowRightToBracket /></li>
                </ul>
            </nav>

            {/* Content Area */}
            <div style={styles.contentArea}>
                {window.location.pathname === '/adminDashboard' ? (
                    <DashboardTiles />
                ) : (
                    <Outlet />
                )}
            </div>

            {/* Existing Footer */}
            <Footer />
        </div>
    );
};

const styles = {
    mainContainer: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    contentArea: {
        flex: 1,
        padding: '40px 20px',
        backgroundColor: '#f5f5f5'
    },
    tilesContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
    },
    tile: {
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
            transform: 'translateY(-5px)'
        }
    },
    tileIcon: {
        marginBottom: '15px'
    },
    tileTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '15px',
        textAlign: 'center'
    },
    tileLinks: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%'
    },
    tileLink: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: '8px 15px',
        borderRadius: '5px',
        textDecoration: 'none',
        color: 'white',
        textAlign: 'center',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.3)'
        }
    }
};

// Your existing styles
const logoContainerStyle = { display: 'flex', alignItems: 'center' };
const logoImageStyle = { width: '75px', height: '75px', marginRight: '10px' };
const logoTextStyle = { 
    fontSize: '24px', 
    fontWeight: 'bold', 
    color: '#fff', 
    letterSpacing: '2px',
    cursor: 'pointer' 
};

export default AdminDashboard;