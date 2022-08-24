import React, {useEffect, useState} from "react";
import Card from "./Card";
import {useDispatch, useSelector} from 'react-redux';
import './Cards.css'
import { filterDogByTemperament, filterByName, filterByOrigin, filterByWeight, getDogs, getTemperaments } from "../redux/actions";
import Paginate from './Paginate';
import SearchBar from "./SearchBar";
import LoadingAll from "./LoadingAll";

export default function Cards(){
    let dogsState = useSelector(state=> state.dogs);
    let temperamentsState = useSelector(state => state.temperaments);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8); // Aca saqué el set porque me tiraba un warning, esta bien?
    const [setOrder] = useState(''); // Aca saqué el order por la misma razón 
    const lastDogIndex = currentPage * dogsPerPage;
    const firstDogIndex = lastDogIndex - dogsPerPage;
    const currentDogs = dogsState.slice(firstDogIndex, lastDogIndex);

    const paginate = (pageNum) => {
        setCurrentPage(pageNum);
    };


    useEffect(()=> {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [dispatch]);


    function handleByTemperament(e){
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterDogByTemperament(e.target.value))
    }

    function handleByOrigin(e){
        e.preventDefault()
        setCurrentPage(1)
        dispatch(filterByOrigin(e.target.value))
    }

    function handleByName(e){
        e.preventDefault()
        dispatch(filterByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }

    function handleByWeight(e){
        e.preventDefault()
        dispatch(filterByWeight(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
    }


    return(
        <div className="containter">
            <div className="filter">
               <select className="select" onChange={e=> handleByTemperament(e)}>
                   <option key={0} value='all'>All temperaments</option>
                   {
                       temperamentsState?.map(t=>{
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
                <Paginate 
                   dogsPerPage={dogsPerPage}
                   dogsState={dogsState.length}
                   paginate={paginate}
                />
                <div className="cards">
                {
                currentDogs.length > 0 ? currentDogs.map(b=>
                  <div className="cardsMaped">
                     {/* <Link key={b.id}> */}
                         <Card key={b.id} name={b.name} image={b.image} temperaments={b.temperaments} weightMin={b.weightMin} weightMax={b.weightMax} id={b.id}/>
                     {/* </Link> */}
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
