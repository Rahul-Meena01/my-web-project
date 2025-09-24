"use client"

import { useContext, useState, useEffect } from "react"
import "./Navbar.css"
import logo from "../Asset/logo.png"
import cart_icon from "../Asset/cart_icon.png"
import { Link, useNavigate } from "react-router-dom"
import { ShopContext } from "../../Context/ShopContext"

const Navbar = () => {
  const [menu, setMenu] = useState("shop")
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("") // We'll use this for a static display name
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const { getTotalCartItems, all_product } = useContext(ShopContext)
  const navigate = useNavigate()

  // Check if an auth token exists to determine login status
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      setIsLoggedIn(true);
      // Since the token doesn't contain the user's name, we use a generic name.
      // A more advanced approach would be to fetch user details from the backend.
      setUserName("My Account"); 
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)

    if (query.trim() === "") {
      setSearchResults([])
      setShowSearchResults(false)
      return
    }

    // Filter products based on search query
    const filteredProducts = all_product.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(filteredProducts.slice(0, 5)) // Show max 5 results
    setShowSearchResults(true)
  }

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results page or shop page with search query
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearchResults(false)
      setSearchQuery("")
    }
  }

  // Handle clicking on a search result
  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`)
    setShowSearchResults(false)
    setSearchQuery("")
  }

  // Handle clicking outside search to close results
  const handleSearchBlur = () => {
    // Delay hiding results to allow clicking on them
    setTimeout(() => {
      setShowSearchResults(false)
    }, 200)
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth-token"); // Correctly remove the auth token
    setIsLoggedIn(false);
    setUserName("");
    setShowUserDropdown(false);
    navigate("/");
    window.location.reload(); // Optional: force a reload to clear all state
  }


  // Toggle user dropdown
  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown)
  }

  // Close dropdown when clicking outside
  const handleUserDropdownBlur = () => {
    setTimeout(() => {
      setShowUserDropdown(false)
    }, 200)
  }

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo || "/placeholder.svg"} alt="Logo" />
      </div>

      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop")
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens")
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/mens">
            Men
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens")
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/womens">
            Women
          </Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids")
          }}
        >
          <Link style={{ textDecoration: "none", color: "black" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>

      {/* Search Bar */}
      <div className="nav-search">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            onBlur={handleSearchBlur}
            className="search-input"
          />
          <button type="submit" className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </form>

        {/* Search Results Dropdown */}
        {showSearchResults && searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((product) => (
              <div key={product.id} className="search-result-item" onClick={() => handleResultClick(product.id)}>
                <img src={product.image || "/placeholder.svg"} alt={product.name} className="result-image" />
                <div className="result-info">
                  <p className="result-name">{product.name}</p>
                  <p className="result-price">₹{product.new_price}</p>
                </div>
              </div>
            ))}
            {searchQuery && (
              <div
                className="search-result-item view-all"
                onClick={() => handleSearchSubmit({ preventDefault: () => {} })}
              >
                <span>View all results for "{searchQuery}"</span>
              </div>
            )}
          </div>
        )}

        {/* No Results Message */}
        {showSearchResults && searchResults.length === 0 && searchQuery.trim() && (
          <div className="search-results">
            <div className="no-results">
              <p>No products found for "{searchQuery}"</p>
            </div>
          </div>
        )}
      </div>

      <div className="nav-login-cart">
        {isLoggedIn ? (
          <div className="user-profile" onBlur={handleUserDropdownBlur} tabIndex="0">
            <div className="user-info" onClick={toggleUserDropdown}>
              <div className="user-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="user-name">{userName}</span>
              <svg
                className={`dropdown-arrow ${showUserDropdown ? 'open' : ''}`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </div>

            {showUserDropdown && (
              <div className="user-dropdown">
                <Link to="/profile" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  My Profile
                </Link>
                <Link to="/orders" className="dropdown-item" onClick={() => setShowUserDropdown(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                  My Orders
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16,17 21,12 16,7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon || "/placeholder.svg"} alt="Cart" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar