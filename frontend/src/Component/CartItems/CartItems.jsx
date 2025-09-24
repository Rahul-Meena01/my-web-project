import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Asset/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom';

const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    }; 
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Size</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        {Object.keys(cartItems).map((cartKey)=>{
            if(cartItems[cartKey]>0) 
            {
                const itemId = cartKey.split('_')[0];
                const size = cartKey.split('_')[1];
                const product = all_product.find((e) => e.id === Number(itemId));
                
                if (!product) return null;
                
                return ( <div key={cartKey}>
                    <div className="cartitems-format cartitems-format-main">
            <img src={product.image} alt="" className='carticon-product-icon'  />
            <p>{product.name}</p>
            <p className="cart-size">{size}</p>
            <p> ₹{product.new_price}</p>
            <button className='cartitmes-quantity'>{cartItems[cartKey]}</button>
            <p> ₹{product.new_price * cartItems[cartKey]}</p>
            <img className='carticon-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(cartKey)}} alt="" />
        </div>
        <hr />
       </div>
                );
            }
            return null;       
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotal</p>
                        <p>₹{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                   <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                   </div>
                   <hr />
                   <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>₹{getTotalCartAmount()}</h3> 

                   </div>
                </div>
                <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
            </div>
           <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it there</p>
            <div className="cartitems-promobox">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
            </div>
           </div>
        </div>
    </div>
  )
}

export default CartItems
