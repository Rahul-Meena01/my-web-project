import './AddProduct.css';
import React, { useState } from 'react';
import upload_area_icon from '../../assets/Admin_Assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    old_price: '',
    new_price: '',
    category: 'women',
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    if (!productDetails.name || !productDetails.old_price || !productDetails.new_price || !image) {
      alert('Please fill all fields and select an image');
      return;
    }

    setLoading(true);
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    try {
      await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
        });

      if (responseData.success) {
        product.image = responseData.image_url;
        console.log(product);
        await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        })
          .then((resp) => resp.json())
          .then((data) => {
            if (data.success) {
              alert('Product Added Successfully!');
              // Reset form
              setProductDetails({
                name: '',
                image: '',
                old_price: '',
                new_price: '',
                category: 'women',
              });
              setImage(null);
            } else {
              alert('Failed to Add Product');
            }
          });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='add-product'>
      <div className="add-product-header">
        <h2>Add New Product</h2>
        <p>Fill in the details below to add a new product to your inventory</p>
      </div>
      
      <div className="add-product-form">
        <div className='addproduct-itemfield'>
          <label>Product Title</label>
          <input 
            value={productDetails.name} 
            onChange={changeHandler} 
            type='text' 
            name='name' 
            placeholder='Enter product name' 
            className="form-input"
          />
        </div>
        
        <div className='addproduct-price'>
          <div className='addproduct-itemfield'>
            <label>Original Price</label>
            <input 
              value={productDetails.old_price} 
              onChange={changeHandler} 
              type='number' 
              name='old_price' 
              placeholder='₹0.00' 
              className="form-input"
            />
          </div>
          <div className='addproduct-itemfield'>
            <label>Sale Price</label>
            <input 
              value={productDetails.new_price} 
              onChange={changeHandler} 
              type='number' 
              name='new_price' 
              placeholder='₹0.00' 
              className="form-input"
            />
          </div>
        </div>
        
        <div className='addproduct-itemfield'>
          <label>Product Category</label>
          <select 
            value={productDetails.category} 
            onChange={changeHandler} 
            name='category' 
            className='add-product-selector'
          >
            <option value='women'>Women</option>
            <option value='men'>Men</option>
            <option value='kid'>Kids</option>
          </select>
        </div>
        
        <div className='addproduct-itemfield'>
          <label>Product Image</label>
          <div className="image-upload-container">
            <label htmlFor='file-input' className="image-upload-label">
              <img 
                src={image ? URL.createObjectURL(image) : upload_area_icon} 
                className='addproduct-thumbnail-img' 
                alt='Upload' 
              />
              <div className="upload-text">
                {image ? 'Click to change image' : 'Click to upload image'}
              </div>
            </label>
            <input 
              onChange={imageHandler} 
              type='file' 
              name='image' 
              id='file-input' 
              accept="image/*"
              hidden 
            />
          </div>
        </div>
        
        <button 
          onClick={Add_Product} 
          className={`addproduct-btn ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;