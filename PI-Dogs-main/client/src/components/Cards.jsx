import React, {useEffect, useState} from "react";
import Card from "./Card";
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom'
import './Cards.css'
import { filterDogByTemperament, filterByName, filterByOrigin, filterByWeight, getDogs, getTemperaments } from "../redux/actions";

export default function Cards(){
    let dogsState = useSelector(state=> state.dogs);
    let temperamentsState = useSelector(state => state.temperaments);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [dispatch]);


    return(
        <div>
            <div>
                
                {dogsState.length > 0 ? (
                    dogsState.map(d=> 
                    (<Link key={d.id} to={`/details/${d.id}`}>
                    <Card key={d.id} name={d.name} image={d.image} temperament={d.temperament} weightMin={d.weightMin} weightMax={d.weightMax}/>
                    </Link>))) 
                    : (<h2>No hay perros para mostrar</h2>)}
            </div>
        </div>
    )
}