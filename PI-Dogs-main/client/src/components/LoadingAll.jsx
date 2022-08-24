import React from "react";
import image from "../images/LoadingPhoto.png";
import './LoadingAll.css'

export default function LoadingAll (){
    return (
        <img src={image} alt="loading" className="loading"/>
    )
}