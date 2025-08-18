
import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/Admin_Assets/cross_icon.png'; 

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      console.log("Fetching products..."); // Step 1: Check if function is called
      const response = await fetch('http://localhost:4000/allproducts');
      
      // Check if the response from server is okay (e.g., not 404 or 500)
      if (!response.ok) {
        console.error("Backend Error:", response.status, response.statusText);
        return; // Stop further execution if there's a server error
      }
      
      const data = await response.json();
      console.log("Data received from backend:", data); // Step 2: Check what data we actually got
      setAllProducts(data);

    } catch (error) {
      console.error("Failed to fetch products (Network Error):", error); // Step 3: Check for network errors
    }
  };
          useEffect(() => {
            fetchInfo();
            }, []);
   
  
  

    const remove_Product = async (id) => {

        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }), // productId should be defined
            })
                await fetchInfo(); // Refresh the product list
                
            
    }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className='listproduct-format-main'>
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className='listproduct-allproducts'>

       
        <hr />
        {allproducts.map((product) => (
           <React.Fragment key={product.id}>
            <div  className='listproduct-format-main listproduct-format'>
              <img src={product.image} alt="" className='listproduct-product-icon' />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>remove_Product(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="Remove" />
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;