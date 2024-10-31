import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './AdminDashboard.css'; // Import CSS for styling
import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const AdminDashboard = () => {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [venueDropdownOpen, setVenueDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Functions to toggle each dropdown separately
  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen(!categoryDropdownOpen);
    setVenueDropdownOpen(false); // Close the other dropdown
  };

  const toggleVenueDropdown = () => {
    setVenueDropdownOpen(!venueDropdownOpen);
    setCategoryDropdownOpen(false); // Close the other dropdown
  };

  const logout = () => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    
    // If the user confirms, proceed with logout
    if (isConfirmed) {
      // Remove token from local storage
      localStorage.removeItem('token'); 
      navigate('/login');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <p className='nav-heading'>Refined Stack</p>
        <ul className="navbar-links">
          <li><Link to="/adminDashboard" className="navbar-link">Dashboard</Link></li>

          {/* Event Category Dropdown Menu */}
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

          {/* Event Venue Dropdown Menu */}
          <li className="navbar-dropdown" onMouseEnter={toggleVenueDropdown} onMouseLeave={() => setVenueDropdownOpen(false)}>
            <span className="navbar-link dropdown-toggle">
              Event Venue <IoMdArrowDropdownCircle />
            </span>
            {venueDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="adminAddVenue" className="navbar-link">Add Venue</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="adminChangePassword" className="navbar-link">Change Password</Link></li>
          <li style={{color:'black',marginLeft:"20px",background:"white",padding:"10px 15px",fontSize:"16px",fontWeight:"bolder",cursor:'pointer',borderRadius:"20px"}} onClick={logout}>Logout <FaArrowRightToBracket /></li>
        </ul>
      </nav>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
