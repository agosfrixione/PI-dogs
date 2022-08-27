import React from "react";
import { useParams } from "react-router-dom";
import image from "../images/LoadingPhoto.png";
import './LoadingAll.css'

export default function LoadingAll (){
    const params = useParams();
    return (
        <img key={params.id} src={image} alt="loading" className="loading"/>
    )
}