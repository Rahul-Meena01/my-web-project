import React, { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './Checkout.css';

const Checkout = () => {
    const { getTotalCartAmount, all_product, cartItems } = useContext(ShopContext);
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: ''
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Please enter a 10-digit phone number';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Please enter a 6-digit pincode';
        if (!formData.country.trim()) newErrors.country = 'Country is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Create order data
            const orderData = {
                customerInfo: formData,
                items: Object.entries(cartItems).map(([cartKey, quantity]) => {
                    const [itemId, size] = cartKey.split('-');
                    const product = all_product.find(p => p.id === Number(itemId));
                    return {
                        productId: itemId,
                        name: product?.name,
                        size,
                        quantity,
                        price: product?.new_price,
                        total: product?.new_price * quantity
                    };
                }).filter(item => item.quantity > 0),
                totalAmount: getTotalCartAmount(),
                orderDate: new Date().toISOString()
            };
            
            console.log('Order Data:', orderData);
            alert('Your order has been placed successfully! 🎉');
            
            // Here you would typically send the order to your backend
            // fetch('/api/orders', { method: 'POST', body: JSON.stringify(orderData) })
        }
    };

    return (
        <div className="checkout">
            <div className="checkout-container">
                <div className="checkout-form">
                    <h2>Delivery Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className={errors.firstName ? 'error' : ''}
                                    placeholder="Enter first name"
                                />
                                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                            </div>
                            <div className="form-group">
                                <label>Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className={errors.lastName ? 'error' : ''}
                                    placeholder="Enter last name"
                                />
                                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Email Address *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={errors.email ? 'error' : ''}
                                placeholder="Enter email address"
                            />
                            {errors.email && <span className="error-text">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>Phone Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className={errors.phone ? 'error' : ''}
                                placeholder="Enter phone number"
                            />
                            {errors.phone && <span className="error-text">{errors.phone}</span>}
                        </div>

                        <div className="form-group">
                            <label>Street Address *</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className={errors.address ? 'error' : ''}
                                placeholder="Enter complete address"
                                rows="3"
                            />
                            {errors.address && <span className="error-text">{errors.address}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className={errors.city ? 'error' : ''}
                                    placeholder="Enter city"
                                />
                                {errors.city && <span className="error-text">{errors.city}</span>}
                            </div>
                            <div className="form-group">
                                <label>State *</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className={errors.state ? 'error' : ''}
                                    placeholder="Enter state"
                                />
                                {errors.state && <span className="error-text">{errors.state}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Pincode *</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className={errors.pincode ? 'error' : ''}
                                    placeholder="Enter pincode"
                                />
                                {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                            </div>
                            <div className="form-group">
                                <label>Country *</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className={errors.country ? 'error' : ''}
                                    placeholder="Enter country"
                                />
                                {errors.country && <span className="error-text">{errors.country}</span>}
                            </div>
                        </div>

                        <button type="submit" className="place-order-btn">
                            Place Order
                        </button>
                    </form>
                </div>

                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <div className="order-items">
                            {Object.entries(cartItems).map(([cartKey, quantity]) => {
                                if (quantity > 0) {
                                    const itemId = cartKey.split('_')[0];
                                    const size = cartKey.split('_')[1];
                                    const product = all_product.find((e) => e.id === Number(itemId));
                                    if (product) {
                                        return (
                                            <div key={cartKey} className="order-item">
                                                <img src={product.image} alt={product.name} />
                                                <div className="item-details">
                                                    <h4>{product.name}</h4>
                                                    <p>Size: {size}</p>
                                                    <p>Quantity: {quantity}</p>
                                                    <p>Price: ${product.new_price}</p>
                                                    <p>Total: ${product.new_price * quantity}</p>
                                                </div>
                                            </div>
                                        );
                                    }
                                }
                                return null;
                            })}
                    </div>
                    
                    <div className="order-total">
                        <div className="total-row">
                            <span>Subtotal:</span>
                            <span>₹{getTotalCartAmount()}</span>
                        </div>
                        <div className="total-row">
                            <span>Shipping:</span>
                            <span>Free</span>
                        </div>
                        <div className="total-row final-total">
                            <span>Total:</span>
                            <span>₹{getTotalCartAmount()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;