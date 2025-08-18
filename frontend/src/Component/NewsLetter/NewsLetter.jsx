import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
  
      <div className="newsletter">
        <div className="newsletter-content">
          <h1 className="newsletter-title">Get Exclusive Offers On Your Email</h1>
          <p className="newsletter-subtitle">
            Subscribe to our newsletter and stay updated with the latest news and exclusive deals
          </p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email address" className="newsletter-input" />
            <button className="newsletter-button">
              Subscribe
              <span className="button-arrow">→</span>
            </button>
          </div>
          <div className="newsletter-features">
            <div className="feature-item">
              <span className="feature-icon">✉️</span>
              <span>Weekly Updates</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎁</span>
              <span>Exclusive Offers</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>No Spam</span>
            </div>
          </div>
        </div>
        <div className="newsletter-decoration">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
      </div>
  )
}

export default NewsLetter

