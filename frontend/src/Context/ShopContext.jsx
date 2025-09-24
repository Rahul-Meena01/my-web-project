import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    // State to hold all products fetched from the backend
    const [all_product, setAll_Product] = useState([]);
    
    // State to hold cart items, initialized as an empty object
    const [cartItems, setCartItems] = useState({});

    // This useEffect hook runs once when the app starts
    useEffect(() => {
        // 1. Fetch all products from the backend
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_Product(data))
            .catch((error) => console.error("Error fetching products:", error));

        // 2. If a user is logged in, fetch their cart data
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((data) => setCartItems(data))
            .catch((error) => console.error("Error fetching cart:", error));
        }
    }, []); // The empty array ensures this runs only once

    const addToCart = (itemId, selectedSize = 'M') => {
        // Create a unique key combining itemId and size
        const cartKey = `${itemId}_${selectedSize}`;
        
        // Update state locally for a fast UI response
        setCartItems((prev) => ({ ...prev, [cartKey]: (prev[cartKey] || 0) + 1 }));

        // If user is logged in, send update to the backend
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId, "size": selectedSize }),
            })
            .then((response) => response.json())
            .then((data) => console.log("Item added to cart:", data))
            .catch((error) => console.error("Error adding to cart:", error));
        }
    }

    const removeFromCart = (cartKey) => {
        // Update state locally for a fast UI response
        setCartItems((prev) => ({ ...prev, [cartKey]: Math.max(0, (prev[cartKey] || 0) - 1) }));

        // Extract itemId from cartKey for backend
        const itemId = cartKey.split('_')[0];
        const size = cartKey.split('_')[1];

        // If user is logged in, send update to the backend
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId, "size": size }),
            })
            .then((response) => response.json())
            .then((data) => console.log("Item removed from cart:", data))
            .catch((error) => console.error("Error removing from cart:", error));
        }
    }
    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const cartKey in cartItems) {
            if (cartItems[cartKey] > 0 && all_product.length > 0) {
                const itemId = cartKey.split('_')[0];
                let itemInfo = all_product.find((product) => product.id === Number(itemId));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[cartKey];
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const cartKey in cartItems) {
            if (cartItems[cartKey] > 0) {
                totalItem += cartItems[cartKey];
            }
        }
        return totalItem;
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;