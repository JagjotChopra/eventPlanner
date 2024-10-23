import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminDashboard.css'; // Import CSS for styling
import { FaArrowRightToBracket } from "react-icons/fa6";
import { IoMdArrowDropdownCircle } from "react-icons/io";
const AdminDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const logout = () => {
  
};
  return (
    <div >
      <nav className="navbar">
          <p className='nav-heading'>Refined Stack</p>
        <ul className="navbar-links">
          <li><Link to="/adminDashboard" className="navbar-link">Dashboard</Link></li>
          
         {/* Dropdown Menu */}
         <li className="navbar-dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
            <span className="navbar-link dropdown-toggle">
              Event Category <IoMdArrowDropdownCircle  />
            </span>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="adminAddCategory" className="navbar-link">Add Category</Link></li>
                <li><Link to="adminManageCategory" className="navbar-link">Manage Event Category</Link></li>
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
