import React, {useEffect, useState} from "react";
import Card from "./Card";
import {useDispatch, useSelector} from 'react-redux';
import './Cards.css'
import { filterByName, filterByOrigin, filterByWeight, getDogs, getTemperaments, setPage } from "../redux/actions";
import SearchBar from "./SearchBar";
import LoadingAll from "./LoadingAll";
import { useParams } from "react-router-dom";

export default function Cards({dogs}){
    const params = useParams();
    const [, setOrder] = useState('');
    const [temper, Settemper] = useState('')
    let temperamentsState = useSelector(state => state.temperaments);
    const dispatch = useDispatch();



    useEffect(()=> {
        dispatch(getDogs(temper))
        dispatch(getTemperaments())
    }, [dispatch, temper]);


    function handleOnChange(e){
        Settemper(e.target.value)
    }

    function handleByOrigin(e){
        e.preventDefault()
        dispatch(setPage(1))
        dispatch(filterByOrigin(e.target.value))
    }

    function handleByName(e){
        e.preventDefault()
        dispatch(filterByName(e.target.value))
        dispatch(setPage(1))
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleByWeight(e){
        e.preventDefault()
        dispatch(filterByWeight(e.target.value))
        dispatch(setPage(1))
        setOrder(`Ordenado ${e.target.value}`)
    }

console.log(dogs)
    return(
        <div key={params.id} className="containter">
            <div className="filter">
               <select className="select" onChange={e=> handleOnChange(e)}>
                   <option key={0} value='all'>All temperaments</option>
                   {
                       temperamentsState?.map(t=>{
                        // console.log(t.name)
                           return (
                               <option key={t.id} value={t.name}>{t.name}</option>
                           );
                       })
                   }
               </select>
  
               <select className="select" onChange={e=> handleByName(e)}>
                   <option value="selected" hidden >Order alphabetically</option>
                   <option value="A-Z">A-Z</option>
                   <option value="Z-A">Z-A</option>
                   </select>

                   <select className="select" onChange={e=> handleByWeight(e)}>
                   <option value="selected" hidden >Order by weight</option>
                   <option value="most">Heavier</option>
                   <option value="less">Lighter</option>
                   </select>

                   <select className="select" onChange={e=> handleByOrigin(e)}>
                   <option value="all">All dogs</option>
                   <option value="api">API dogs</option>
                   <option value="db">Database dogs</option>
                   </select>
            </div>

            <div>
               <SearchBar/>                
            </div>


            <div>
                <div className="cards">
                {
                dogs.length > 0 ? dogs.map(b=>
                  <div className="cardsMaped">
                         <Card key={b.id} name={b.name} image={b.image} temperament={b.temperament} weightMin={b.weightMin} weightMax={b.weightMax} id={b.id}/>
                  </div>
                  ) : 
                  <div>
                    <LoadingAll/>
                  </div>
                } 
                </div>
            </div>
        </div>
    )
}
