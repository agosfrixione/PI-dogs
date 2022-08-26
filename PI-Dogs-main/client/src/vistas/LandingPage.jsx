import React, { useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import './LandingPage.css';
import image from "../images/LandingPagePhoto.png";
import { useDispatch } from 'react-redux';
import { getDogs, getTemperaments } from '../redux/actions';

export default function LandingPage (){
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [dispatch]);

    return(
        <div key={params.id} className='containerLanding'>
            <img className="img1" src={image} alt="Dog"/>
            <h1>Welcome to the Dogs App!</h1>
            <Link to='/home'>
                <button className='btn btnLanding'>Get Started</button>
            </Link>
        </div>
    )
}