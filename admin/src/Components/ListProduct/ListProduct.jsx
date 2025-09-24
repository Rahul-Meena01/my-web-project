
import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/Admin_Assets/cross_icon.png'; 

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const fetchInfo = async () => {
    try {
      setLoading(true);
      console.log("Fetching products...");
      const response = await fetch('http://localhost:4000/allproducts');
      
      if (!response.ok) {
        console.error("Backend Error:", response.status, response.statusText);
        return;
      }
      
      const data = await response.json();
      console.log("Data received from backend:", data);
      setAllProducts(data);

    } catch (error) {
      console.error("Failed to fetch products (Network Error):", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_Product = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch('http://localhost:4000/removeproduct', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: id }),
        });
        await fetchInfo(); // Refresh the product list
      } catch (error) {
        console.error("Error removing product:", error);
        alert("Failed to remove product. Please try again.");
      }
    }
  };

  // Filter products based on search term and category
  const filteredProducts = allproducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="list-product">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='list-product'>
      <div className="list-product-header">
        <h1>Product Management</h1>
        <p>Manage your product inventory</p>
      </div>

      <div className="list-product-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-container">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kids</option>
          </select>
        </div>
      </div>

      <div className="products-stats">
        <div className="stat-card">
          <span className="stat-number">{filteredProducts.length}</span>
          <span className="stat-label">Products Found</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{allproducts.length}</span>
          <span className="stat-label">Total Products</span>
        </div>
      </div>

      <div className='listproduct-container'>
        <div className='listproduct-format-main listproduct-header-row'>
          <span>Image</span>
          <span>Title</span>
          <span>Original Price</span>
          <span>Sale Price</span>
          <span>Category</span>
          <span>Actions</span>
        </div>
        
        <div className='listproduct-allproducts'>
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className='listproduct-format-main listproduct-format'>
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className='listproduct-product-icon' />
                </div>
                <span className="product-name">{product.name}</span>
                <span className="product-price">₹{product.old_price}</span>
                <span className="product-sale-price">₹{product.new_price}</span>
                <span className="product-category">{product.category}</span>
                <div className="product-actions">
                  <button 
                    onClick={() => remove_Product(product.id)} 
                    className='remove-btn'
                    title="Delete Product"
                  >
                    <img src={cross_icon} alt="Remove" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ListProduct;