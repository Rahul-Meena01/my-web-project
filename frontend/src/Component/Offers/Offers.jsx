import React from 'react'
import './Offers.css'
import exclusive_image from '../Asset/exclusive_image.png'
import offer_bacvideo from '../Asset/offer_video.mp4'

const Offers = () => {
  return (
    <div className='offers'>
      <video className="offers-background-video" autoPlay muted loop playsInline>
        <source src={offer_bacvideo} type="video/mp4" />
      </video>
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCTS</p>
            <button>Check Now</button>

        </div>
        <div className="offers-rigth">
            <img src={exclusive_image} alt="" />

        </div>
      
    </div>
  )
}

export default Offers
