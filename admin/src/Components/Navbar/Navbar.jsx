import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/Admin_Assets/nav-logo.svg' // Assuming you have a logo image
import navProfile from '../../assets/Admin_Assets/nav-profile.svg' // Assuming you have a profile image

const Navbar = () => {
  return (
    <div className='navbar'>
     <img src={navlogo} alt="" className="nav-log" />
     <img src={navProfile} className="nav-profile"  alt="" />
    </div>
  )
}

export default Navbar