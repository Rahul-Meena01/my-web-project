import React from 'react'
import './Hero.css'
import hand_icon from '../Asset/hand_icon.png'
import arrow_icon from '../Asset/arrow.png'
import hero_video from '../Asset/hero_video.mp4'
import Threads from '../Threads/Threads'


const Hero = () => {
  return (
    <div className='hero'>
      <div className='threads-background'>
  <Threads
    amplitude={3.3}
    distance={0.3}
    enableMouseInteraction={true}
  />
</div>
      
        <div className="hero-left">
            <h2>NEW ARRIVVALS ONLY</h2>
            <div>
                <div className="hand-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt="" />
                </div>
                <p>collection</p>
                <p>for everyone</p>
            </div>
            <div className="hero-latest-btn">
                <div>Latest Collection</div>
                <img src={arrow_icon} alt="" />
            </div>
        </div>
        <div className="hero-rigth">
        <video className="hero-video" autoPlay muted loop playsInline>
        <source src={hero_video} type="video/mp4" />
      </video>

        </div>   
    </div>
  )
}

export default Hero
 
