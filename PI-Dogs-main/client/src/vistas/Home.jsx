import React, { useState } from "react";
import "./Home.css";
import NavBar from '../vistas/NavBar';
import Cards from '../components/Cards';
import Paginate from '../components/Paginate';
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/actions";
import { useParams } from "react-router-dom";

export default function Home (){
    const params = useParams();
    let dogsState = useSelector(state=> state.createdDog);
    let currentPage = useSelector(state=> state.currentPage);
    const [dogsPerPage] = useState(8);
    const lastDogIndex = currentPage * dogsPerPage;
    const firstDogIndex = lastDogIndex - dogsPerPage;
    const currentDogs = dogsState.slice(firstDogIndex, lastDogIndex);
    const dispatch = useDispatch()
    const paginate = (pageNum) => {
        dispatch(setPage(pageNum))
    };
    return (
        <div key={params.id} className="backgroundContainer">
          <NavBar/>
            <h2 className="title">Dogs App by Agostina Frixione</h2>
            <div >
              <button
                disabled={currentPage <= 1 ? true : false}
                onClick={() => paginate(currentPage - 1)}
              >
                🢀
              </button>
            <Paginate 
                   dogsPerPage={dogsPerPage}
                   totalDogs={dogsState.length}
                   currentPage= {currentPage}
                   paginate={paginate}
                />
                <button
                disabled={currentDogs.length < dogsPerPage ? true : false}
                onClick={() => paginate(currentPage + 1)}
              >
                🢂
              </button>
                </div>
            <Cards dogs = {currentDogs}/>
        </div>
    )
}