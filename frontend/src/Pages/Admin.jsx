import React from 'react';
import './CSS/Admin.css'; // We will create this CSS file next
import AddProduct from '../Component/AddProduct/AddProduct';
import ListProduct from '../Component/ListProduct/ListProduct';

const Admin = () => {
  return (
    <div className='admin'>
        <AddProduct/>
        <ListProduct/>
    </div>
  )
}

export default Admin;