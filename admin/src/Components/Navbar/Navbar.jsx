import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/Admin_Assets/logo.png'
import navProfile from '../../assets/Admin_Assets/nav-profile.svg'

const Navbar = ({ onLogout }) => {
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout();
    }
  };

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={navlogo} alt="Logo" className="nav-logo" />
        <h2 className="admin-title">Admin Panel</h2>
      </div>
      <div className="navbar-right">
        <div className="admin-info">
          <span className="welcome-text">Welcome, Admin</span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <img src={navProfile} className="nav-profile" alt="Profile" />
      </div>
    </div>
  )
}

export default Navbar