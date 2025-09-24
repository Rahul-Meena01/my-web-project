import React, { useContext, useState } from 'react'
import './ProductDisplay.css'
import star_icon from '../Asset/star_icon.png'
import star_dull_icon from '../Asset/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'


const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext);
    const [selectedSize, setSelectedSize] = useState('');
  return (
    <div className = 'productdisplay'>
        <div className="productdisplay-left">
            <div className="productdisplay-img-list">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            <div className="productdisplay-img">
                <img  className='productdisplay-main-img' src={product.image} alt="" />
            </div>

        </div>
        <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-rigth-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productdisplay-rigth-price">
                <div className="productdisplay-rigth-price-old">₹{product.old_price}</div>
                <div className="productdisplay-rigth-price-new">₹{product.new_price}</div>
            </div>
            <div className="productdisplay-rigth-description">
            Discover premium quality clothing crafted for comfort and style. Whether you're dressing up or going casual, our collection fits every occasion with perfect fabric, fit, and finish.
            </div>
            <div className="productdisplay-rigth-size">
                <h1>Select Size</h1>
                <div className="productdisplay-rigth-sizes">
                    {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <div 
                            key={size}
                            className={selectedSize === size ? 'selected' : ''}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </div>
                    ))}
                </div>
            </div>
            <button 
                onClick={() => {
                    if (!selectedSize) {
                        alert('कृपया पहले साइज़ सेलेक्ट करें!');
                        return;
                    }
                    addToCart(product.id, selectedSize);
                }}
            >
                ADD TO CART
            </button>
           <p className='productdisplay-rigth-category'><span>Category :</span>Women, Tshirt, Crop Top, Shirt, Jeans </p>
           <p className='productdisplay-rigth-category'><span>Tags :</span>Modern, Latest</p>
        </div>
      
    </div>
  )
}

export default ProductDisplay
