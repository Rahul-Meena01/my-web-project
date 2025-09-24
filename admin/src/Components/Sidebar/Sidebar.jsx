import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import add_product_icon from '../../assets/Admin_Assets/Product_Cart.svg'
import list_product_icon from '../../assets/Admin_Assets/Product_list_icon.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-header">
        <h3>Dashboard</h3>
      </div>
      <div className="sidebar-menu">
        <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
          </div>
        </Link>
        <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
          <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
          </div>
        </Link>
      </div>
      <div className="sidebar-footer">
        <div className="stats-card">
          <h4>Quick Stats</h4>
          <div className="stat-item">
            <span>Total Products</span>
            <span className="stat-value">-</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar