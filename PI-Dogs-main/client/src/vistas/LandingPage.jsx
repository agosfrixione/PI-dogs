import React from 'react';
import {Link} from 'react-router-dom';
import './LandingPage.css';
import image from "../images/LandingPagePhoto.png";

export default function LandingPage (){
    return(
        <div className='containerLanding'>
            <img className="img1" src={image} alt="Dog"/>
            <h1>Welcome to the Dogs App!</h1>
            <Link to='/home'>
                <button className='btn btnLanding'>Get Started</button>
            </Link>
        </div>
    )
}