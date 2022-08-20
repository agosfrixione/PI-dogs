import React from "react";
import "./Home.css"
import Cards from '../components/Cards'

export default function Home (){
    return (
        <div className="backgroundContainer">
            <h2 className="title">Dogs App by Agostina Frixione</h2>
            <Cards/>
        </div>
    )
}